"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store.js";
import LoginFormHandler from "../user/LoginFormHandler";
import { useEffect, useState } from "react";
import { getAdressesByUser } from "@/lib/api";
import { AdresseType } from "@/types/adresses";
import { findAdresseByType } from "../user/adresses/functions";
import DisplayAdress from "../user/adresses/DisplayAdress";
import CustomedButton from "../CustomedButton";
import Modal from "../Modal";
import TransportChoicer from "./TransportChoicer";
export default function DeliveryModule() {
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

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cart = useSelector((state: RootState) => state.cart.items);

  const [adresses, setAddresses] = useState<AdresseType[]>([]);
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = [
    { id: "colissimo", label: "", icon: "/icons/colissimo.svg" },
    { id: "colissimo_pickup", label: "Pickup", icon: "/icons/colissimo.svg" },
    { id: "chronopost", label: "", icon: "/icons/chronopost-logo.svg" },
    {
      id: "chronopost_pickup",
      label: "Pickup",
      icon: "/icons/chronopost-logo.svg",
    },
  ];
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

  /**
   * Récupère l'adresse de facturation
   */
  const currentFacturation = findAdresseByType(adresses, "facturation");

  /**
   * Récupère l'adresse de livraison
   */
  const currentLivraison = findAdresseByType(adresses, "livraison");

  const handleChangeCartLivraisonAdress = () => {
    setIsModalOpen(true);
  };

  const handleChangeCartFacturationAdress = () => {
    setIsModalOpen(true);
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

  useEffect(() => {
    if (user != null) {
      (async () => {
        const adresses = await getAdressesByUser();
        if (adresses) {
          setAddresses(adresses);
        }
      })();
    }
  }, [reload]);

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
    <div>
      <h1 className="text-3xl">Options de livraison (delivery module)</h1>
      {/* {user && <h2 className="text-xl">J'ai un user</h2>} */}
      {!user && <LoginFormHandler redirectTo={"/checkout/payment"} />}
      {/* {cart.length > 0 && (
        <h2 className="text-xl">J'ai {cart.length} produits dans le panier</h2>
      )} */}

      <div className="justify-self-center grid grid-cols-1 md:grid-cols-4 grid-rows-1 gap-4 my-5">
        <div className="border p-2 relative">
          <h3>Adresse de livraison</h3>
   
            <div className="w-[80%] h-[80%]">
              {currentLivraison && <DisplayAdress adresse={currentLivraison} />}
              {!currentLivraison && <p>Non définie</p>}
            </div>

            {currentLivraison && (
              <div className="m-2">
                <CustomedButton
                  onClick={() => handleChangeCartLivraisonAdress()}
                >
                  Changer
                </CustomedButton>
              </div>
            )}
          </div>
        
        <div className="border p-2 relative">
          <h3>Adresse de facturation</h3>
          <div className="w-[80%] h-[80%]">
            {currentFacturation && (
              <DisplayAdress adresse={currentFacturation} />
            )}
            {!currentFacturation && <p>Non définie</p>}
          </div>

          {currentFacturation && (
            <div className="m-2">
              <CustomedButton
                onClick={() => handleChangeCartFacturationAdress()}
              >
                Changer
              </CustomedButton>
            </div>
          )}
        </div>
        <div className="border p-2">
          <h3>Options de livraison</h3>
          <TransportChoicer options={options} />
        </div>
        <div className="border p-2">
          <h3>Rappel du panier</h3>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          par défaut, je prends l'adresse du user role :<br />
          quand je fais changer, je peux choisir ou créer une autre adresse{" "}
          <br />
          - si je choisis une autre adresse, je l'affecte a current
          <br />- si je crée une autre adresse, je la crée puis je l'affecte à
          current
          <span className="line-through">
            {" "}
            - s'il user garde celle-ci , je crée le cart et je crée un role user
            - cart - adresse - type
          </span>
          ... en fait c'est plus simple. En validant cet écran : <br />
          - je récupère les current adresses <br />
          - je crée un cart
          <br />
          - je crée un role user - cart - adresse - type
          <br />
          j'ai alors un cart qui contient des rôles bien définis sans toucher
          aux adresses <br />
        </Modal>
      )}
    </div>
  );
}
