import { AdresseType } from "@/types/adresses";

export function findAdresseByType(adresses:AdresseType[] = [], type = 'livraison') {
  if (!Array.isArray(adresses)) return null;

  return adresses.find(adresse =>
    adresse.roles?.some(role => role.type === type)
  ) || null;
  }