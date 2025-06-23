"use server"
import MediaAdminWrapper from "@/components/Medias/MediaAdminWrapper";
export default async function MediasPage() {

  return (
    <div className="">
      <div className="p-2">
        <h1 className="text-2xl font-bold">Mediathèque</h1>
        {/* <ul>
          <li>Afficher toutes les images façon grid</li>
          <li>Ajouter / Modifier / Supprimer une image</li>
          <li>
            Créer un module importable pour pouvoir ajouter une image et
            l'affecter à une catégorie , une marque, un produit
          </li>
          <li>
            Ajouter l'image en même temps que les formulaires
            categorie/produit/marque
          </li>
        </ul> */}
      </div>
      <MediaAdminWrapper/>
    </div>
  );
}
