import type { Order } from "./order";

export interface Customer {
  CustomerID: number;
  Name: string;
  Phone?: string | null;
  Email?: string | null;
  Address?: string | null;
}

export interface CustomerWithOrders extends Customer {
  orders: Order[];
}

