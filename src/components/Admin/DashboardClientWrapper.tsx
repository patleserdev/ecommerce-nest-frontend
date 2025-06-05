"use client";
import { useState, useEffect } from "react";
import { MdAddCircle } from "react-icons/md";
import Modal from "@/components/Modal";
import Link from "next/link";
import {
  Category,
  Child,
  Product,
  Brand,
  UpdateProduct,
  CreateProduct,
} from "@/types/product";
import CategoryForm from "./CategoryForm";
import { addCategorie, destroyCategorie, updateCategorie } from "@/lib/api";
import { addProduct, updateProduct, destroyProduct } from "@/lib/api";
import { addBrand, updateBrand, destroyBrand } from "@/lib/api";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import ProductForm from "./ProductForm";
import BrandForm from "./BrandForm";
import Accordion from "../motions/Accordion";
import { revalidateProducts } from "@/actions/revalidate";
import { MdWarningAmber } from "react-icons/md";
import { MoonLoader } from "react-spinners";
type Props = {
  categories: Category[];
  products: Product[];
  brands: Brand[];
};

export default function DashboardClientWrapper({
  categories,
  products,
  brands,
}: Props) {
  const router = useRouter();

  const [mode, setMode] = useState("");
  const [isEditCategory, setIsEditCategory] = useState<
    Category | Child | null | undefined
  >(null);
  const [isEditProduct, setIsEditProduct] = useState<
    Product | null | undefined
  >(null);
  const [isEditBrand, setIsEditBrand] = useState<Brand | null | undefined>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parent, setParent] = useState<Category | null | undefined>(null);
  const [productCategory, setProductCategory] = useState<
    Category | null | undefined
  >(null);
  const [productbrand, setProductBrand] = useState<Brand | null | undefined>(
    null
  );

  const [expanded, setExpanded] = useState<false | number>(0);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (isWaiting) {
      setTimeout(() => {
        setIsWaiting(false);
        setIsEditProduct(null)
      }, 500);
      
    }
  }, [products]);
  /**
   * Réorganisation des catégories pour le display
   */
  const mainCategories = categories
    .filter((cat) => cat.parent_id === 0)
    .sort((a, b) => a.name.localeCompare(b.name));
  const groupedChildren: Record<number, Child[]> = categories.reduce(
    (acc, cat) => {
      if (!acc[cat.parent_id]) acc[cat.parent_id] = [];
      acc[cat.parent_id].push({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        parent_id: cat.parent_id,
        products: cat.products,
      });
      return acc;
    },
    {} as Record<number, Child[]>
  );

  /**
   * Prisen charge d'ajout de catégorie
   * @param parent
   */
  const handleOpenAddCategory = async (parent?: Category | null) => {
    setMode("categories");
    setParent(parent);
    setIsModalOpen(true);
  };

  /**
   * Ajout de la catégorie
   * @param datas
   */
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

  /**
   * Prise en charge de modification de catégorie
   * @param category
   */
  const handleOpenEditCategory = async (category: Category | Child) => {
    if (typeof category.parent_id !== "number") {
      console.warn("Impossible d’éditer : parent_id manquant !");
      return;
    }

    setMode("categories");
    setIsEditCategory(category);
    setIsModalOpen(true);
  };
  /**
   * Modification de la catégorie
   * @param category_id
   * @param datas
   */
  const handleUpdateCategory = async (
    category_id: number,
    datas: { name: string; parent_id?: number }
  ) => {
    try {
      await updateCategorie({ id: category_id, formData: datas });
      console.log("Catégorie modifiée !");
      setMode("");
      setIsEditCategory(null);
      router.refresh();

      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err);
    }
  };

  /**
   * Destruction de la catégorie
   * @param id
   */
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

  /**
   * Prise en charge de l'ajout d'un produit
   * @param category
   */
  const handleOpenAddProduct = (category: Category) => {
    setIsEditProduct(null);
    setIsEditCategory(null);
    setMode("products");
    setIsModalOpen(true);
    setProductCategory(category);
  };

  /**
   * Ajout d'un produit
   * @param datas
   */
  const handleAddProduct = async (datas: CreateProduct) => {
    try {
      await addProduct({ formData: datas });
      console.log("Produit ajouté !");
      setMode("");
      router.refresh();

      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout du produit :", err);
    }
  };

  /**
   * Prise en charge de la modification d'un produit
   * @param product
   */
  const handleOpenEditProduct = async (product: Product | null) => {
    setMode("products");
    setIsEditProduct(null); // Reset


      setIsModalOpen(true);
      console.log("passage du product pour edition", product);
      setIsEditProduct(product);
    
  };

  /**
   * Modification d'un produit
   * @param product_id
   * @param datas
   */
  const handleUpdateProduct = async (
    product_id: number,
    datas: UpdateProduct
  ) => {
    console.log("datas envoyées à l'update", datas);
    
    try {
      await updateProduct({ id: product_id, formData: datas });
      setIsWaiting(true);
      console.log("Produit modifiée !", datas);
      setMode("");
      // setIsEditProduct(null);
      router.refresh();
      await revalidateProducts();

      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout du produit :", err);
    }
  };

  /**
   * Destruction d'un produit
   * @param id
   */
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

  /**
   * Prise en charge de l'ajout d'une marque
   * @param category
   */
  const handleOpenAddBrand = () => {
    setIsEditProduct(null);
    setIsEditCategory(null);
    setIsEditBrand(null);
    setMode("brands");
    setIsModalOpen(true);
  };

  /**
   * Ajout d'une marque
   * @param datas
   */
  const handleAddBrand = async (datas: Brand) => {
    try {
      await addBrand({ formData: datas });
      console.log("Marque ajoutée !");
      setMode("");
      router.refresh();

      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout de la marque :", err);
    }
  };

  /**
   * Prise en charge de la modification d'un produit
   * @param product
   */
  const handleOpenEditBrand = async (brand: Brand | null) => {
    setMode("brands");
    setIsEditBrand(brand);
    setIsModalOpen(true);
  };

  /**
   * Modification d'un produit
   * @param product_id
   * @param datas
   */
  const handleUpdateBrand = async (
    brand_id: number | undefined,
    datas: { name: string }
  ) => {
    if (brand_id)
      try {
        await updateBrand({ id: brand_id, formData: datas });
        console.log("Marque modifiée !");
        setMode("");
        router.refresh();

        // Fermer le modal ou rafraîchir les données ici
      } catch (err) {
        console.error("Erreur lors de l'ajout de la marque :", err);
      }
  };

  /**
   * Destruction d'un produit
   * @param id
   */
  const handleToDestroyBrand = (id: number | undefined) => {
    if (id) {
      var result = confirm(`Détruire irrémédiablement la marque ${id}`);
      if (result) {
        try {
          destroyBrand(id);
          router.refresh();
        } catch (error) {
          console.error("Erreur lors de la suppression de la marque :", error);
        }
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
              onClick={() => handleOpenAddBrand()}
            >
              <MdAddCircle size={24} />
            </div>
          </span>

          <ul className="p-5">
            {brands.map((brand) => (
              <li key={brand.id} className="pb-5 uppercase ">
                <span className="flex items-center gap-2 border-b-1 pb-1">
                  {brand.name}

                  <div className="flex gap-1 w-[20%]">
                    <div
                      className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                      onClick={() => handleOpenAddBrand()}
                    >
                      <MdAddCircle size={18} />
                    </div>

                    <div
                      className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                      onClick={() => handleOpenEditBrand(brand)}
                    >
                      <MdEdit size={18} />
                    </div>

                    <div
                      className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                      onClick={() => handleToDestroyBrand(brand.id)}
                    >
                      <MdCancel size={18} />
                    </div>
                  </div>
                </span>
              </li>
            ))}
          </ul>
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
                    {parent.name}{" "}
                    <span className="normal-case opacity-[0.6]">
                      <i>/{parent.slug}</i>
                    </span>
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
                    categories.some(
                      (child) =>
                        product.category && parent.id === product.category.id
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
                              product.category &&
                              product.category.id === parent.id
                          )
                          .map((product, k) => (
                            <li className="capitalize px-5 mb-1" key={k}>
                              <div className="flex justify-between  gap-5">
                                <div>{product.name.slice(0, 50)}...</div>

                                <div className="flex gap-1">
                                  <div
                                    title="Aucune variation"
                                    className="opacity-[0.5]"
                                  >
                                    {product.variations?.length == 0 && (
                                      <MdWarningAmber size={18} />
                                    )}
                                  </div>

                                  {!isWaiting &&  <div
                                    className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                                    onClick={() => {
                                      setProductCategory(parent);
                                      handleOpenEditProduct(product);
                                    }}
                                  >
                                    <MdEdit size={18} />
                                  </div>}

                                  {isWaiting && <div
                                    className=" opacity-[0.5]"
                                  ><MoonLoader size={15}/>
                                  </div>}

                                  

                                  <div
                                    className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                                    onClick={() =>
                                      handleToDestroyProduct(product.id!)
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
                            (product) =>
                              product.category &&
                              product.category.id === child.id
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
                                      product.category &&
                                      product.category.id === child.id
                                  )
                                  .map((product, k) => {
                                    const displayProduct = (
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
                                    );

                                    return (
                                      <Accordion
                                        i={k}
                                        expanded={expanded}
                                        setExpanded={setExpanded}
                                        content={displayProduct}
                                      />
                                    );
                                  })}
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
            setIsEditProduct(null);
            setIsEditBrand(null);
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

              {mode === "brands" && (
                <>{isEditProduct ? "Modification" : "Ajout"} d'une marque</>
              )}
            </span>
          </h2>

          {mode == "brands" &&
            (isEditBrand || (mode === "brands" && !isEditBrand)) && (
              <BrandForm
                defaultValues={{
                  name: isEditBrand?.name ?? "",
                }}
                onSubmit={(data) => {
                  const safeData = {
                    ...data,
                  };
                  console.log("Catégorie à ajouter :", safeData);
                  isEditBrand
                    ? handleUpdateBrand(isEditBrand.id, safeData)
                    : handleAddBrand(safeData);
                  setIsEditBrand(null);
                  setIsModalOpen(false);
                }}
              />
            )}

          {mode == "categories" &&
            (isEditCategory || (mode === "categories" && !isEditCategory)) && (
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

          {mode == "products" &&
            (isEditProduct || (mode === "products" && !isEditProduct)) && (
              <ProductForm
                brands={brands}
                defaultValues={{
                  name: isEditProduct?.name ?? "",
                  description: isEditProduct?.description ?? "",
                  price: isEditProduct?.price ?? 0,
                  sku: isEditProduct?.sku ?? "",
                  // quantity: isEditProduct?.quantity ?? 0,
                  categoryId:
                    (isEditProduct &&
                      isEditProduct.category &&
                      isEditProduct?.category.id) ??
                    productCategory?.id ??
                    0,
                  variations: isEditProduct?.variations ?? [],
                  brandId: isEditProduct?.brand?.id ?? 0,
                }}
                onSubmit={(data) => {
                  const safeData = {
                    ...data,
                  };
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
