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
  gender: String;
  size: String;
  color: String;
  stock: Number;
  // quantity:Number
};

export interface Product {
  description: String;
  id?: Number;
  name: String;
  slug: String;
  price: Number;
  // quantity: Number;
  sku: String;
  category: Category;
  variations: ProductVariations[];
}

export interface Child {
  id: number;
  name: string;
  parent_id?: number;
  products?: [];
}
