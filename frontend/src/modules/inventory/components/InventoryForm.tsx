import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { InventoryWithRelations, Product, Warehouse } from "@/types";

type Props = {
  warehouses: Warehouse[];
  products: Product[];
  onSubmit: (record:InventoryWithRelations) => void;
};

export const InventoryForm = ({ warehouses, products, onSubmit }: Props) => {
  const [warehouseId, setWarehouseId] = useState<number | "">("");
  const [productId, setProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const w = warehouses.find((x) => x.WarehouseID === Number(warehouseId));
    const p = products.find((x) => x.ProductID === Number(productId));

    if (!w || !p) return;

    onSubmit({
      product: p,
      warehouse: w,
      WarehouseID: Number(warehouseId),
      ProductID: Number(productId),
      QuantityInStock:quantity,
    });

    setWarehouseId("");
    setProductId("");
    setQuantity(0);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label className="text-xs">Select Warehouse</Label>
        <select
          required
          value={warehouseId}
          onChange={(e) => setWarehouseId(Number(e.target.value))}
          className="h-9 rounded-2xl text-xs border border-slate-200"
        >
          <option value="">Choose...</option>
          {warehouses.map((w) => (
            <option key={w.WarehouseID} value={w.WarehouseID}>
              {w.WarehouseName}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Select Product</Label>
        <select
          required
          value={productId}
          onChange={(e) => setProductId(Number(e.target.value))}
          className="h-9 rounded-2xl text-xs border border-slate-200"
        >
          <option value="">Choose...</option>
          {products.map((p) => (
            <option key={p.ProductID} value={p.ProductID}>
              {p.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Quantity</Label>
        <Input
          required
          type="number"
          min={0}
          className="h-9 text-xs rounded-2xl"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-2xl bg-gradient-to-r from-orange-500 via-orange-500 to-amber-400 text-xs font-semibold"
      >
        Add Inventory Record
      </Button>
    </form>
  );
};
