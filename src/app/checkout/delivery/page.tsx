import DeliveryModule from "@/components/delivery/DeliveryModule";

export default function CheckoutDelivery() {
  return (
    <div>
      <div>
        <DeliveryModule />
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
