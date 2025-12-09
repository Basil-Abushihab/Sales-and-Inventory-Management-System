export interface OrderDetail {
  OrderID: number;
  ProductID: number;
  Quantity: number;
  UnitPrice: number;
  LineTotal: number;
}

export interface CreateOrderDetailPayload {
  OrderID: number;
  ProductID: number;
  Quantity: number;
}

export interface UpdateOrderDetailPayload {
  Quantity: number;
}
