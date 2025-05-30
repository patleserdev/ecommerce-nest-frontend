import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store.js";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState,useRef } from "react";
import Image from "next/image.js";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { updateQuantity,removeFromCart } from "@/redux/reducers/cartSlice";
import Link from "next/link.js";
import CustomedButton from "../CustomedButton";
import { AnimatePresence,motion } from "framer-motion";
export default function CartIcon() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300); // délai de fermeture douce
  };

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
    console.log('quantity',quantity)
    if(quantity == 1 )
    {
      const confirmDelete=confirm("Voulez-vous vraiment supprimer le produit du panier ?")
      if (!confirmDelete) return

    }

    dispatch(
      updateQuantity({
        productId: productId,
        variationId: variationId,
        quantity: quantity - 1,
      })
    );
  };

  const handleToRemoveProductFromCart = (
    productId: number,
    variationId: number,
  ) => {
    const result=confirm("Voulez-vous vraiment supprimer le produit du panier ?")
    if(result)
    {
        dispatch(
            removeFromCart({
            productId: productId,
            variationId: variationId,
          })
        );
    }
    
  };

  return (
    <div
      className="flex flex-row cursor-pointer z-10"
      title="Accéder au panier"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative transition-all p-2">
        <MdOutlineShoppingCart size={30} />

        {cart.length > 0 && (
          <div className="absolute top-[-0.6rem] right-[-0.6rem] font-bold text-xs border px-2 py-1 rounded-[100%] bg-black text-white">
            {cart.length}
          </div>
        )}
        {isHovered && cart.length > 0 && (
           <AnimatePresence>
          <motion.div 
          key="dropdown"
           initial={{ opacity: 0, y:0,x: 0,scale:0 }}
           animate={{ opacity: 1,y:0, x: 0,scale:1 }}
           exit={{ opacity: 0, y: -10,x:200, scale: 0.95 }}
           transition={{duration:0.2}}
           className="absolute m-5 top-[1rem] right-0 min-w-150 min-h-100 max-h-500 border transition-all bg-[var(--background)] p-5 flex flex-col gap-5 origin-top-right ">
            <div>
              <h2 className="text-3xl mb-2">Contenu de votre panier :</h2>
              <hr />
            </div>

            {cart.map((item, i) => (
              <div
                key={i}
                className="flex flex-row items-center justify-start gap-10 pb-2 border-b-1 border-[#d8dbde]	"
              >
                <div className="w-[30%]">
                  <Image
                    alt="product"
                    src={"https://placehold.co/600x400/EEE/31343C"}
                    height={300}
                    width={300}
                  />
                </div>
                <div className="w-[50%] flex flex-col">
                  <span className="capitalize text-lg font-black">
                    {item.product.name}
                  </span>
                  <span>Taille : {item.variation.gender} {item.variation.size} </span>
                  <span>Quantité : {item.quantity}</span>
                </div>
                <div className="flex flex-col items-center h-[80%] justify-between">
                  <MdAddBox
                    size={24}
                    title="Ajouter une quantité"
                    onClick={() => {
                      if (item.product.id)
                        handleToAddQuantity(
                          item.product.id,
                          item.variation.id,
                          item.quantity
                        );
                    }}
                  />
                  <IoMdTrash size={24} title="Ne plus commander" onClick={() => {
                      if (item.product.id)
                        handleToRemoveProductFromCart(
                          item.product.id,
                          item.variation.id,
                        );
                    }}/>

                  <MdIndeterminateCheckBox
                    size={24}
                    title="Supprimer une quantité"
                    onClick={() => {
                        if (item.product.id)
                          handleToReduceQuantity(
                            item.product.id,
                            item.variation.id,
                            item.quantity
                          );
                      }}
                  />
                </div>
                <div className="w-[20%]">
                  <span className="text-3xl font-bold">
                    {item.price * item.quantity} €
                  </span>
                </div>
              </div>
              
            ))}

            <div>
              
              <CustomedButton>
              <Link href="/checkout/basket">Mon panier</Link>
              </CustomedButton>
              </div>
          </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
