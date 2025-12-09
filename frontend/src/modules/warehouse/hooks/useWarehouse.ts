import type { Warehouse } from "@/types";
import { useEffect, useState } from "react";
import { WarehouseService } from "../service/warehouseService";

export const useWarehouses = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const fetchWarehouses = async () => {
    const result = await WarehouseService.getAll();
    setWarehouses(result);
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const addWarehouse =async (w: Omit<Warehouse, "WarehouseID">) => {
    const newWarehouse = { id: Date.now(), ...w };
    const response =await WarehouseService.create(newWarehouse);
    if (!response) {
      console.error("Failed to create warehouse");
      return;
    }
    setWarehouses((prev) => [...prev,{...response}]);
  };

  const editWarehouse = async ( w:Warehouse) => {
    const response = await WarehouseService.update(w.WarehouseID, w);
    if (!response) {
      console.error("Failed to update warehouse");
      return;
    }
    setWarehouses((prev) =>
      prev.map((warehouse) =>
        warehouse.WarehouseID === w.WarehouseID ? { ...response } : warehouse
      )
    );
  }

  const deleteWarehouse = (id: number) => {
    const response = WarehouseService.delete(id);
    if (!response) {
      console.error("Failed to delete warehouse");
      return;
    }
    setWarehouses((prev) => prev.filter((w) => w.WarehouseID !== id));
  };

  return { warehouses, addWarehouse, deleteWarehouse,editWarehouse };
};
