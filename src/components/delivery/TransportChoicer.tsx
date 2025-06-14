import { useState } from "react";
import Image from "next/image";

type TransportChoicerProps = {
  id: string;
  label: string;
  icon: string;
};

export default function TransportChoicer({
  options,
}: {
  options: TransportChoicerProps[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5 mt-5">
      {options.map(({ id, label, icon }) => (
        <div key={id} className="flex flex-row items-center gap-5">
          <input
            type="checkbox"
            checked={selected === id}
            onChange={() => setSelected(id)}
            className="size-5 rounded 
    appearance-none 
    cursor-pointer 
    border border-gray-400 
   
    checked:border-black 
    checked:[&::before]:content-['✔']
    checked:[&::before]:text-slate-100 
    checked:[&::before]:text-sm 
    checked:[&::before]:flex 
    checked:[&::before]:justify-center 
    checked:[&::before]:items-center 
    checked:[&::before]:h-full 
    checked:[&::before]:w-full"
          />
          <Image src={icon} alt={label} width={180} height={180} />
          {label && <span className="text-lg font-bold">{label}</span>}
        </div>
      ))}
    </div>
  );
}
