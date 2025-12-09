import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export const CustomerController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const customers = await CustomerService.getAll();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ message: "Error fetching customers" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const customer = await CustomerService.getById(id);

      if (!customer)
        return res.status(404).json({ message: "Customer not found" });

      res.json(customer);
    } catch (err) {
      res.status(500).json({ message: "Error fetching customer" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { Name, Phone, Email, Address } = req.body;

      const newCustomer = await CustomerService.create({
        Name,
        Phone,
        Email,
        Address,
      });

      res.status(201).json(newCustomer);
    } catch (err: any) {
      res.status(500).json({ message: "Error creating customer" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;

      const updated = await CustomerService.update(id, data);

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Error updating customer" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await CustomerService.delete(id);

      res.json({ message: "Customer deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting customer" });
    }
  },
};
