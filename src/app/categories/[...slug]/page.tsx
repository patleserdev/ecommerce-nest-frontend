import { notFound } from "next/navigation";
import ProductCardLink from "@/components/products/ProductCardLink";
import Link from "next/link.js";
import Nav from "@/components/Nav";
import Image from "next/image.js";
import Logo from "@/components/Logo";
import {
  getCategoryById,
  getProductsByCategory,
  getCategoriesByParent,
  getCategoryBySlug,
} from "@/lib/api";

type Props = {
  params: {
    slug: string[];
  };
};

export default async function CategorieSlug({ params }: Props) {
  const slugs = params.slug;
  if (!slugs || slugs.length === 0) return notFound();
  // On récupère la catégorie ciblée : la dernière dans l'URL

  const currentSlug = slugs[slugs.length - 1];
  const parentSlug = slugs[slugs.length - 2];
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
  for (let i = slugs.length - 2; i >= 0; i--) {
    const expectedSlug = slugs[i];
    const parentCategory = await getCategoryById(parentId);

    if (!parentCategory || parentCategory.name.toLowerCase() !== expectedSlug) {
      valid = false;
      break;
    }
    parentId = parentCategory.parent_id;
  }

  if (!valid) return notFound();

  // Récupère les produits de la dernière catégorie

  const products = await getProductsByCategory(currentCategory.id);
  // console.log('products',products)
  let icon = Logo(currentSlug);

  return (
    <div className="p-6 border">
      <h1 className="text-3xl font-bold mb-4 capitalize underline flex justify-start align-center gap-2">
        <Image
          style={{ filter: "invert(1)" }}
          src={icon}
          alt="logo"
          height={50}
          width={50}
        />
        {currentCategory.name} {parentSlug}
      </h1>

      {currentCategory.name && products.error && (
        <p className="p-4 text-2xl">Pas de produits</p>
      )}

      {products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {!products.error &&
            products.map((product: any) => (
              <ProductCardLink key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}
