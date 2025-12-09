import { Request, Response } from "express";
import { WarehouseService } from "../services/warehouse.service";

export const WarehouseController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const warehouses = await WarehouseService.getAll();
      res.json(warehouses);
    } catch (err) {
      res.status(500).json({ message: "Error fetching warehouses" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const warehouse = await WarehouseService.getById(id);

      if (!warehouse)
        return res.status(404).json({ message: "Warehouse not found" });

      res.json(warehouse);
    } catch (err) {
      res.status(500).json({ message: "Error fetching warehouse" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { WarehouseName, Location } = req.body;

      const newWarehouse = await WarehouseService.create({
        WarehouseName,
        Location,
      });

      res.status(201).json(newWarehouse);
    } catch (err) {
      res.status(500).json({ message: "Error creating warehouse" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updated = await WarehouseService.update(id, req.body);

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Error updating warehouse" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await WarehouseService.delete(id);

      res.json({ message: "Warehouse deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting warehouse" });
    }
  },
};
