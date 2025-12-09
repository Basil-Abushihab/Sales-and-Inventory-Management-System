import { axios } from "@/lib/axios";
import type {
  OrderDetail,
  CreateOrderDetailPayload,
  UpdateOrderDetailPayload,
} from "@/types";

export const OrderDetailService = {
  // GET /orderDetails
  getAll: async (): Promise<OrderDetail[]> => {
    const res = await axios.get("/orderDetails");
    return res.data;
  },

  // GET /orderDetails/:orderId/:productId
  getOne: async (
    orderId: number,
    productId: number
  ): Promise<OrderDetail> => {
    const res = await axios.get(`/orderDetails/${orderId}/${productId}`);
    return res.data;
  },

  // POST /orderDetails
  create: async (
    payload: CreateOrderDetailPayload
  ): Promise<OrderDetail> => {
    const res = await axios.post("/orderDetails", payload);
    return res.data;
  },

  // PUT /orderDetails/:orderId/:productId
  update: async (
    orderId: number,
    productId: number,
    payload: UpdateOrderDetailPayload
  ): Promise<OrderDetail> => {
    const res = await axios.put(
      `/orderDetails/${orderId}/${productId}`,
      payload
    );
    return res.data;
  },

  // DELETE /orderDetails/:orderId/:productId
  delete: async (
    orderId: number,
    productId: number
  ): Promise<{ message: string }> => {
    const res = await axios.delete(
      `/orderDetails/${orderId}/${productId}`
    );
    return res.data;
  },
};
