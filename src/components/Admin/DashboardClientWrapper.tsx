"use client";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import Modal from "@/components/Modal";
import Link from "next/link";
import { Category, Child, Product } from "@/types/product";
import CategoryForm from "./CategoryForm";
import { addCategorie, destroyCategorie, updateCategorie } from "@/lib/api";
import { addProduct, updateProduct, destroyProduct } from "@/lib/api";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import ProductForm from "./ProductForm";
type Props = {
  categories: Category[];
  products: Product[];
};

export default function DashboardClientWrapper({
  categories,
  products,
}: Props) {
  const router = useRouter();

  const [mode, setMode] = useState("");
  const [isEditCategory, setIsEditCategory] = useState<
    Category | null | undefined
  >(null);
  const [isEditProduct, setIsEditProduct] = useState<
    Product | null | undefined
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parent, setParent] = useState<Category | null | undefined>(null);
  const [productCategory, setProductCategory] = useState<
    Category | null | undefined
  >(null);

  const mainCategories = categories
    .filter((cat) => cat.parent_id === 0)
    .sort((a, b) => a.name.localeCompare(b.name));
  const groupedChildren: Record<number, Child[]> = categories.reduce(
    (acc, cat) => {
      if (!acc[cat.parent_id]) acc[cat.parent_id] = [];
      acc[cat.parent_id].push({
        id: cat.id,
        name: cat.name,
        slug:cat.slug,
        parent_id: cat.parent_id,
        products: cat.products,
      });
      return acc;
    },
    {} as Record<number, Child[]>
  );

  const handleOpenAddCategory = async (parent?: Category | null) => {
    setMode("categories");
    setParent(parent);
    setIsModalOpen(true);
  };

  const handleOpenEditCategory = async (category: Category | null) => {
    setMode("categories");
    setIsEditCategory(category);
    setIsModalOpen(true);
  };

  const handleAddCategory = async (datas: {
    name: string;
    parent_id?: number;
  }) => {
    try {
      await addCategorie({ formData: datas });
      console.log("Catégorie ajoutée !");
      setMode("");
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
      await updateCategorie({ id: category_id, formData: datas });
      console.log("Catégorie modifiée !");
      setMode("");
      router.refresh();

      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err);
    }
  };

  const handleToDestroyCategory = (id: number) => {
    var result = confirm(`Détruire irrémédiablement la catégorie ${id}`);
    if (result) {
      try {
        destroyCategorie(id);
        router.refresh();
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie :", error);
      }
    }
  };

  const handleOpenAddProduct = (category: Category) => {
    setMode("products");
    setIsModalOpen(true);
    setProductCategory(category);
  };

  const handleAddProduct = async (datas: Product) => {
    try {
      await addProduct({ formData: datas });
      console.log("Catégorie ajoutée !");
      setMode("");
      router.refresh();

      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err);
    }
  };

  const handleOpenEditProduct = async (product: Product | null) => {
    setMode("products");
    setIsEditProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async (product_id: number, datas: Product) => {
    try {
      await updateProduct({ id: product_id, formData: datas });
      console.log("Produit modifiée !");
      setMode("");
      router.refresh();

      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout du produit :", err);
    }
  };

  const handleToDestroyProduct = (id: number) => {
    var result = confirm(`Détruire irrémédiablement le produit ${id}`);
    if (result) {
      try {
        destroyProduct(id);
        router.refresh();
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie :", error);
      }
    }
  };

  return (
    <main className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
      <div className="border p-3">
      <span className="flex items-center gap-2">
            <h2 className="text-lg font-bold underline">
              Marques 
              {/* ({categories.length}) */}
            </h2>

            <div
              className="cursor-pointer"
              onClick={() => handleOpenAddCategory()}
            >
              <MdAddCircle size={24} />
            </div>
          </span>
      </div>
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
                <span className="flex items-center gap-2 border-b-1 pb-1">
                  <Link
                    href={`categories/${parent.slug}`}
                    className="font-bold w-[80%]"
                  >
                    {parent.name} <span className="normal-case opacity-[0.6]"><i>/{parent.slug}</i></span>
                  </Link>
                  <div className="flex gap-1 w-[20%]">
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
                      onClick={() => handleToDestroyCategory(parent.id)}
                    >
                      <MdCancel size={18} />
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
                              <MdCancel size={18} />
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
          <h2 className="text-lg font-bold underline">
            Produits ({products.length})
          </h2>
          <div>
            <ul className="p-5">
              {categories
                .filter((parent) => parent.parent_id === 0)
                .map((parent, i) => {
                  // Récupérer toutes les sous-catégories de ce parent
                  const childCategories = categories.filter(
                    (child) => child.parent_id === parent.id
                  );
                  // Récupérer tous les produits de ces sous-catégories
                  const productCount = products.filter((product) =>
                    childCategories.some(
                      (child) => child.id === product.category.id
                    )
                  ).length;

                  return (
                    <li
                      key={i}
                      className="uppercase mb-5 flex flex-col border-b-1"
                    >
                      <div className="flex flex-row">
                      <div className="w-[90%]">
                        <strong>
                          {parent.name} ({productCount})
                        </strong>
                      </div>

                      <div className="flex flex-row-reverse gap-1 w-[10%] pb-1">
                        <div
                          className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                          onClick={() => {
                            setProductCategory(parent);
                            handleOpenAddProduct(parent);
                          }}
                        >
                          <MdAddCircle size={24} />
                        </div>
                      </div>
</div>
                      <ul>
                                
                                {products
                                  .filter(
                                    (product) =>
                                      product.category.id === parent.id
                                  )
                                  .map((product, k) => (
                                    <li
                                      className="capitalize px-5 mb-1"
                                      key={k}
                                    >
                                      <div className="flex justify-between  gap-5">
                                        <div>
                                          {product.name.slice(0, 15)}...
                                        </div>

                                        <div className="flex gap-1">
                                          <div
                                            className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                                            onClick={() => {
                                              setProductCategory(parent);
                                              handleOpenEditProduct(product);
                                            }}
                                          >
                                            <MdEdit size={18} />
                                          </div>

                                          <div
                                            className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                                            onClick={() =>
                                              handleToDestroyProduct(
                                                product.id!
                                              )
                                            }
                                          >
                                            <MdCancel size={18} />
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))}

                              </ul>

                      <ul>
                        {childCategories.map((child, j) => {
                          const childProductCount = products.filter(
                            (product) => product.category.id === child.id
                          ).length;
                          return (
                            <li
                              key={j}
                              className="capitalize font-bold pl-4 mb-2"
                            >
                              <div className="flex items-center gap-2 w-50">
                                <em>
                                  {child.name} ({childProductCount})
                                </em>
                                <div className="flex gap-1">
                                  <div
                                    className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                                    onClick={() => {
                                      setProductCategory(child);
                                      handleOpenAddProduct(child);
                                    }}
                                  >
                                    <MdAddCircle size={18} />
                                  </div>
                                </div>
                              </div>

                              <ul>
                                
                                {products
                                  .filter(
                                    (product) =>
                                      product.category.id === child.id
                                  )
                                  .map((product, k) => (
                                    <li
                                      className="font-normal px-5 mb-1"
                                      key={k}
                                    >
                                      <div className="flex justify-between gap-5 border-b-1">
                                        <div>
                                          {product.name.slice(0, 15)}...
                                        </div>

                                        <div className="flex gap-1">
                                          <div
                                            className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                                            onClick={() => {
                                              setProductCategory(child);
                                              handleOpenEditProduct(product);
                                            }}
                                          >
                                            <MdEdit size={18} />
                                          </div>

                                          <div
                                            className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                                            onClick={() =>
                                              handleToDestroyProduct(
                                                product.id!
                                              )
                                            }
                                          >
                                            <MdCancel size={18} />
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))}

                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="border p-3">
          <h2 className="text-lg font-bold underline">Commandes</h2>
        </div>
        <div className="border p-3">
          <h2 className="text-lg font-bold underline">Factures</h2>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setMode("");
            setIsEditCategory(null);
            setParent(null);
          }}
        >
          <h2 className="mb-2">
            <span>
              {mode === "categories" && (
                <>
                  {isEditCategory ? "Modification" : "Ajout"} d'une catégorie
                  {parent && ` dans "${parent.name}"`}
                </>
              )}

              {mode === "products" && (
                <>
                  {isEditProduct ? "Modification" : "Ajout"} d'un produit
                  <b>{` "${productCategory?.name}"`}</b>
                </>
              )}
            </span>
          </h2>
          {mode == "categories" && (
            <CategoryForm
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
          )}

          {mode == "products" && (
            <ProductForm
              defaultValues={{
                name: isEditProduct?.name ?? "",
                description: isEditProduct?.description ?? "",
                price: isEditProduct?.price ?? 0,
                sku: isEditProduct?.sku ?? "",
                // quantity: isEditProduct?.quantity ?? 0,
                categoryId:
                  isEditProduct?.category.id ?? productCategory?.id ?? 0,
                variations:
                  isEditProduct?.variations ?? [],
              }}
              onSubmit={(data) => {
                const safeData = {
                  ...data,
                };
                console.log("Produit à ajouter :", safeData);
                isEditProduct?.id && safeData
                  ? handleUpdateProduct(isEditProduct.id, safeData)
                  : handleAddProduct(safeData);
                setIsEditProduct(null);
                setIsModalOpen(false);
              }}
            />
          )}
        </Modal>
      )}
    </main>
  );
}
