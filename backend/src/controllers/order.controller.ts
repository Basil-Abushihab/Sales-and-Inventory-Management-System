import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

export const OrderController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const orders = await OrderService.getAll();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const order = await OrderService.getById(id);

      if (!order) return res.status(404).json({ message: "Order not found" });

      res.json(order);
    } catch (err) {
      res.status(500).json({ message: "Error fetching order" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { CustomerID, Status, items,WarehouseId } = req.body;
      console.log(req.body)
      const created = await OrderService.create({
        CustomerID,
        Status,
        items,
        WarehouseId
      });

      res.status(201).json(created);
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Error creating order" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await OrderService.delete(id);

      res.json({ message: "Order deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting order" });
    }
  },
};
