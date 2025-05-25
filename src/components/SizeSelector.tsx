"use client";
import { useState } from "react";
import { Product, ProductVariations } from "@/types/product";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store/store.js";
export default function SizeSelector({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const [selected, setSelected] = useState<{
    productId: Number;
    variationId: Number;
    gender: String;
    size: String;
    quantity:Number;
  } | null>(null);

  const sizes = [
    { id: 1, value: "XS" },
    { id: 2, value: "S" },
    { id: 3, value: "M" },
    { id: 4, value: "L" },
    { id: 5, value: "XL" },
    { id: 6, value: "XXL" },
  ];
  const genders = ["homme", "femme", "enfant"];

  const handleToCart = () => {
    console.log("to cart");
    if (selected?.productId && selected?.variationId) {
      dispatch(
        addToCart({
          productId: selected.productId,
          variationId: selected.variationId,
          price: 10,
        })
      );
    }
  };

  console.log(selected);
  return (
    <>
      {genders.map((gender: string) => {
        // const hasSizes = product.variations.some(
        //   (v) => v.gender === gender && v.size
        // );
        // if (!hasSizes) return null;
        const genderVariations = product.variations.filter(
          (v) => v.gender === gender
        );

        if (genderVariations.length === 0) return null;

        return (
          <div
            className="flex flex-col flex-wrap mt-2 mb-2 gap-5 items-start"
            key={gender}
          >
            <h3 className="w-20 capitalize font-bold">{gender}</h3>
            <div className="flex flex-row flex-wrap gap-5">
              {sizes.map((size) => {
                const isAvailable = product.variations.some(
                  (variation: ProductVariations) =>
                    variation.gender === gender && variation.size === size.value
                );

                const matchedVariation = product.variations.find(
                  (variation: ProductVariations) =>
                    variation.gender === gender && variation.size === size.value
                );

                const isSelected =
                  selected?.gender === gender && selected?.size === size.value;

                return (
                  <div
                    key={matchedVariation?.id ?? `${gender}-${size.id}`}
                    title={isAvailable ? "Disponible" : "Non disponible"}
                    className={`border px-5 rounded-md transition-all shadow-sm
            ${
              isAvailable
                ? `hover:bg-[#ff00ff] hover:font-bold shadow-[#ff00ff] cursor-pointer  ${
                    isSelected ? "border-[#ff00ff] font-bold" : ""
                  }`
                : "opacity-40 cursor-not-allowed pointer-events-none"
            }
          `}
                    onClick={() =>
                      isAvailable && product.id && matchedVariation?.id
                        ? setSelected({
                            productId: product.id,
                            variationId: matchedVariation?.id,
                            quantity:selected?.quantity,
                            gender,
                            size: size.value,
                          })
                        : null
                    }
                  >
                    {size.value}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {selected && (
        <p className="capitalize text-green-500 font-bold">
          {selected?.gender} {selected?.size} - en stock
        </p>
      )}

      <div className="flex flex-col gap-2 w-50 font-bold">
        <label>Quantité</label>
        <input className="border p-1" type="number" min={0} value={selected?.quantity}/>
      </div>

      <div className="flex flex-row items-center justify-center md:justify-start mt-5">
        <button
          className={`border px-8 p-2 hover:bg-white hover:text-black transition-all cursor-pointer`}
          style={selected ? { opacity: 1 } : { opacity: 0.5 }}
          disabled={selected ? false : true}
          onClick={() => handleToCart()}
        >
          Ajouter au panier
        </button>
      </div>
    </>
  );
}
