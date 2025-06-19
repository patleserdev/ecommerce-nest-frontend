import { Product } from "../../types/product";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import { BiSolidCartAdd } from "react-icons/bi";

export default function ProductCardLink({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="block">
      <div className="flex flex-col md:flex-row border rounded-lg shadow-md overflow-hidden h-full md:min-h-[250px] lg:min-h-[200px]">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto min-h-[200px]">
          <Image
            src="https://placehold.co/600x400/EEE/31343C"
            alt={product.sku}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between p-4 w-full">
          <div>
            <h3 className="text-lg font-bold capitalize">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <h4 className="text-md font-semibold mt-2">{product.price}€</h4>
          </div>

          <div className="flex gap-4 mt-4">
            <FaEye size={24} className="text-gray-700" />
            <BiSolidCartAdd size={24} className="text-gray-700" />
          </div>
        </div>
      </div>
    </Link>
  );
}
