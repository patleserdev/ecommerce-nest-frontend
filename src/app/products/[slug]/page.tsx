import { notFound } from "next/navigation.js";
import { getProductBySlug } from "@/lib/api";
type Props = {
  params: {
    slug: string;
  };
};
import { toFirstLetterUpper } from "@/lib/utils";
import Image from "next/image.js";
import SizeSelector from "@/components/products/SizeSelector";

export default async function Products({ params }: Props) {
  const slug = params.slug;

  if (!slug || slug.length === 0) return notFound();

  const product = await getProductBySlug(slug);

  return (
    <div className="mt-5 md:mx-10 p-5 flex flex-col-reverse gap-5 md:flex-row justify-between items-center">
      <div className=" flex flex-col md:flex-col gap-5">
        <h1 className="text-5xl capitalize underline">{product.name}</h1>
        <h2>
          Catégorie : <b>{product.category.name}</b>
        </h2>
        <p className="normal-case">{toFirstLetterUpper(product.description)}</p>
        <h3 className="text-4xl">{product?.price} €</h3>
        <h3 className="text-3xl mb-5">Modèles disponibles : </h3>

        <SizeSelector product={product}/>
       
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
  );
}
