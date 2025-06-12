"use client";
import { toFirstLetterUpper } from "@/lib/utils";
import { findAdresseByType } from "./functions";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import AddressForm from "./AdressForm";
import { AdresseType } from "@/types/adresses";
import { MdEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { addAdress, addRole, destroyAdress, updateAddress } from "@/lib/api";
import { useRouter } from "next/navigation.js";
import { getAdressesByUser } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import DisplayAdress from "./DisplayAdress";
export default function AdressList() {
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
   * Définit le type de l'adresse role
   */
  async function handleSetAs(
    adresse: AdresseType,
    type: "facturation" | "livraison" | undefined
  ) {
    console.log(`Définir l’adresse ${adresse.id} comme ${type}`);
    console.log("adresse", adresse);

    if (adresse.id) {
      const formData = { adresse: { id: adresse.id }, type: type };
      const result = await addRole({ formData });
      setReload(!reload);
    }
  }
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
   * Prise en charge de modification d'adresse
   * @param adress
   */
  const handleToEditAddress = (adress: AdresseType) => {
    setIsEditAddress(adress);
    setIsModalOpen(true);
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

  /**
   * Destruction de l'adresse
   * @param id
   */
  const handleToDestroyAdress = async (id: number) => {
    var result = confirm(`Détruire irrémédiablement l'adresse ${id}`);
    if (result) {
      try {
        await destroyAdress(id);
        setReload(!reload);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'adresse' :", error);
      }
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
            {adresses.length > 0 &&
              adresses.map((adresse, i) => {
                const types = adresse.roles?.map((t) => t.type) ?? [];
                const isFacturation = types.includes("facturation");
                const isLivraison = types.includes("livraison");

                return (
                  <li
                    key={i}
                    className="flex flex-col border p-2 relative"
                    style={{ borderColor: "rgba(215,211,215,0.7)" }}
                  >
                    <div>
                      {toFirstLetterUpper(adresse.firstName)}{" "}
                      {toFirstLetterUpper(adresse.lastName)}
                    </div>
                    <div>{toFirstLetterUpper(adresse.streetAddress)}</div>
                    {adresse.streetAddress2 && (
                      <div>{toFirstLetterUpper(adresse.streetAddress2)}</div>
                    )}
                    <div>
                      {adresse.postalCode} {toFirstLetterUpper(adresse.city)}
                    </div>

                    {types.length > 0 && (
                      <div className="">
                        <ul className="flex flex-row gap-1 my-1">
                          {types.map((type) => (
                            <li
                              key={type}
                              className={`${
                                type === "facturation" || type === "livraison"
                                  ? "bg-[var(--foreground)] text-[var(--background)]"
                                  : ""
                              } p-2 text-xs rounded-xl text-center`}
                            >
                              {type && toFirstLetterUpper(type)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-row-reverse items-center gap-1">
                      {!isFacturation &&
                        /*  !currentFacturation && */
                        typeof adresse.id === "number" && (
                          <button
                            className="mt-2 p-1 border rounded text-xs bg-[var(--foreground)] text-[var(--background)] cursor-pointer"
                            onClick={() => handleSetAs(adresse, "facturation")}
                          >
                            Définir comme adresse de facturation
                          </button>
                        )}
                      {!isLivraison &&
                        /* !currentLivraison && */
                        typeof adresse.id === "number" && (
                          <button
                            className="mt-2 p-1 border rounded text-xs bg-[var(--foreground)] text-[var(--background)] cursor-pointer"
                            onClick={() => handleSetAs(adresse, "livraison")}
                          >
                            Définir comme adresse de livraison
                          </button>
                        )}
                    </div>
                    <div className="flex flex-row-reverse gap-1 mt-1">
                      <MdEdit
                        size={30}
                        className="cursor-pointer"
                        title="Modifier adresse"
                        onClick={() => handleToEditAddress(adresse)}
                      />
                      <MdCancel
                        size={30}
                        className="cursor-pointer"
                        title="Supprimer adresse"
                        onClick={() =>
                          adresse.id != undefined
                            ? handleToDestroyAdress(adresse.id)
                            : null
                        }
                      />
                    </div>
                  </li>
                );
              })}
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
          <div>
            - créer une adresse dans modal, pouvoir supprimer des adresses ,
            affecter a livraison ou facturation si non sélectionner, pouvoir
            modifier .
          </div>
        </div>
      </div>
    </div>
  );
}
