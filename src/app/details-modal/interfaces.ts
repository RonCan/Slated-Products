export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  extras: AddOn[];
  images: string[];
}

export interface AddOn {
  name: string;
  price: number;
  id: number;
  extra_id: number;
  items: any[];
}

export interface Result {
  milk: string;
  syrup: string;
  total: number;
  quantity: number;
  title: string;
}
