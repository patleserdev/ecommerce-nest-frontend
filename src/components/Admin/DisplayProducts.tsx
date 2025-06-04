"use client";
import { useState } from "react";
import { Category, Product } from "../../types/product";
import { addProduct, updateProduct, destroyProduct } from "@/lib/api";
import { useRouter } from "next/navigation";
import { MdEdit,MdCancel } from "react-icons/md";
export default function Products({
  categorie,
  products,
}: {
  categorie: Category;
  products: Product[];
}) {
  const router = useRouter();
  const [mode, setMode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productCategory, setProductCategory] = useState<Category | null>(null);
  const [isEditProduct, setIsEditProduct] = useState<Product | null>(null);
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

  const handleUpdateProduct = async (product_id: Number, datas: Product) => {
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

  const handleToDestroyProduct = (id: Number) => {
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
    <ul>
      {products
        .filter((product: Product) => product?.category?.id === categorie.id)
        .map((product, k) => (
          <li className="font-normal px-5 mb-1" key={k}>
            <div className="flex justify-between gap-5 border-b-1">
              <div>{product.name.slice(0, 15)}...</div>

              <div className="flex gap-1">
                <div
                  className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                  onClick={() => {
                    setProductCategory(categorie);
                    handleOpenEditProduct(product);
                  }}
                >
                  <MdEdit size={18} />
                </div>

                <div
                  className="cursor-pointer opacity-[0.5] hover:opacity-[1] transition-all"
                  onClick={() => handleToDestroyProduct(product.id!)}
                >
                  <MdCancel size={18} />
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
