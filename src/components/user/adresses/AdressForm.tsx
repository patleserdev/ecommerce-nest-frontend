"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";

type FormValues = {
  id?: number;
  title: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  streetAddress2?: string;
  postalCode: string;
  city: string;
  country: string;
  phoneToDelivery: string;
};

type Props = {
  defaultValues?: FormValues;
  onSubmit: (data: FormValues) => void;
};

export default function AddressForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      streetAddress2: "",
      postalCode: "",
      city: "",
      country: "",
      phoneToDelivery: "",
      ...defaultValues, // overwrite with passed values
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row md:gap-10 mt-5">
        <div className="flex flex-col md:w-[50%] gap-2">
          <div className="flex flex-col gap-1">
            <label>Civilité</label>
            <select
              {...register("title", { required: true })}
              className="border p-1 capitalize"
            >
              <option value="">-- Choisir --</option>
              <option value="Mr.">Mr</option>
              <option value="Mme">Mme</option>
              <option value="Mme">Mlle</option>
              <option value="Mme">X</option>
            </select>
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Prénom</label>
            <input
              {...register("firstName", {
                required: "Nom requis",
                minLength: { value: 2, message: "Minimum 2 caractères" },
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ\-'\s]+$/,
                  message: "Nom invalide (lettres uniquement)",
                },
              })}
              className="w-full border p-2"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Nom</label>
            <input
              {...register("lastName", {
                required: "Nom requis",
                minLength: { value: 2, message: "Minimum 2 caractères" },
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ\-'\s]+$/,
                  message: "Nom invalide (lettres uniquement)",
                },
              })}
              className="w-full border p-2"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label>Adresse</label>
            <input
              {...register("streetAddress", {
                required: "Adresse requise",
                minLength: { value: 5, message: "Adresse trop courte" },
              })}
              className="w-full border p-2"
            />
            {errors.streetAddress && (
              <p className="text-red-500">{errors.streetAddress.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label>Complément d’adresse</label>
            <input
              {...register("streetAddress2", {
                minLength: { value: 5, message: "Adresse trop courte" },
              })}
              className="w-full border p-2"
            />
            {errors.streetAddress2 && (
              <p className="text-red-500">{errors.streetAddress2.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:w-[50%] gap-2 mb-5">
          <div className="flex flex-col gap-1">
            <label>Code postal</label>
            <input
              {...register("postalCode", {
                required: "Code postal requis",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "Le code postal doit contenir exactement 5 chiffres",
                },
              })}
              className="w-full border p-2"
            />
            {errors.postalCode && (
              <p className="text-red-500">{errors.postalCode.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Ville</label>
            <input
              {...register("city", {
                required: "Ville requise",
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ\-'\s]+$/,
                  message: "Ville invalide (lettres uniquement)",
                },
              })}
              className="w-full border p-2"
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Pays</label>
            <input
              {...register("country", {
                required: "Pays requis",
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ\-'\s]+$/,
                  message: "Pays invalide (lettres uniquement)",
                },
              })}
              className="w-full border p-2"
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>Téléphone</label>
            <input
              {...register("phoneToDelivery", {
                required: "Numéro requis",
                pattern: {
                  value: /^0[1-9][0-9]{8}$/,
                  message: "Numéro de téléphone invalide (format FR)",
                },
              })}
              className="w-full border p-2"
            />
            {errors.phoneToDelivery && (
              <p className="text-red-500">{errors.phoneToDelivery.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-5">
        <button
          type="submit"
          className="w-full bg-[var(--background)] text-[var(--foreground)] hover:text-[var(--background)] hover:bg-[var(--foreground)] hover:border-[var(--background)] border px-4 py-2 rounded transition-all"
        >
          Valider
        </button>
      </div>
    </form>
  );
}
