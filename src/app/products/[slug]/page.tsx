import { notFound } from "next/navigation.js";
import { getProductBySlug, getProductsByCategory,getProducts} from "@/lib/api";
import { toFirstLetterUpper } from "@/lib/utils";
import Image from "next/image.js";
import SizeSelector from "@/components/products/SizeSelector";
import { Product } from "@/types/product.js";
import InfiniteScrollProducts from "@/components/motions/InfiniteScrollProducts";

export const revalidate = 60; // ISR toutes les 60s

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allProducts = await getProducts(); // doit retourner tous les slugs
  return allProducts.map((product: Product) => ({
    slug: product.slug,
  }));
}

export default async function Products({ params }: Props) {
  const {slug} = await params;

  if (!slug || slug.length === 0) return notFound();

  const product = await getProductBySlug(slug);

  console.log(product)
  const otherProducts = await getProductsByCategory(product.category.id);

  const otherProductsNotThis = otherProducts.filter(
    (prod:Product) => (prod.id != product.id)
  );
console.log(product)
  return (
    <div className="mt-5 md:mx-10 p-5 flex flex-col gap-5">
      <div className=" flex flex-col-reverse gap-5 md:flex-row justify-between items-center ">
        <div className=" flex flex-col md:flex-col gap-5">
          <h1 className="text-5xl capitalize underline">{product.name}</h1>
          <h2>
            Catégorie : <b>{product.category.name}</b>
          </h2>
          <p className="normal-case">
            {toFirstLetterUpper(product.description)}
          </p>
          <h3 className="text-4xl">{product?.price} €</h3>
          <h3 className="text-3xl mb-5">Modèles disponibles : </h3>

          <SizeSelector product={product} />
        </div>

        <div>
          <Image
            src={"https://placehold.co/600x400/EEE/31343C"}
            alt={"picture"}
            width={800}
            height={600}
          />
        </div>
      </div>

      <div className="mt-5 border-t-1">
        {otherProductsNotThis.length > 0 && (
          <div className="mt-5">
            <h2 className="text-2xl p-5">Voir d'autres produits</h2>
            <InfiniteScrollProducts products={otherProductsNotThis} />
          </div>
        )}
        {otherProductsNotThis.length == 0 && (
          <h4 className="">Aucun autre produit dans cette catégorie</h4>
        )}
      </div>
    </div>
  );
}
