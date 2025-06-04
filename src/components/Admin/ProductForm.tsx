"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { Brand, ProductVariations } from "../../types/product";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";

import { genders,sizes } from "@/Constants";

type FormValues = {
  id?: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  //quantity:Number;
  categoryId: number;
  variations?: ProductVariations[];
  brandId: number;
};

type Props = {
  // facultatif
  defaultValues?: FormValues;
  onSubmit: (data: FormValues) => void;
  brands: Brand[];
};

export default function ProductForm({
  defaultValues,
  onSubmit,
  brands,
}: Props) {
  const mergedDefaults: FormValues = {
    name: defaultValues?.name ?? "",
    description: defaultValues?.description ?? "",
    price: defaultValues?.price ?? 0,
    sku: defaultValues?.sku ?? "",
    // quantity:defaultValues?.quantity ?? 0,
    categoryId: defaultValues?.categoryId ?? 0,
    variations: defaultValues?.variations ?? [
      { id: 0, gender: "", size: "", color: "", stock: 0 },
    ],
    brandId: defaultValues?.brandId ?? 0,
  };

  const [isUnisex, setIsUnisex] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: mergedDefaults,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-2 ">
        <select
          {...register(`brandId`, { required: true, valueAsNumber: true })}
          className="border p-1 capitalize"
        >
          <option value="">-- Marque --</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 ">
        <label>Nom</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full border p-2"
        />
        {errors.name && <p className="text-red-500">Nom requis</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label>Description</label>
        <input
          type="text"
          {...register("description", { required: true })}
          className="w-full border p-2"
        />
        {errors.description && (
          <p className="text-red-500">Description requise</p>
        )}
      </div>
      <div className="flex flex-row items-start justify-between gap-2">
        <div className="flex flex-col gap-2 w-[50%]">
          <label>Prix</label>
          <input
            type="number"
            min={0}
            {...register("price", { required: true })}
            className="w-full border p-2"
            step=".01"
          />
          {errors.price && <p className="text-red-500">Prix requise</p>}
        </div>

        <div className="flex flex-col gap-2 w-[50%]">
          <label>SKU</label>
          <input
            type="text"
            min={0}
            {...register("sku", { required: true })}
            className="w-full border p-2"
          />
          {errors.sku && <p className="text-red-500">SKU requis</p>}
        </div>
      </div>
      {/* <div className="flex flex-col gap-2">
        <label>Quantité</label>
        <input
          type="number"
          {...register("quantity", { required: true })}
          className="w-full border p-2"
        />
        {errors.price && <p className="text-red-500">Quantité requise</p>}
      </div> */}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border p-2 mb-1 flex flex-row items-center justify-between"
        >
          <i>Var {index + 1}</i>
          <div className="flex flex-col w-[20%]">
            <select
              {...register(`variations.${index}.gender`, { required: true })}
              className="border p-1"
              onChange={(e) => setIsUnisex(e.target.value === "unisexe")}
            >
              <option value="">-- Genre --</option>
              {genders.map((gender,i)=> <option key={i} value={gender.value}>{gender.label}</option>)}
            </select>
            {errors.variations?.[index]?.gender && (
              <p className="text-red-500 text-sm mt-1">Genre requis</p>
            )}
          </div>

          <div className="flex flex-row items-center justify-between w-[30%]">
            {!isUnisex &&
              sizes.map((size,i) => (
                <label
                  key={i}
                  className="flex flex-row items-center justify-center gap-1"
                >
                  <input
                    type="radio"
                    value={size.value}
                    {...register(`variations.${index}.size`, {
                      required: true,
                    })}
                  />
                  {size.label}
                </label>
              ))}
          </div>

          <div className="flex flex-col items-center justify-center">
            <label>Couleur</label>
            <input
              {...register(`variations.${index}.color`, { required: true })}
              type="color"
              placeholder="Couleur"
              className="cursor-pointer h-10"
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <label>Quantité</label>
            <input
              className="border p-1"
              type="number"
              {...register(`variations.${index}.stock`, { required: true })}
              placeholder="Stock"
            />
          </div>

          <button type="button" onClick={() => remove(index)}>
            Supprimer
          </button>
        </div>
      ))}

      <div className="py-2">
        <button
          className="flex flex-row gap-1"
          type="button"
          onClick={() =>
            append({
              id: 0,
              gender: "",
              size: "",
              color: "",
              stock: 0,
            })
          }
        >
          <MdAddCircle size={24} /> Ajouter une variation
        </button>
      </div>

      <input
        type="hidden"
        {...register("categoryId", { valueAsNumber: true })}
      />

      <button
        type="submit"
        className="bg-[var(--background)] text-[var(--foreground)] hover:text-[var(--background)] hover:bg-[var(--foreground)] hover:border-[var(--background)] border px-4 py-2 rounded transition-all"
      >
        Valider
      </button>
    </form>
  );
}
