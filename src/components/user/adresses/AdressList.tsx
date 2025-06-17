"use client";
import { toFirstLetterUpper } from "@/lib/utils";
import { AdresseType } from "@/types/adresses";
import { MdEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { addRole, destroyAdress } from "@/lib/api";
export default function AdressList({
  adresses,
  isReloading,
  isEditing,
}: {
  adresses: AdresseType[];
  isReloading: (value: boolean) => void;
  isEditing: (adress: AdresseType) => void;
}) {
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
      isReloading(true);
    }
  }

  /**
   * Prise en charge de modification d'adresse
   * @param adress
   */
  const handleToEditAddress = (adress: AdresseType) => {
    isEditing(adress);
    // setIsEditAddress(adress);
  };

  /**
   * Destruction de l'adresse
   * @param id
   */
  const handleToDestroyAdress = async (id: number) => {
    var result = confirm(`Détruire irrémédiablement l'adresse ${id}`);
    if (result) {
      try {
        const result = await destroyAdress(id);
        if (result) {
          isReloading(true);
        }
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
    <>
      {adresses.length > 0 &&
        adresses.map((adresse, i) => {
          const types = adresse.roles?.map((t) => t.type) ?? [];
          const isFacturation = types.includes("facturation");
          const isLivraison = types.includes("livraison");
          const isNone = types.includes("none");
          return (
            <li
              key={i}
              className="flex flex-col border p-2 relative"
              style={{ borderColor: "rgba(215,211,215,0.7)" }}
            >
              <div className="w-3/4">
                {toFirstLetterUpper(adresse.firstName)}{" "}
                {toFirstLetterUpper(adresse.lastName)}
              </div>
              <div className="w-3/4">
                {toFirstLetterUpper(adresse.streetAddress)}
              </div>
              {adresse.streetAddress2 && (
                <div className="w-3/4">
                  {toFirstLetterUpper(adresse.streetAddress2)}
                </div>
              )}
              <div className="w-3/4">
                {adresse.postalCode} {toFirstLetterUpper(adresse.city)}
              </div>

              {types.length > 0 && (
                <div className="">
                  <ul className="flex flex-row gap-1 my-1">
                    {types
                      .filter((type) => type != "none")
                      .map((type) => (
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
    </>
  );
}
