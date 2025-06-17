import { notFound } from "next/navigation";
import ProductCardLink from "@/components/products/ProductCardLink";
import Link from "next/link.js";
import Nav from "@/components/BU_Nav";
import Image from "next/image.js";
import Logo from "@/components/Logo";
import {
  getCategoryById,
  getProductsByCategory,
  getCategoriesByParent,
  getCategoryBySlug,
  getCategories,
} from "@/lib/api";
import DisplayIcon from "@/components/DisplayIcon";
import { Category } from "@/types/product.js";

export const revalidate = 60; // ISR toutes les 60s

type Props = {
  params: Promise<{ slug: string[] }>;
};

function getSlugChain(category: Category, allCategories: Category[]): string[] {
  const chain = [];
  let current: Category | undefined = category;

  while (current) {
    // On ajoute le slug (ou le nom) en tête du tableau
    chain.unshift(current.slug /* ou current.name.toLowerCase() */);

    // Si `parent_id` est null/undefined, on casse la boucle
    if (!current.parent_id) break;

    // `find` renvoie `Category | undefined`, on l’affecte donc à `current`
    current = allCategories.find((c) => c.id === current?.parent_id);
  }

  return chain;
}

// export async function generateStaticParams() {
//   try {
//     const allCategories = await getCategories(); 
//     return allCategories.map((category: Category) => ({
//       slug: getSlugChain(category, allCategories),
//     }));
//   } catch (e) {
//     console.error("Erreur dans generateStaticParams:", e);
//     return []; 
//   }
// }

export default async function CategorieSlug({ params }: Props) {
  const { slug } = await params;
  if (!slug || slug.length === 0) return notFound();
  // On récupère la catégorie ciblée : la dernière dans l'URL

  const currentSlug = slug[slug.length - 1];
  const parentSlug = slug[slug.length - 2];
  const currentCategory = await getCategoryBySlug(currentSlug, "");

  // if (slugs.length == 1) {
  //   const currentCategory = await getCategoryBySlug(currentSlug, "");
  //   const categories = await getCategoriesByParent(currentCategory.id);

  //   return (
  //     <div className="p-5">
  //       <h1 className="px-5 text-3xl">Catégorie {slugs[0]}</h1>
  //       <div className="p-5 border mt-5 flex items-center justify-around">
  //         {categories.map((category, i) => {
  //           const picture = logo(category.name);
  //           return (
  //             <Link key={i} href={`${currentSlug}/${category.name}`}>
  //             <div

  //               className="p-2 flex flex-col justify-center items-center opacity-[0.5] hover:opacity-[1] transition-all cursor-pointer"
  //             >
  //               <span className="capitalize font-bold text-2xl">
  //                 {category.name}
  //               </span>
  //               <Image
  //                 src={picture}
  //                 alt="icon"
  //                 width={200}
  //                 height={200}
  //                 style={{ filter: "invert(1)" }}
  //               />
  //             </div>
  //             </Link>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }

  // if (currentCategory.error) return notFound();

  // Valider la hiérarchie : on remonte les parents
  let valid = true;
  let parentId = currentCategory.parent_id;
  // On vérifie chaque parent dans l'ordre inverse des slugs
  for (let i = slug.length - 2; i >= 0; i--) {
    const expectedSlug = slug[i];
    const parentCategory = await getCategoryById(parentId);

    if (!parentCategory || parentCategory.name.toLowerCase() !== expectedSlug) {
      valid = false;
      break;
    }
    parentId = parentCategory.parent_id;
  }

  if (!valid) return notFound();

  // Récupère les produits de la dernière catégorie

  const { data: products, error } = await getProductsByCategory(
    currentCategory.id
  );

  // console.log('products',products)
  let icon = Logo(currentSlug);

  return (
    <div className="p-6 border">
      <h1 className="text-3xl font-bold mb-4 capitalize underline flex justify-start align-center gap-2">
        <DisplayIcon icon={icon} size={50} />
        {currentCategory.name} {parentSlug}
      </h1>

      {currentCategory.name && error && (
        <p className="p-4 text-2xl">Pas de produits</p>
      )}

      {products && products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {!error &&
            products &&
            products.map((product: any) => (
              <ProductCardLink key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}
