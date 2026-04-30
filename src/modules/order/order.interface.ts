export interface IOrder {
  customerName: string;
  email: string;
  phone: string;

  projectId?: string; // optional reference to project
  items?: {
    name: string;
    price: number;
    quantity: number;
  }[];

  totalPrice: number;

  status?: 'pending' | 'processing' | 'completed' | 'cancelled';

  paymentMethod?: string;
  address?: string;
}
