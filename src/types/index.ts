export interface ProductInterface {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  sellerName: string;
  discount: number;
  sizes?: string[];
  colors?: string[];
  description: string;
  category: string;
}

export interface UserData {
  customer_id: string;
  name: string;
  email: string;
  address: string;
}

export interface OrderInfo {
  customer_id: string;
  product_id: string;
  productQuantity: number;
  Name: string;
  email: string;
  address: string;
  amount: number;
  cod: boolean;
  is_paid: boolean;
}

export interface errorInterface {
  error: string|unknown;
}
