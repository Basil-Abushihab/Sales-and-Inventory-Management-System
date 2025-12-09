import { Request, Response } from "express";
import { OrderDetailService } from "../services/orderDetail.service";

export const OrderDetailController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const details = await OrderDetailService.getAll();
      res.json(details);
    } catch (err) {
      res.status(500).json({ message: "Error fetching order details" });
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const orderId = Number(req.params.orderId);
      const productId = Number(req.params.productId);

      const detail = await OrderDetailService.getOne(orderId, productId);

      if (!detail)
        return res.status(404).json({ message: "Order detail not found" });

      res.json(detail);
    } catch (err) {
      res.status(500).json({ message: "Error fetching order detail" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { OrderID, ProductID, Quantity } = req.body;

      const created = await OrderDetailService.create({
        OrderID,
        ProductID,
        Quantity,
      });

      res.status(201).json(created);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const orderId = Number(req.params.orderId);
      const productId = Number(req.params.productId);
      const { Quantity } = req.body;

      const updated = await OrderDetailService.update(
        orderId,
        productId,
        { Quantity }
      );

      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const orderId = Number(req.params.orderId);
      const productId = Number(req.params.productId);

      await OrderDetailService.delete(orderId, productId);

      res.json({ message: "Order detail deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting order detail" });
    }
  },
};
