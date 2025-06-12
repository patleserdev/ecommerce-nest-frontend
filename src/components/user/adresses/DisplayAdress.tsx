import { toFirstLetterUpper } from "@/lib/utils";
import { AdresseType } from "@/types/adresses";

export default function DisplayAdress({ adresse }: {adresse:AdresseType}) {
    return (
      <div className="flex flex-col py-2 text-2xl gap-1">
        <div>
          {toFirstLetterUpper(adresse.title)}{" "}
          {toFirstLetterUpper(adresse.firstName)}{" "}
          {toFirstLetterUpper(adresse.lastName)}
        </div>
        <div>{toFirstLetterUpper(adresse.streetAddress)}</div>
        {adresse.streetAddress2 && <div>{toFirstLetterUpper(adresse.streetAddress2)}</div>}
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