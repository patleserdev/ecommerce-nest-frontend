"use client";
import { toFirstLetterUpper } from "../../../../lib/utils";
import { MdAddCircle } from "react-icons/md";
type addressRole={
  id:number,
  name:string
}
type adresseType={
  id: number,
  title: string,
  firstName:string,
  lastName: string,
  streetAddress: string,
  streetAddress2: string,
  postalCode: string,
  city: string,
  country: string,
  phoneToDelivery:string,
  adresses: addressRole[],
}
const adresses = [
  {
    id: 1,
    title: "Mr",
    firstName: "paul",
    lastName: "duchemin",
    streetAddress: "5 rue du paté en croûte",
    streetAddress2: "",
    postalCode: "65200",
    city: "Lyon",
    country: "France",
    phoneToDelivery: "0545789588",
    adresses: [{ id: 1, name: "livraison" }],
  },
  {
    id: 2,
    title: "Mme",
    firstName: "micheline",
    lastName: "duchemin",
    streetAddress: "9 rue de la chartreuse",
    streetAddress2: "",
    postalCode: "65420",
    city: "Lyon",
    country: "France",
    phoneToDelivery: "0688775599",
    adresses: [{ id: 2, name: "facturation" }],
  },
  {
    id: 3,
    title: "Mme",
    firstName: "Alain",
    lastName: "Arnaud-Duchemin",
    streetAddress: "14 rue des balles rebondissantes",
    streetAddress2: "",
    postalCode: "68754",
    city: "Villedieu du bois",
    country: "France",
    phoneToDelivery: "0579658554",
    adresses: [],
  },
];

function handleSetAs(adresseId: number, type: "facturation" | "livraison") {
  console.log(`Définir l’adresse ${adresseId} comme ${type}`);
}

function AddressDisplay({ adresse }: {adresse:adresseType}) {
  return (
    <div className="flex flex-col py-2 text-2xl gap-1">
      <div>
        {toFirstLetterUpper(adresse.title)}{" "}
        {toFirstLetterUpper(adresse.firstName)}{" "}
        {toFirstLetterUpper(adresse.lastName)}
      </div>
      <div>{toFirstLetterUpper(adresse.streetAddress)}</div>
      <div>{toFirstLetterUpper(adresse.streetAddress2)}</div>
      <div>
        {adresse.postalCode} {toFirstLetterUpper(adresse.city)}
      </div>
      <div>{adresse.country.toUpperCase()}</div>
      <br />
      <br />
      <div>
        Contact de livraison : <br /> {adresse.phoneToDelivery}
      </div>
    </div>
  );
}

export default function AdressesPage() {
  const currentFacturation = adresses.find((a) =>
    a.adresses?.some((t) => t.name === "facturation")
  );
  const currentLivraison = adresses.find((a) =>
    a.adresses?.some((t) => t.name === "livraison")
  );

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <div className="border p-2">
          <h3 className="text-lg font-bold underline">Adresse de livraison</h3>
          {currentLivraison && <AddressDisplay adresse={currentLivraison} />}
        </div>
        <div className="border p-2">
          <h3 className="text-lg font-bold underline">
            Adresse de facturation
          </h3>
          {currentFacturation && <AddressDisplay adresse={currentFacturation} />}
        </div>
        <div className="border p-2">
          <div className="flex flex-row justify-between">
            <h3 className="text-lg font-bold underline mb-4">Mes adresses</h3>
            <MdAddCircle size={30} />
          </div>

          <div className="flex flex-col gap-2">
            {adresses.map((adresse, i) => {
              const types = adresse.adresses?.map((t) => t.name) ?? [];
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
                  <div>
                    {adresse.postalCode} {toFirstLetterUpper(adresse.city)}
                  </div>

                  {types.length > 0 && (
                    <div className="absolute top-0 right-0 m-2">
                      <ul className="flex gap-2">
                        {types.map((type) => (
                          <li
                            key={type}
                            className={`${
                              type === "facturation" || type === "livraison"
                                ? "bg-[var(--foreground)] text-[var(--background)]"
                                : "border"
                            } p-2 text-xs rounded-xl text-center`}
                          >
                            {type && toFirstLetterUpper(type)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="">
                    {!isFacturation && !currentFacturation && (
                      <button
                        className="mt-2 p-1 border rounded text-xs bg-[var(--foreground)] text-[var(--background)] cursor-pointer"
                        onClick={() => handleSetAs(adresse.id, "facturation")}
                      >
                        Définir comme adresse de facturation
                      </button>
                    )}
                    {!isLivraison && !currentLivraison && (
                      <button
                        className="mt-2 p-1 border rounded text-xs bg-[var(--foreground)] text-[var(--background)] cursor-pointer"
                        onClick={() => handleSetAs(adresse.id, "livraison")}
                      >
                        Définir comme adresse de livraison
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </div>

          <div>- créer une adresse dans modal, pouvoir supprimer des adresses , affecter a livraison ou facturation si non sélectionner, pouvoir modifier .</div>
        </div>
      </div>
    </div>
  );
}
