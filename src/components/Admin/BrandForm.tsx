"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type FormValues = {
  name: string;
};

type Props = {
  defaultValues?: FormValues;
  onSubmit: (data: FormValues) => void;
};

export default function BrandForm({
  defaultValues,
  onSubmit,
}: Props) {
  const mergedDefaults: FormValues = {
    name: defaultValues?.name ?? "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: mergedDefaults,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-4">
        <label >Nom</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full border p-2"
        />
        {errors.name && <p className="text-red-500">Nom requis</p>}
      </div>

      <button
        type="submit"
        className="bg-[var(--background)] text-[var(--foreground)] hover:text-[var(--background)] hover:bg-[var(--foreground)] hover:border-[var(--background)] border px-4 py-2 rounded transition-all"
      >
        Valider
      </button>
    </form>
  );
}
