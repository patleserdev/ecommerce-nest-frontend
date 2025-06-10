export type AddressRole = {
  id: number;
  name?: string;
  type?: "livraison" | "facturation";
};
export type AdresseType = {
  id?: number;
  title: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  streetAddress2?: string;
  postalCode: string;
  city: string;
  country: string;
  phoneToDelivery: string;
  roles?: AddressRole[];
};
