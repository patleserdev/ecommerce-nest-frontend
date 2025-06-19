import DeliveryModule from "@/components/delivery/DeliveryModule";
import CustomedLink from "@/components/CustomedLink";
export default function CheckoutDelivery() {
  return (

    <div>
      <div className="mt-5 mb-5">
        <DeliveryModule />
        <div className="px-2 md:px-0 md:place-self-end flex my-5 md:w-[20%]">
          <CustomedLink
            title={"Valider mes options de livraison"}
            url={"/checkout/delivery"}
          />
        </div>
      </div>
      <div className="px-2 md:px-0 md:place-self-start flex my-5 md:w-[20%]">
        <CustomedLink title={"Poursuivre mes achats"} url={"/categories"} />
      </div>
      <div className="opacity-[0.5]">
        <i>
          <span className="line-through">
            Je suis censé avoir un panier validé et un user connecté |
            </span>
          <br />
          Je dois connecter des adresses à mon user, et pouvoir affecter comme
          adresse de livraison et/ou adresse de facturation
          <br />
          Page de livraison confirmer adresse de livraison confirmer adresse de
          <br />
          facturation choix du transporteur suivant colis/poids vers page
          paiement
        </i>
      </div>
    </div>



   
  );
}
