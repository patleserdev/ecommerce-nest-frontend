export const revalidate = 60;
export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="p-4 max-w-5xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        🗺️ Roadmap de construction
      </h1>

      {/* Objectifs atteints */}
      <section className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
        <h2 className="text-2xl font-semibold text-green-700 mb-4 underline">
          ✅ Objectifs atteints
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-800">
          <li>Connexion et session OK</li>
          <li>Thème dark ok - Thème clair par défaut</li>
          <li>Routage par slug</li>
          <li>Redux : CART</li>
          <li>Redux Persist</li>
          <li>Admin - CRUD marque ok</li>
          <li>Admin - CRUD catégorie ok</li>
          <li>Admin - CRUD produit ok</li>
          <li>Display liste des catégories ok</li>
          <li>Display produits d'une catégorie ok (slug)</li>
          <li>Affichage d'un produit (slug)</li>
          <li>
            Dans la fiche produit :
            <ul className="list-disc pl-6 mt-1">
              <li>Sélecteur de produit (quantité, taille, genre)</li>
              <li>Carousel Framer de produits de la même catégorie</li>
            </ul>
          </li>
          <li>Panier dynamique dans la navbar</li>
          <li>Optimisation des temps de réponses de page SSG</li>
          <li>Nav responsive et optimisée</li>
          <li>Optimisation des requêtes backend</li>
          <li>Nav - rajout de comportements en mobile et desktop</li>
        </ul>
      </section>

      {/* Objectifs suivants */}
      <section className="bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-200">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4 underline">
          🛠️ Objectifs suivants
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-800">
          <li>
            Optimiser les formulaires : un formulaire unique qui gère tous les
            contextes (categories, marques, produits, cart ...)
          </li>
          <li>Créer un module de recherche dans la navbar avec autocomplete</li>
          <li>Créer un module médiathèque front/back</li>
          <li>Valider les quantités de produits (par variation et non global)</li>
          <li>Checkout (valider le panier)</li>
          <li>
            Sécuriser le panier (le rendre disponible même sans session)
          </li>
          <li>Tester les rôles (Admin - customer)</li>
          <li>
            Créer le tunnel d'achat :
            <ul className="list-disc pl-6 mt-1">
              <li>Valider panier</li>
              <li>Création de compte</li>
              <li>Création de commande</li>
              <li>Livraison / Adresse</li>
              <li>Paiement</li>
              <li>Confirmation</li>
            </ul>
          </li>
          <li>
            Créer le module de mailing et les actions :
            <ul className="list-disc pl-6 mt-1">
              <li>Inscription avec lien de validation</li>
              <li>Inscription à la Newsletter</li>
              <li>Bienvenue avec offre spéciale 10%</li>
              <li>Relance de panier abandonné avec réduction</li>
              <li>Confirmation de commande et de paiement</li>
              <li>Facture</li>
              <li>Suivi et état de la commande</li>
              <li>Confirmation de livraison</li>
              <li>Demande d'avis</li>
              <li>SAV (demande, réponse, retour, remboursement)</li>
            </ul>
          </li>
        </ul>
      </section>

      {/* Objectifs manquants */}
      <section className="bg-red-50 p-6 rounded-lg shadow-md border border-red-200">
        <h2 className="text-2xl font-semibold text-red-700 mb-4 underline">
          🚧 Objectifs manquants
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-800">
          <li>Jouer sur les rôles pour la connexion à l'admin</li>
          <li>Ajouter les icônes aux catégories</li>
          <li>Gestion des codes promotions</li>
        </ul>
      </section>
    </div>
  );
}
