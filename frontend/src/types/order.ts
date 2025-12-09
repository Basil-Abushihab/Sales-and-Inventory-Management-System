import type { OrderDetail } from "./orderDetail";

export interface Order {
  OrderID: number;
  CustomerID: number;
  OrderDate: string; // ISO date string
  TotalAmount: number;
  Status: string;
}

export interface OrderWithDetails extends Order {
  orderDetails: OrderDetail[];
}

export interface CreateOrderPayload {
  CustomerID: number;
  Status: string;
  WarehouseId: number;
  items: Array<{
    ProductID: number;
    Quantity: number;
  }>;
}
