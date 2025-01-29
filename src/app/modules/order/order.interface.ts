export type IOrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELED';

export type IOrder = {
  readonly orderId: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  address: string;
  orderNotes?: string;

  productId?: string;
  weight?: number;
  quantity?: number;
  price?: number;

  cartItems?: Array<{
    productId: string;
    weight: number;
    quantity: number;
    price: number;
  }>;

  status: IOrderStatus;
};
