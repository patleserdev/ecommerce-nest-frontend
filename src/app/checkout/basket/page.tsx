import CartPage from "@/components/cart/CartPage";
import CustomedLink from "@/components/CustomedLink";

export default function CheckoutBasket() {
  return (
    <div>
      <div className="mt-5 mb-5">
        <CartPage />
        <div className="place-self-end flex my-5 w-full md:w-[20%]">
          <CustomedLink title={"Valider mon panier"} url={"/checkout/delivery"}/>
        </div>
      </div>
      <div className="place-self-start flex my-5 w-full md:w-[20%]">
        <CustomedLink title={"Poursuivre mes achats"} url={"/categories"} />
      </div>
      <div className="opacity-[0.5]">
        <i>
          Page de checkout / valider le panier si non connecté retourné à
          l'écran de connexion inscription - mot de passe oublié si connecté
          valider le panier vers page delivery
        </i>
      </div>
    </div>
  );
}
