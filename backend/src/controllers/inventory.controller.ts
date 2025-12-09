import { Request, Response } from "express";
import { InventoryService } from "../services/inventory.service";

export const InventoryController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const inventory = await InventoryService.getAll();
      res.json(inventory);
    } catch (err) {
      res.status(500).json({ message: "Error fetching inventory records" });
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const warehouseId = Number(req.params.warehouseId);
      const productId = Number(req.params.productId);

      const record = await InventoryService.getOne(warehouseId, productId);

      if (!record)
        return res.status(404).json({ message: "Inventory record not found" });

      res.json(record);
    } catch (err) {
      res.status(500).json({ message: "Error fetching inventory record" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { WarehouseID, ProductID, QuantityInStock } = req.body;

      const newRecord = await InventoryService.create({
        WarehouseID,
        ProductID,
        QuantityInStock,
      });

      res.status(201).json(newRecord);
    } catch (err) {
      res.status(500).json({ message: `Error creating inventory record: ${err}` });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const warehouseId = Number(req.params.warehouseId);
      const productId = Number(req.params.productId);
      const { QuantityInStock } = req.body;

      const updated = await InventoryService.update(
        warehouseId,
        productId,
        { QuantityInStock }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Error updating inventory record" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const warehouseId = Number(req.params.warehouseId);
      const productId = Number(req.params.productId);

      await InventoryService.delete(warehouseId, productId);

      res.json({ message: "Inventory record deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting inventory record" });
    }
  },
};
