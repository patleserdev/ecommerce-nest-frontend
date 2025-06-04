"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store.js";

export default function DeliveryModule() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cart = useSelector((state: RootState) => state.cart.items);
  return (
    <div>
      <h1 className="text-3xl">Delivery module</h1>
      {user.username != "" && <h2 className="text-xl">J'ai un user</h2>}
      {cart.length > 0 && <h2 className="text-xl">J'ai {cart.length} produits dans le panier</h2>}
    </div>
  );
}
