export interface Category {
  id: number;
  name: string;
  parent_id: number;
  products: [];
}

export interface Product {
  description: String;
  id: Number;
  name: String;
  price: String;
  quantity: Number;
  sku: String;
  category: Category;
}

export interface Child {
    id: number;
    name: string;
  }
  