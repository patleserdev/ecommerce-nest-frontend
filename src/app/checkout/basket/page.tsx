import CartPage from "@/components/cart/CartPage";
import NavigateTo from "@/components/NavigateTo";

export default function CheckoutBasket() {
  return (
    <div>
      <div className="mt-5 mb-5">
        <CartPage />
        <div className="place-self-end w-100">
          <NavigateTo
            label={"Valider mon panier"}
            route={"/checkout/delivery"}
            type={"primary"}
          />
        </div>
      </div>
      <div className="place-self-start w-100">
        <NavigateTo
          label={"Poursuivre mes achats"}
          route={"/categories"}
          type={""}
        />
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
