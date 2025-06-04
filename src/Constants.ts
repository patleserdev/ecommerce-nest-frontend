export const sizes = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "L", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "2XL" },
  { value: "unique", label: "Unique" },
];
export type SizeType = string[];

export const genders = [
  { value: "homme", label: "Homme" },
  { value: "femme", label: "Femme" },
  { value: "enfant", label: "Enfant" },
  { value: "unisexe", label: "Unisexe" },
];
export type gendersType = { value: string; label: string };

export const profileLinks = [
  { label: "Infos personnelles", url: "/user/profile" },
  { label: "Adresses", url: "/user/profile/adresses" },
  { label: "Commandes", url: "/user/profile/commandes" },
  { label: "Favoris", url: "/user/profile/favoris" },
  { label: "Préférences", url: "/user/profile/preferences" },
  { label: "SAV / Retours", url: "/user/profile/sav" },
  { label: "Factures", url: "/user/profile/factures" },
];
