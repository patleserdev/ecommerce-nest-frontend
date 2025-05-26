export default function logo(categorie: string) {
  let icon;
  switch (categorie) {
    case "accessoires":
      icon = "/icons/accessoires.png";
      break;

    case "chapeaux":
      icon = "/icons/chapeaux.png";
      break;

    case "jeans-pantalons":
      icon = "/icons/jeans-pantalons.png";
      break;

    case "t-shirts":
      icon = "/icons/t-shirts.png";
      break;

    case "chaussures":
      icon = "/icons/chaussures.png";
      break;

    case "sweats-pulls":
      icon = "/icons/sweats-pulls.png";
      break;

    case "blousons-vestes":
      icon = "/icons/blousons-vestes.png";
      break;

    case "chemises":
      icon = "/icons/chemises.png";
      break;

    case "debardeurs":
      icon = "/icons/debardeurs.png";
      break;

    case "ensembles":
      icon = "/icons/ensembles.png";
      break;

    case "joggings":
      icon = "/icons/joggings.png";
      break;

    case "polos":
      icon = "/icons/polos.png";
      break;

    case "robes-jupes":
      icon = "/icons/robes-jupes.png";
      break;

    case "shorts-bermudas":
      icon = "/icons/shorts-bermudas.png";
      break;

    case "sous-vetements":
      icon = "/icons/sous-vetements.png";
      break;

    default:
      icon = "";
  }
  return icon;
}
