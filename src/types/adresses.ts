export type AddressRoleType = {
  id?: number;
  adresse?: {id:number}
  user?: {id:number}
  type?: "livraison" | "facturation" | "none";
  cartId?:number,
  orderId?:number
  invoiceId?:number,

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
  roles?: AddressRoleType[];
};
