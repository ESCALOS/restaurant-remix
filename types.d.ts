export interface User {
  id: number;
  username: string;
  document_type: "DNI" | "CE" | "PP";
  document_number: string;
  name: string;
  is_enabled: boolean;
  phone: string;
  role: "ADMIN" | "WAITER" | "STOREKEEPER";
  created_at: string;
  updated_at: string;
}

export interface Table {
  id: number;
  number: string;
  is_available: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  min_stock: number;
  stock: number;
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
}
