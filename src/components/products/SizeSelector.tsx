"use client";
import { useState } from "react";
import { Product, ProductVariations } from "@/types/product";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/reducers/cartSlice";
import { RootState } from "@/redux/store/store.js";
import CustomedButton from "../CustomedButton";
import { genders,sizes,gendersType,SizeType} from "@/Constants";

export default function SizeSelector({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const [selected, setSelected] = useState<{
    product: Product;
    variation: ProductVariations;
    gender: string;
    size: string;
    quantity: number;
  } | null>(null);



  const handleToCart = () => {
    if (selected?.product.id && selected?.variation.id) {
      dispatch(
        addToCart({
          product: selected.product,
          variation: selected.variation,
          price: product.price,
          quantity: selected.quantity,
        })
      );
      setSelected(null);
    }
  };

  return (
    <>
      {genders.map((gender: gendersType,i) => {
        // const hasSizes = product.variations.some(
        //   (v) => v.gender === gender && v.size
        // );
        // if (!hasSizes) return null;
        const genderVariations = product?.variations?.filter(
          (v) => v.gender === gender.value
        );

        if (genderVariations && genderVariations.length === 0) return null;

        return (
          <div
            className="flex flex-col flex-wrap mt-2 mb-2 gap-5 items-start"
            key={i}
          >
            <h3 className="w-20 capitalize font-bold">{gender.label}</h3>
            <div className="flex flex-row flex-wrap gap-5">
              {sizes.map((size) => {
                const isAvailable = product.variations?.some(
                  (variation: ProductVariations) =>
                    variation.gender === gender.value && variation.size.toLowerCase() === size.value.toLowerCase()
                );

                const matchedVariation = product.variations?.find(
                  (variation: ProductVariations) =>
                    variation.gender === gender.value && variation.size === size.value
                );

                const isSelected =
                  selected?.gender === gender.value && selected?.size === size.value;

                return (
                  <div
                    key={matchedVariation?.id ?? `${gender}-${size.value}-${i}`}
                    title={isAvailable ? "Disponible" : "Non disponible"}
                    className={`border px-5 rounded-md transition-all shadow-md
            ${
              isAvailable
                ? `hover:bg-[#000000] hover:text-[#ffffff] font-bold shadow-[#b4b1c0] cursor-pointer  ${
                    isSelected ? "border-[#82bbea] font-bold" : ""
                  }`
                : "opacity-40 cursor-not-allowed pointer-events-none"
            }
          `}
                    onClick={() =>
                      isAvailable && product.id && matchedVariation?.id
                        ? setSelected({
                            product: product,
                            variation: matchedVariation,
                            quantity: selected?.quantity || 1,
                            gender:gender.value,
                            size: size.value,
                          })
                        : null
                    }
                  >
                    {size.label}
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
        <input
          className="border p-1"
          type="number"
          min={0}
          value={selected?.quantity ?? 0}
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value, 10);

            setSelected((prev) =>
              prev
                ? { ...prev, quantity: isNaN(newQuantity) ? 0 : newQuantity }
                : null
            );
          }}
        />
      </div>

      <div className="flex flex-row items-center justify-center md:justify-start mt-5">
        <CustomedButton
          selected={selected ? true : false}
          onClick={() => handleToCart()}
          disabled={selected ? false : true}
        >
          Ajouter au panier
        </CustomedButton>
      </div>
    </>
  );
}
