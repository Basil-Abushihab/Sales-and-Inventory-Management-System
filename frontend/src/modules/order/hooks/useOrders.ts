// src/modules/orders/hooks/useOrders.ts
import { useEffect, useState } from "react";
import type {
  OrderWithDetails,
  CreateOrderPayload,
  UpdateOrderDetailPayload
} from "@/types";
import { OrderService } from "../service/orderService";
import { OrderDetailService } from "../service/orderDetailsService";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL ORDERS
  const fetchOrders = async () => {
    setLoading(true);
    const data = await OrderService.getAll();
    setOrders(data);
    setLoading(false);
  };

  // CREATE ORDER
  const createOrder = async (payload: CreateOrderPayload) => {
    const newOrder = await OrderService.create(payload);
    setOrders(prev => [...prev, newOrder]);
  };

  // DELETE ORDER
  const deleteOrder = async (id: number) => {
    await OrderService.delete(id);
    setOrders(prev => prev.filter(o => o.OrderID !== id));
  };

  // UPDATE A SPECIFIC ORDER DETAIL (quantity)
  const updateOrderDetail = async (
    orderId: number,
    productId: number,
    payload: UpdateOrderDetailPayload
  ) => {
    const updated = await OrderDetailService.update(orderId, productId, payload);

    setOrders(prev =>
      prev.map(order =>
        order.OrderID === orderId
          ? {
              ...order,
              orderDetails: order.orderDetails.map(d =>
                d.ProductID === productId ? updated : d
              ),
              TotalAmount: order.orderDetails.reduce(
                (sum, d) =>
                  d.ProductID === productId
                    ? sum + updated.LineTotal
                    : sum + d.LineTotal,
                0
              )
            }
          : order
      )
    );
  };

  // DELETE A SPECIFIC ORDER DETAIL
  const deleteOrderDetail = async (orderId: number, productId: number) => {
    await OrderDetailService.delete(orderId, productId);

    setOrders(prev =>
      prev.map(order =>
        order.OrderID === orderId
          ? {
              ...order,
              orderDetails: order.orderDetails.filter(
                d => d.ProductID !== productId
              ),
              TotalAmount: order.orderDetails
                .filter(d => d.ProductID !== productId)
                .reduce((sum, d) => sum + d.LineTotal, 0),
            }
          : order
      )
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    fetchOrders,
    createOrder,
    deleteOrder,
    updateOrderDetail,
    deleteOrderDetail,
  };
};
