"use client";

import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import Modal from "@/components/Modal";
import Link from "next/link";
import { Category, Child } from "@/types/product";
import AddCategoryForm from "./AddCategoryForm";
import { addCategorie, updateCategorie } from "@/lib/api";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
type Props = {
  categories: Category[];
};

export default function DashboardClientWrapper({ categories }: Props) {
  const router = useRouter();

  const [isEditCategory, setIsEditCategory] = useState<
    Category | null | undefined
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parent, setParent] = useState<Category | null | undefined>(null);
  const mainCategories = categories.filter((cat) => cat.parent_id === 0).sort((a, b) => a.name.localeCompare(b.name));
  ;
  const groupedChildren: Record<number, Child[]> = categories.reduce(
    (acc, cat) => {
      if (!acc[cat.parent_id]) acc[cat.parent_id] = [];
      acc[cat.parent_id].push({
        id: cat.id,
        name: cat.name,
        parent_id: cat.parent_id,
      });
      return acc;
    },
    {} as Record<number, Child[]>
  );

  const handleOpenAddCategory = async (parent?: Category | null) => {
    setIsModalOpen(true);
    setParent(parent);
  };

  const handleOpenEditCategory = async (category?: Category | null) => {
    setIsEditCategory(category);
    setIsModalOpen(true);
  };

  const handleAddCategory = async (datas: {
    name: string;
    description: string;
    parent_id?: number;
  }) => {
    try {
      await addCategorie({ formData: datas });
      console.log("Catégorie ajoutée !");
      router.refresh();

      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err);
    }
  };

  const handleUpdateCategory = async (
    category_id: number,
    datas: { name: string; parent_id?: number }
  ) => {
    try {
      await updateCategorie({ id:category_id,formData: datas });
      console.log("Catégorie modifiée !");
      router.refresh();

      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err);
    }
  };

  const handleToDestroyCategory=()=>{

  }
  return (
    <main className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
        <div className="border p-3">
          <span className="flex items-center gap-2">
            <h2 className="text-lg font-bold underline">
              Catégories ({categories.length})
            </h2>

            <div
              className="cursor-pointer"
              onClick={() => handleOpenAddCategory()}
            >
              <MdAddCircle size={24} />
            </div>
          </span>

          <ul className="p-5">
            {mainCategories.map((parent) => (
              <li key={parent.id} className="pb-5 uppercase ">
                <span className="flex items-center gap-2">
                  <Link href={`categories/${parent.id}`} className="font-bold">
                    {parent.name}
                  </Link>
                  <div className="flex gap-1">
                  <div
                    className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                    onClick={() => handleOpenAddCategory(parent)}
                  >
                    <MdAddCircle size={18} />
                  </div>

                  <div
                    className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                    onClick={() => handleOpenEditCategory(parent)}
                  >
                    <MdEdit size={18} />
                  </div>

            

                  <div
                    className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                    onClick={() => destroyCategory(parent.id)}
                  >
                   <MdCancel size={18}/>
                  </div>
                  </div>
                  
                </span>

                {groupedChildren[parent.id] && (
                  <ul>
                    {groupedChildren[parent.id].map((child) => (
                      <li className="capitalize px-2 " key={child.id}>
                        <span className="flex items-center justify-between gap-2 border-b-1 pb-[2px] pt-[2px]">
                          <Link href={`categories/${child.id}`}>
                            {child.name}
                          </Link>
                          <div className="flex gap-1">
                          <div
                            className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                            onClick={() => handleOpenEditCategory(child)}
                          >
                            <MdEdit size={18} />
                          </div>

                          <div
                    className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                    onClick={() => handleToDestroyCategory(child.id)}
                  >
                   <MdCancel size={18}/>
                  </div>
                  </div>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="border p-3">
          <h2 className="text-lg font-bold underline">Produits</h2>
        </div>
        <div className="border p-3">
          <h2 className="text-lg font-bold underline">Commandes</h2>
        </div>
        <div className="border p-3">
          <h2 className="text-lg font-bold underline">Factures</h2>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => {
          setIsModalOpen(false)
          setIsEditCategory(null)
          setParent(null)
          }}>
          <h2 className="text-white mb-2">
            {isEditCategory ? <span>Modification </span> : <span>Ajout </span>}
            d'une catégorie
            {parent ? <span> dans "{parent?.name}"</span> : null}
          </h2>
          <AddCategoryForm
            defaultValues={{
              name: isEditCategory?.name ?? "",
              parent_id: isEditCategory?.parent_id ?? parent?.id ?? 0,
            }}
            onSubmit={(data) => {
              const safeData = {
                ...data,
              };
              console.log("Catégorie à ajouter :", safeData);
              isEditCategory
                ? handleUpdateCategory(isEditCategory.id, safeData)
                : handleAddCategory(safeData);
                setIsEditCategory(null);
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </main>
  );
}
