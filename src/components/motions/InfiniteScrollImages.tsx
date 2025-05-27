import { motion } from "framer-motion";
import Image from "next/image";

interface InterfaceImages {
  url: string;
  width: number;
  height: number;
}

export default function InfiniteScrollImages({
  images,
  bgcolor,
}: {
  images: InterfaceImages[];
  bgcolor: string;
}) {
  const duplicatedImages = [...images, ...images]; // double pour scroll fluide

  return (
    <div
            className="overflow-hidden h-[50vh] w-full relative shadowbordered"
            style={{ "--scrollcolor":   bgcolor,
            } as React.CSSProperties}
          >
      <motion.div
        className="flex gap-6 w-max overflow-hidden h-full mt-5 "
        animate={{ x: ["0%", "-50%"] }} // seulement la moitié, car images doublées
        transition={{ duration: 100, ease: "linear", repeat: Infinity }}
      >
        {duplicatedImages.map((src, i) => (
          <Image
            key={i}
            src={src.url}
            alt={`img-${i}`}
            width={src.width}
            height={src.height}
            style={{ objectFit: "contain" }}
            className="shrink-0 object-cover md:object-contain"
          />
        ))}
      </motion.div></div>
  );
}
