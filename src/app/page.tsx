export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-5xl mb-5">E-commerce</h1>

      <div>
        <h2 className="text-2xl underline">Objectifs atteints</h2>
        <ul className="p-2">
          <li>Connexion et session OK</li>
          <li>Thème dark ok</li>
          <li>Routage par slug</li>
          <li>Redux : CART </li>
          <li>Redux Persist </li>
          <li>Admin - CRUD marque ok</li>
          <li>Admin - CRUD catégorie ok</li>
          <li>Admin - CRUD produit ok</li>
          <li>Display liste des catégories ok</li>
          <li>Display produits d'une catégorie ok (slug)</li>
          <li>Affichage d'un produit (slug)</li>
          <li>
            Dans la fiche produit :
            <ul className="px-4">
              <li>Sélecteur de produit (quantité,taille,genre)</li>
              <li>Carousel Framer de produits de la même catégorie</li>
            </ul>
          </li>
          <li>Panier dynamique dans la navbar</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl underline">Objectifs suivants</h2>
        <ul className="p-2">
          <li>Créer un module médiathèque front/back</li>
          <li>
            Valider les quantités de produits (par variation et non global)
          </li>
          <li>Checkout (valider le panier)</li>
          <li>
            Sécuriser le panier (le rendre disponible si je quitte le site
            brutalement et que je reviens même sans session
          </li>
          <li>Tester les rôles (Admin - customer)</li>
          <li>
            Créer le tunnel d'achat (Valider panier/Création de compte/Création
            de commande - Livraison/Adresse - Paiement - Confirmation{" "}
          </li>
          <li>
            Créer le module de mailing et les actions
            <ul className="px-4">
              <li>Inscription au site avec lien de validation d'inscription</li>
              <li>Inscription à la Newsletter</li>
              <li>Bienvenue avec offre spéciale 10%</li>
              <li>
                Relance de panier abandonné avec possibilité de réduction
                incitative
              </li>
              <li>Confirmation de commande</li>
              <li>Confirmation de paiement</li>
              <li>Facture </li>
              <li>Mise à jour de l'état de la commande</li>
              <li>Suivi de livraison</li>
              <li>Confirmation de livraison</li>
              <li>Demande d'avis</li>
              <li>SAV : Confirmation de demande</li>
              <li>SAV : réponse à une réclamation</li>
              <li>Emails retour : Confirmation de demande de retour</li>
              <li>Status du remboursement</li>
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl underline">Objectifs manquants</h2>
        <ul className="p-2">
          <li>Jouer sur les rôles pour la connexion à l'admin</li>
          <li>Ajouter les icônes aux catégories</li>
          <li>Gestion des codes promotions</li>
        </ul>
      </div>
    </div>
  );
}
