import { axios } from "@/lib/axios";
import type {
  Warehouse,
  CreateWarehousePayload,
  UpdateWarehousePayload,
} from "@/types";

export const WarehouseService = {
  // GET /warehouses
  getAll: async (): Promise<Warehouse[]> => {
    const res = await axios.get("/warehouses");
    return res.data;
  },

  // GET /warehouses/:id
  getById: async (id: number): Promise<Warehouse> => {
    const res = await axios.get(`/warehouses/${id}`);
    return res.data;
  },

  // POST /warehouses
  create: async (
    payload: CreateWarehousePayload
  ): Promise<Warehouse> => {
    const res = await axios.post("/warehouses", payload);
    return res.data;
  },

  // PUT /warehouses/:id
  update: async (
    id: number,
    payload: UpdateWarehousePayload
  ): Promise<Warehouse> => {
    const res = await axios.put(`/warehouses/${id}`, payload);
    return res.data;
  },

  // DELETE /warehouses/:id
  delete: async (id: number): Promise<{ message: string }> => {
    const res = await axios.delete(`/warehouses/${id}`);
    return res.data;
  },
};
