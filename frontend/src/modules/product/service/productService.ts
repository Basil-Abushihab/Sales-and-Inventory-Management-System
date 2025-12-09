import { axios } from "@/lib/axios";
import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types";

export const ProductService = {
  // GET /products
  getAll: async (): Promise<Product[]> => {
    const res = await axios.get("/products");
    return res.data;
  },

  // GET /products/:id
  getById: async (id: number): Promise<Product> => {
    const res = await axios.get(`/products/${id}`);
    return res.data;
  },

  // POST /products
  create: async (payload: CreateProductPayload): Promise<Product> => {
    const res = await axios.post("/products", payload);
    return res.data;
  },

  // PUT /products/:id
  update: async (
    id: number,
    payload: UpdateProductPayload
  ): Promise<Product> => {
    const res = await axios.put(`/products/${id}`, payload);
    return res.data;
  },

  // DELETE /products/:id
  delete: async (id: number): Promise<{ message: string }> => {
    const res = await axios.delete(`/products/${id}`);
    return res.data;
  },
};
