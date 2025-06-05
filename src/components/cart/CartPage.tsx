"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store.js";
import Image from "next/image.js";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import { UseDispatch } from "react-redux";
import { updateQuantity } from "@/redux/reducers/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  let total = 0;

  const handleToAddQuantity = (
    productId: number,
    variationId: number,
    quantity: number
  ) => {
    dispatch(
      updateQuantity({
        productId: productId,
        variationId: variationId,
        quantity: quantity + 1,
      })
    );
  };

  const handleToReduceQuantity = (
    productId: number,
    variationId: number,
    quantity: number
  ) => {
    console.log("quantity", quantity);
    if (quantity == 1) {
      const confirmDelete = confirm(
        "Voulez-vous vraiment supprimer le produit du panier ?"
      );
      if (!confirmDelete) return;
    }

    dispatch(
      updateQuantity({
        productId: productId,
        variationId: variationId,
        quantity: quantity - 1,
      })
    );
  };

  return (
    <table className="table-auto md:w-full">
      <thead>
        <tr className="flex flex-row items-center justify-around gap-2 mb-5">
          <th className="w-[10%]  py-2"></th>
          <th className="w-[25%] border py-2">Produit</th>
          <th className="w-[10%] border py-2">Couleur</th>
          <th className="w-[15%] border py-2">Prix</th>
          <th className="w-[15%] border py-2">Quantité</th>
          <th className="w-[20%] border py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((element, i) => {
          total += element.price * element.quantity;
          return (
            <tr
              key={i}
              className="flex flex-row items-center justify-around py-5 px-5 border-opacity-20 border-b"
              style={{ borderBottomColor: "rgba(211, 211, 211, 0.7)" }}
            >
              <td className="w-[10%] flex flex-row items-center justify-center">
                <Image
                  alt="product"
                  src={"https://placehold.co/600x400/EEE/31343C"}
                  height={100}
                  width={150}
                />
              </td>
              <td className="w-[25%] px-5 text-xl font-light tracking-wide">
                {element.product.name}
                {" | "}
                {element.variation.gender.toUpperCase()}
                {" | "}
                {element.variation.size}
              </td>
              <td className="w-[10%] flex flex-row items-center justify-center text-center">
                <div
                  className="w-10 h-5 "
                  style={{ backgroundColor: element.variation.color }}
                ></div>
              </td>
              <td className="w-[15%] text-center">{element.price} €</td>
              <td className="w-[15%] text-center flex flex-row items-center justify-center gap-5">
                <MdIndeterminateCheckBox
                  size={24}
                  title="Supprimer une quantité"
                  onClick={() => {
                    if (element.product.id &&  element.variation.id)
                      handleToReduceQuantity(
                        element.product.id,
                        element.variation.id,
                        element.quantity
                      );
                  }}
                />
                {element.quantity}
                <MdAddBox
                  size={24}
                  title="Ajouter une quantité"
                  onClick={() => {
                    if (element.product.id &&  element.variation.id)
                      handleToAddQuantity(
                        element.product.id,
                        element.variation.id,
                        element.quantity
                      );
                  }}
                />
              </td>
              <td className="w-[20%] text-center">
                {element.price * element.quantity} €
              </td>
            </tr>
          );
        })}
        <tr className="flex flex-row items-center justify-around py-5 px-5">
          <td className="w-[10%]"></td>
          <td className="w-[20%]"></td>
          <td className="w-[10%]"></td>
          <td className="w-[15%]"></td>
          <td className="w-[15%] text-center uppercase font-bold text-lg">
            Total
          </td>
          <td className="w-[20%] text-center font-bold text-xl">{total} €</td>
        </tr>
      </tbody>
    </table>
  );
}
