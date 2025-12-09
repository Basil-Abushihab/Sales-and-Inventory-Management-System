import { axios } from "@/lib/axios";
import type {  OrderWithDetails, CreateOrderPayload } from "@/types";

export const OrderService = {
  // GET /orders
  getAll: async (): Promise<OrderWithDetails[]> => {
    const res = await axios.get("/orders");
    return res.data;
  },

  // GET /orders/:id
  getById: async (id: number): Promise<OrderWithDetails> => {
    const res = await axios.get(`/orders/${id}`);
    return res.data;
  },

  // POST /orders
  create: async (payload: CreateOrderPayload): Promise<OrderWithDetails> => {
    const res = await axios.post("/orders", payload);
    return res.data;
  },

  // DELETE /orders/:id
  delete: async (id: number): Promise<{ message: string }> => {
    const res = await axios.delete(`/orders/${id}`);
    return res.data;
  },
};
