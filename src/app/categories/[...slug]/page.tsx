import { notFound } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link.js";
import Nav from "@/components/Nav";
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
    const currentCategory = await getCategoryBySlug(currentSlug,parentSlug);
    if (!currentCategory) return notFound();
    
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
  console.log('products',products)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
      {currentCategory.name}
      </h1>

      {currentCategory.name && products.error && <p>Pas de produits</p>}

      {products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {!products.error &&
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}


        </div>
      )}
    </div>
  );
}
