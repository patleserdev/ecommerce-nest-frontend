export const revalidate = 60;
export const dynamic = "force-static"; // <-- force la génération SSG au moment du build

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-5xl mb-5">E-commerce</h1>

      <ul>
        Pouvoir modifier tout ça en mode admin facilement pour la home :
        <li>Carousel de marques </li>
        <li>Le top des ventes</li>
        <li>Le top des catégories</li>
        <li>Nos meilleurs offres</li>
        <li>
          zone de focus (sur une marque, une catégorie avec des images qui
          claquent )
        </li>
        <li>
          bloc reasurance (satisfait ou ramboursé, livraison rapide a domice et
          point relais , livraison gratuite a partir de x€, paiement en ligne
          sécurisé)
        </li>
        <li>s'inscrire à la newsletter</li>
        <li>footer avec site map (categories - marques - informations)</li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
