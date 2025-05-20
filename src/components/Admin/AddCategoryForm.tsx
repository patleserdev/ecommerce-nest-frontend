"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type FormValues = {
  name: string;
  parent_id: number;
};

type Props = {
  parentId?: number; // facultatif
  defaultValues?: FormValues;
  onSubmit: (data: FormValues) => void;
};

export default function AddCategoryForm({
  parentId,
  defaultValues,
  onSubmit,
}: Props) {
  const mergedDefaults: FormValues = {
    name: defaultValues?.name ?? "",
    parent_id: defaultValues?.parent_id ?? parentId ?? 0,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: mergedDefaults,
  });

  useEffect(() => {
    if (parentId !== undefined && !defaultValues?.parent_id) {
      setValue("parent_id", parentId);
      console.log("🔄 set parent_id to:", parentId);
    }
  }, [parentId, defaultValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-4">
        <label>Nom</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full border p-2"
        />
        {errors.name && <p className="text-red-500">Nom requis</p>}
      </div>

      <input type="hidden" {...register("parent_id", { valueAsNumber: true })} />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Valider
      </button>
    </form>
  );
}
