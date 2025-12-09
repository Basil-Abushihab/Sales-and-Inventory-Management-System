import { axios } from "@/lib/axios";
import type { Customer } from "@/types";

export const CustomersService = {
  // GET /customers
  getCustomers: async (): Promise<Customer[]> => {
    const res = await axios.get("/customers");
    return res.data;
  },

  // GET /customers/:id
  getCustomerById: async (id: number): Promise<Customer> => {
    const res = await axios.get(`/customers/${id}`);
    return res.data;
  },

  // POST /customers
  createCustomer: async (payload: Omit<Customer, "CustomerID">): Promise<Customer> => {
    const res = await axios.post("/customers", payload);
    return res.data;
  },

  // PUT /customers/:id
  updateCustomer: async (
    id: number,
    payload: Partial<Omit<Customer, "CustomerID">>
  ): Promise<Customer> => {
    const res = await axios.put(`/customers/${id}`, payload);
    return res.data;
  },

  // DELETE /customers/:id
  deleteCustomer: async (id: number): Promise<{ message: string }> => {
    const res = await axios.delete(`/customers/${id}`);
    return res.data;
  },
};
