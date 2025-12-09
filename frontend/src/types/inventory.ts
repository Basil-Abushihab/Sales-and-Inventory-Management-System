import type { Product } from "./product";
import type { Warehouse } from "./warehouse";

export interface Inventory {
  WarehouseID: number;
  ProductID: number;
  QuantityInStock: number;
}

export interface InventoryWithRelations extends Inventory {
  product: Product;
  warehouse: Warehouse;
}