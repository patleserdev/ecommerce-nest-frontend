import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store.js";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import Image from "next/image.js";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { updateQuantity, removeFromCart } from "@/redux/reducers/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import CustomedLink from "../CustomedLink";

export default function CartIcon() {
  /***
   *          _           _
   *         | |         | |
   *       __| | ___  ___| | __ _ _ __ ___
   *      / _` |/ _ \/ __| |/ _` | '__/ _ \
   *     | (_| |  __/ (__| | (_| | | |  __/
   *      \__,_|\___|\___|_|\__,_|_|  \___|
   *
   *
   */
  const cart = useSelector((state: RootState) => state.cart.items);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [cartCount, setCartCount] = useState(cart.length);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();

  const cartRef = useRef<HTMLDivElement>(null);

  /***
   *       __                  _   _
   *      / _|                | | (_)
   *     | |_ _   _ _ __   ___| |_ _  ___  _ __  ___
   *     |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
   *     | | | |_| | | | | (__| |_| | (_) | | | \__ \
   *     |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
   *
   *
   */
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

  const handleToRemoveProductFromCart = (
    productId: number,
    variationId: number
  ) => {
    const result = confirm(
      "Voulez-vous vraiment supprimer le produit du panier ?"
    );
    if (result) {
      dispatch(
        removeFromCart({
          productId: productId,
          variationId: variationId,
        })
      );
    }
  };
  /***
   *                           __  __          _
   *                          / _|/ _|        | |
   *      _   _ ___  ___  ___| |_| |_ ___  ___| |_ ___
   *     | | | / __|/ _ \/ _ \  _|  _/ _ \/ __| __/ __|
   *     | |_| \__ \  __/  __/ | | ||  __/ (__| |_\__ \
   *      \__,_|___/\___|\___|_| |_| \___|\___|\__|___/
   *
   *
   */

  /**
   *  Mise à jour pour forcer l'animation sur changement
   */
  useEffect(() => {
    setCartCount(cart.length);
  }, [cart.length]);

  /**
   *  Vérification si mobile hover = click
   */
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px : seuil de mobile
    };

    checkIfMobile(); // Initial check
    window.addEventListener("resize", checkIfMobile); // Update on resize

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  /**
   *  en desktop , fermer le cart si not hover
   */
  useEffect(() => {
    if (!isMobile || !isHovered) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isHovered]);

  /***
   *          _ _           _
   *         | (_)         | |
   *       __| |_ ___ _ __ | | __ _ _   _
   *      / _` | / __| '_ \| |/ _` | | | |
   *     | (_| | \__ \ |_) | | (_| | |_| |
   *      \__,_|_|___/ .__/|_|\__,_|\__, |
   *                 | |             __/ |
   *                 |_|            |___/
   */

  return (
    <div
      className="flex flex-row cursor-pointer z-10"
      title="Accéder au panier"
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onClick={isMobile ? () => setIsHovered((prev) => !prev) : undefined}
    >
      <div className="relative transition-all p-2">
        <MdOutlineShoppingCart size={30} />

        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              key={cartCount} // ✅ force le remount à chaque changement
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="absolute top-[-0.6rem] right-[-0.6rem] font-bold text-xs border px-2 py-1 rounded-[100%] bg-black text-white"
            >
              {cart.length}
            </motion.div>
          )}
        </AnimatePresence>

        {isHovered && cart.length > 0 && (
          <AnimatePresence>
            <motion.div
              ref={cartRef}
              key="dropdown"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, x: 200, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute 
              top-[2rem]
              left-[-50%]           // Mobile : aligné à gauche
              md:left-auto     // Supprimé sur desktop
              md:right-0       // Desktop : aligné à droite
              bg-[var(--background)]
              text-[var(--foreground)]
              m-5
              z-10
              min-w-50 md:min-w-150
              min-h-50 md:min-h-100
              md:max-h-500
              border
              p-5
              flex flex-col items-center justify-center gap-5
              origin-top-left md:origin-top-right"
            >
              <div>
                <h2 className="text-lg md:text-3xl p-1 mb-2">
                  Contenu de votre panier :
                </h2>
                <hr />
              </div>
              {/** Panier mobile temporaire **/}
              <div className="flex md:hidden">{cartCount} produits</div>
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="hidden md:flex md:flex-row items-center justify-start gap-2 md:gap-10 pb-2 border-b-1 border-[#d8dbde] z-50 p-1"
                >
                  <div className="md:w-[30%] hidden md:block">
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
                    <span>
                      Taille : {item.variation.gender} {item.variation.size}{" "}
                    </span>
                    <span>Quantité : {item.quantity}</span>
                  </div>
                  <div className="flex flex-col items-center h-[80%] justify-between">
                    <MdAddBox
                      size={24}
                      title="Ajouter une quantité"
                      onClick={() => {
                        if (item.product.id && item.variation.id)
                          handleToAddQuantity(
                            item.product.id,
                            item.variation.id,
                            item.quantity
                          );
                      }}
                    />
                    <IoMdTrash
                      size={24}
                      title="Ne plus commander"
                      onClick={() => {
                        if (item.product.id && item.variation.id)
                          handleToRemoveProductFromCart(
                            item.product.id,
                            item.variation.id
                          );
                      }}
                    />

                    <MdIndeterminateCheckBox
                      size={24}
                      title="Supprimer une quantité"
                      onClick={() => {
                        if (item.product.id && item.variation.id)
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
                <CustomedLink title={"Mon panier"} url={"/checkout/basket"} />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
