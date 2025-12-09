import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { CreateOrderPayload, Customer, Product, Warehouse } from "@/types";
import { OrderItemRow } from "./OrderItemRow";

type Props = {
  customers: Customer[];
  products: Product[];
  warehouses: Warehouse[];
  onSubmit: (payload: CreateOrderPayload ) => void;
};

export const CreateOrderForm = ({ customers, products, warehouses, onSubmit }: Props) => {
  const [CustomerID, setCustomerID] = useState<number | "">("");
  const [WarehouseID, setWarehouseID] = useState<number | "">("");

  const [items, setItems] = useState<
    { ProductID: number | ""; Quantity: number }[]
  >([{ ProductID: "", Quantity: 1 }]);

  /** Add new row */
  const addRow = () =>
    setItems(prev => [...prev, { ProductID: "", Quantity: 1 }]);

  /** Update row */
  const updateRow = (
    i: number,
    field: "ProductID" | "Quantity",
    value: number | ""
  ) => {
    setItems(prev => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [field]: value };
      return updated;
    });
  };

  /** Remove row */
  const removeRow = (index: number) =>
    setItems(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  /** Total preview */
  const totalPreview = useMemo(() => {
    return items.reduce(
      (sum, i) => (i.ProductID && i.Quantity > 0 ? sum + i.Quantity : sum),
      0
    );
  }, [items]);

  /** Submit handler */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!WarehouseID) {
      alert("Please select a warehouse.");
      return;
    }

    const validItems = items.filter(i => i.ProductID !== "" && i.Quantity > 0);

    if (validItems.length === 0) {
      alert("Order must contain at least one item.");
      return;
    }

    // The payload now includes ONLY one WarehouseID (not per item)
    const payload:CreateOrderPayload = {
      CustomerID: Number(CustomerID),
      Status: "Completed",
      WarehouseId: Number(WarehouseID),
      items: validItems.map(i => ({
        ProductID: Number(i.ProductID),
        Quantity: i.Quantity
      })),
    };

    onSubmit(payload);

    // Reset
    setCustomerID("");
    setWarehouseID("");
    setItems([{ ProductID: "", Quantity: 1 }]);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* CUSTOMER SELECT */}
      <div className="space-y-1">
        <Label className="text-xs">Customer</Label>
        <select
          required
          value={CustomerID}
          onChange={(e) => setCustomerID(Number(e.target.value))}
          className="h-9 rounded-xl text-xs border border-slate-200 px-2"
        >
          <option value="">Choose...</option>
          {customers.map((c) => (
            <option key={c.CustomerID} value={c.CustomerID}>
              {c.Name}
            </option>
          ))}
        </select>
      </div>

      {/* WAREHOUSE SELECT */}
      <div className="space-y-1">
        <Label className="text-xs">Warehouse</Label>
        <select
          required
          value={WarehouseID}
          onChange={(e) => setWarehouseID(Number(e.target.value))}
          className="h-9 rounded-xl text-xs border border-slate-200 px-2"
        >
          <option value="">Choose...</option>
          {warehouses.map((w) => (
            <option key={w.WarehouseID} value={w.WarehouseID}>
              {w.WarehouseName}
            </option>
          ))}
        </select>
      </div>

      {/* ITEM ROWS */}
      <div className="space-y-3">
        <Label className="text-xs">Items</Label>

        {items.map((item, index) => (
          <OrderItemRow
            key={index}
            index={index}
            item={item}
            products={products}
            onChange={updateRow}
            onRemove={removeRow}
            canRemove={items.length > 1}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full h-9 text-xs rounded-2xl"
          onClick={addRow}
        >
          + Add Item
        </Button>
      </div>

      {/* TOTAL PREVIEW */}
      <div className="text-[10px] text-slate-500 text-right pr-1">
        Items total: <span className="font-semibold">{totalPreview}</span>
      </div>

      {/* SUBMIT */}
      <Button
        type="submit"
        className="w-full rounded-2xl bg-gradient-to-r from-orange-500 via-orange-500 to-amber-400 text-xs font-semibold"
      >
        Create Order
      </Button>
    </form>
  );
};
