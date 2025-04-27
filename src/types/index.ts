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
  productName: string;
  name: string;
  email: string;
  address: string;
  amount: number;
  isPaid: boolean;
}

export interface errorInterface {
  error: string | unknown;
}

export interface verifyPaymentInterface {
  order_id: string;
  payment_id: string;
  signature: string;
  cart_id: number;
  customer_id: string;
  name: string;
  email: string;
  address: string;
}
