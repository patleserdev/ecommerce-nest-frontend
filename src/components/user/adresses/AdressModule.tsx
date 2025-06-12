"use client";
import { findAdresseByType } from "./functions";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import AddressForm from "./AdressForm";
import { AdresseType } from '@/types/adresses';
import { addAdress, updateAddress } from "@/lib/api";
import { useRouter } from "next/navigation.js";
import { getAdressesByUser } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import DisplayAdress from "./DisplayAdress";
import AdressList from "./AdressList";
export default function AdressModule() {
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
  // je récupère les adresses ici , moins compliqué par rapport au user que dans le server component
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState<AdresseType | null>(null);
  const [adresses, setAdresses] = useState<AdresseType[]>([]);
  const [reload, setReload] = useState(false);

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

  
  /**
   * Prise en charge d'ajout d'adresse
   */
  const handleToAddAddress = () => {
    setIsEditAddress(null);
    setIsModalOpen(true);
  };

  /**
   * Ajout d'adresse
   */
  const handleAddAddress = async (datas: AdresseType) => {
    // console.log(datas);

    try {
      await addAdress({ formData: datas });
      console.log("Adresse ajoutée !");
      setReload(!reload);
      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err);
    }
  };



  /**
   *  Modification d'adresse
   * @param id
   * @param datas
   */
  const handleUpdateAddress = async (id: number, datas: AdresseType) => {
    try {
      await updateAddress({ id, formData: datas });
      console.log("Adresse modifiée !");
      setIsEditAddress(null);
      setReload(!reload);
      // Fermer le modal ou rafraîchir les données ici
    } catch (err) {
      console.error("Erreur lors de l'ajout de la catégorie :", err);
    }
  };

  const isEditing=(adress:AdresseType)=>{
    setIsEditAddress(adress)
    setIsModalOpen(true)
  }

  const isReloading=(value:boolean)=>{
    if(value)
    {
      setReload(!reload)
    }
  }


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
    if (!user) {
      router.push("/login"); // ou ta route d'authentification
    }
  }, []);

  useEffect(() => {
    if (user != null) {
      (async () => {
        const adresses = await getAdressesByUser(dispatch);
        if (adresses) {
          setAdresses(adresses);
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
    <div className="md:p-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-4">
        <div className="border p-2">
          <h3 className="text-lg font-bold underline">Adresse de livraison</h3>
          {currentLivraison && <DisplayAdress adresse={currentLivraison} />}
          {!currentLivraison && <p>Non définie</p>}
        </div>
        <div className="border p-2">
          <h3 className="text-lg font-bold underline">
            Adresse de facturation
          </h3>
          {!currentFacturation && <p>Non définie</p>}
          {currentFacturation && <DisplayAdress adresse={currentFacturation} />}
        </div>
        <div className="border p-2">
          <div className="flex flex-row justify-between">
            <h3 className="text-lg font-bold underline mb-4">Mes adresses</h3>
            <MdAddCircle
              size={30}
              onClick={() => handleToAddAddress()}
              className="cursor-pointer"
            />
          </div>

          <div className="flex flex-row flex-wrap lg:flex-col gap-2">
         <AdressList adresses={adresses} isEditing={isEditing} isReloading={isReloading}/>
          </div>

          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <AddressForm
                defaultValues={{
                  title: isEditAddress?.title ?? "",
                  firstName: isEditAddress?.firstName ?? "",
                  lastName: isEditAddress?.lastName ?? "",
                  streetAddress: isEditAddress?.streetAddress ?? "",
                  streetAddress2: isEditAddress?.streetAddress2 ?? "",
                  postalCode: isEditAddress?.postalCode ?? "",
                  city: isEditAddress?.city ?? "",
                  country: isEditAddress?.country ?? "",
                  phoneToDelivery: isEditAddress?.phoneToDelivery ?? "",
                }}
                onSubmit={(data) => {
                  const safeData = {
                    ...data,
                  };
                  isEditAddress?.id && safeData
                    ? handleUpdateAddress(isEditAddress.id, safeData)
                    : handleAddAddress(safeData);
                  setIsEditAddress(null);
                  setIsModalOpen(false);
                }}
              />
            </Modal>
          )}

        </div>
      </div>
    </div>
  );
}
