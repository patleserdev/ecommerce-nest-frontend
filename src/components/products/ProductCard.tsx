import { Product } from "../../types/product";
import Image from "next/image.js";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex p-2 border justify-between rounded-lg shadow-xs shadow-white">
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h4>{product.price}€</h4>
      </div>
      <div>
        <Image
          src="https://placehold.co/600x400/EEE/31343C"
          alt={`${product.sku}`}
          height={200}
          width={200}
        />
      </div>
    </div>
  );
}
