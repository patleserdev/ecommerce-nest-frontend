"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types/product";
import { toFirstLetterUpper } from "@/lib/utils";
interface InterfaceImages {
  url: string;
  width: number;
  height: number;
}

export default function InfiniteScrollProducts({
  products,
}: {
  products: Product[];
}) {
  const duplicatedImages = [...products, ...products]; // double pour scroll fluide

  return (
    <div
      className="overflow-hidden h-[50vh] w-full relative shadowbordered"
      // style={{ "--scrollcolor":   bgcolor,
      // } as React.CSSProperties}
    >
      <motion.div
        className="flex gap-6 w-max overflow-hidden mt-5"
        animate={{ x: ["0%", "-50%"] }} // seulement la moitié, car images doublées
        transition={{ duration: 100, ease: "linear", repeat: Infinity }}
      >
        {duplicatedImages.map((src, i) => (
          <div className="relative" key={i}>
            <div className="absolute bottom-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] p-3 z-10 flex flex-col-reverse text-[var(--background)">
              <div className="flex flex-row py-1 gap-1">
              {src.variations.map((variation,i) => <div className="px-2 py-1 rounded-lg bg-[var(--background)]" key={i}>{toFirstLetterUpper(variation.gender)}</div>)}

              </div>

              <h4 className="text-xl">{toFirstLetterUpper(src.name)}</h4>
              <h5 className="text-3xl font-bold">{src.price} €</h5>
            </div>
              <Image
                key={i}
                src={"https://placehold.co/600x400/EEE/31343C"}
                alt={`img-${i}`}
                width={600}
                height={400}
                style={{ objectFit: "contain" }}
                className="relative shrink-0 object-cover md:object-cover"
              />

          </div>
        ))}
      </motion.div>
    </div>
  );
}
