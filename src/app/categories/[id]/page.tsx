import { notFound } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link.js";
import Nav from "@/components/Nav";
import {
  getCategoryById,
  getProductsByCategory,
  getCategoriesByParent,
} from "@/lib/api";
type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: { params: { id: number } }) {
  const fullSlug = params.id;
  const category = await getCategoryById(fullSlug);
  if (!category) return {};

  return {
    title: category.name.toUpperCase(),
    description: `Produits dans la catégorie ${category.name}`,
  };
}

export default async function CategorieId({ params }: Props) {
  const categoryId = parseInt(params.id);

  // Récupère la catégorie

  const category = await getCategoryById(categoryId);
  if (!category) return notFound();

  const parentCategory = await getCategoryById(category.parent_id);
  if (!parentCategory) return notFound();

  const childrenCategories = await getCategoriesByParent(categoryId);
  if (!childrenCategories) return notFound();
  // Récupère les produits associés
  const products = await getProductsByCategory(categoryId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        
        {parentCategory.name && (
          <span className="uppercase text-lg">{parentCategory.name} |</span>
        )}
        <span className="uppercase "> {category.name}</span>
      </h1>

      {parentCategory.name && products.error && <p>Pas de produits</p>}

      {products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {!products.error &&
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}

          {childrenCategories.map((child) => {
           return  <div className="capitalize border text-center" key={child.id}>
            <Link href={`./${child.id}`}>{child.name}</Link></div>;
          })}
        </div>
      )}
    </div>
  );
}
