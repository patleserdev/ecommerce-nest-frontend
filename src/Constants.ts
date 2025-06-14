export const sizes = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
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

export const colissimoPricing=[
  {weight:250,price:5.25,pickup:4.55},
  {weight:500,price:7.35,pickup:6.65},
  {weight:750,price:8.65,pickup:7.95},
  {weight:1000,price:9.40,pickup:8.70},
  {weight:2000,price:10.70,pickup:10.00},
  {weight:5000,price:16.60,pickup:15.90},
  {weight:10000,price:24.20,pickup:null},
  {weight:15000,price:30.55,pickup:null},
  {weight:30000,price:37.85,pickup:null},
]

export const chronopostPricing=[
  {weight:1000,price:10.43,pickup:5.95},
  {weight:2000,price:11.70,pickup:6.37},
  {weight:5000,price:13.28,pickup:7.63},
  {weight:10000,price:15.90,pickup:9.73},
  {weight:15000,price:21.90,pickup:12.53},
  {weight:20000,price:25.09,pickup:15.33},
]