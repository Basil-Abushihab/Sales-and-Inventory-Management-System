import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export const ProductController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const products = await ProductService.getAll();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "Error fetching products" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const product = await ProductService.getById(id);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.json(product);
    } catch (err) {
      res.status(500).json({ message: "Error fetching product" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { Name, UnitPrice, Status, ReorderLevel } = req.body;

      const newProduct = await ProductService.create({
        Name,
        UnitPrice,
        Status,
        ReorderLevel,
      });

      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ message: "Error creating product" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;

      const updated = await ProductService.update(id, data);

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Error updating product" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await ProductService.delete(id);

      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting product" });
    }
  },
};
