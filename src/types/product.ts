export interface Category {
  id: number;
  name: string;
  parent_id: number;
  slug: string;
  products: [];
}

export type CategoryWithChildren = Category & { children?: Category[] };

export type ProductVariations = {
  id: number;
  gender: string;
  size: string;
  color: string;
  stock: number;
  // quantity:Number
};

export interface Product {
  description: string;
  id: number;
  name: string;
  slug: string;
  price: number;
  // quantity: Number;
  sku: string;
  category?: Category;
  brand?: Brand;
  variations: ProductVariations[];
}

export interface Brand {
  id: number;
  name: string;
  slug: string;

}

export interface Child {
  id: number;
  name: string;
  parent_id?: number;
  slug:string;
  products?: [];
}
