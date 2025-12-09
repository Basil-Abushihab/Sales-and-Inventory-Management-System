import { axios } from "@/lib/axios";
import type { Inventory, InventoryWithRelations } from "@/types";

export const InventoryService = {
  // GET /inventory
  getAll: async (): Promise<InventoryWithRelations[]> => {
    const res = await axios.get("/inventory");
    return res.data;
  },

  // GET /inventory/:warehouseId/:productId
  getOne: async (
    warehouseId: number,
    productId: number
  ): Promise<InventoryWithRelations> => {
    const res = await axios.get(`/inventory/${warehouseId}/${productId}`);
    return res.data;
  },

  // POST /inventory
  create: async (payload: Inventory): Promise<Inventory> => {
    const res = await axios.post("/inventory", payload);
    return res.data;
  },

  // PUT /inventory/:warehouseId/:productId
  update: async (inventory:Inventory): Promise<Inventory> => {
    const {WarehouseID:warehouseId,ProductID:productId,...data}=inventory;
    const res = await axios.put(
      `/inventory/${warehouseId}/${productId}`,
      data
    );
    return res.data;
  },

  // DELETE /inventory/:warehouseId/:productId
  delete: async (
    warehouseId: number,
    productId: number
  ): Promise<{ message: string }> => {
    const res = await axios.delete(
      `/inventory/${warehouseId}/${productId}`
    );
    return res.data;
  },
};
