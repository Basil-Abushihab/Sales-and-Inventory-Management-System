import type { Inventory, InventoryWithRelations } from "@/types";
import { useEffect, useState } from "react";
import { InventoryService } from "../service/inventoryService";

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryWithRelations[]>([]);

  const fetchInventory = async () => {
    const response = await InventoryService.getAll();
    if (!response) {
      console.error("Failed to fetch inventory");
      return;
    }
    setInventory(response);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const addInventory = async (record: InventoryWithRelations) => {
    const response = await InventoryService.create({
      ProductID: record.ProductID,
      WarehouseID: record.WarehouseID,
      QuantityInStock: record.QuantityInStock,
    });
    if(!response){
      console.error("Failed to create inventory record");
      return;
    }
    setInventory((prev) => [...prev, record]);
  };

  const deleteInventory =async (warehouseId: number, productId: number) => {
    const response=await InventoryService.delete(warehouseId,productId);
    if(!response){
      console.error("Failed to delete inventory record");
      return;
    }
    setInventory((prev) => prev.filter((i) => i.WarehouseID !== warehouseId && i.ProductID !== productId));
  };

  const updateInventory =async (inventory:Inventory) => {
    const {ProductID,QuantityInStock,WarehouseID}=inventory;
    const response=await InventoryService.update(inventory);
    if(!response){
      console.error("Failed to update inventory record");
      return;
    }
    setInventory((prev) =>
      prev.map((i) =>
        i.WarehouseID === WarehouseID && i.WarehouseID === ProductID
          ? { ...i, quantity: QuantityInStock }
          : i
      )
    );
  };

  return { inventory, addInventory, deleteInventory, updateInventory };
};
