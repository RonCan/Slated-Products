export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface AddOn {
  name: string;
  price: number;
}

export interface Result {
  milk: string;
  syrup: string;
  total: number;
  quantity: number;
  title: string;
}
