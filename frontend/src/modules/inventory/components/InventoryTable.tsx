import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Inventory, InventoryWithRelations } from "@/types";
import { useState } from "react";

type Props = {
  records: InventoryWithRelations[];
  onDelete: (warehouseId: number, productId: number) => void;
  onUpdate: (updated: Inventory) => void;
};

export const InventoryTable = ({ records, onDelete, onUpdate }: Props) => {
  const [editKey, setEditKey] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const startEdit = (r: InventoryWithRelations) => {
    const key = `${r.WarehouseID}-${r.ProductID}`;
    setEditKey(key);
    setQuantity(r.QuantityInStock);
  };

  const saveEdit = (row: InventoryWithRelations) => {
    onUpdate({
      ...row,
      QuantityInStock: quantity,
    });
    setEditKey(null);
  };

  const cancelEdit = () => {
    setEditKey(null);
  };

  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80">
            <TableHead className="text-xs">Warehouse</TableHead>
            <TableHead className="text-xs">Product</TableHead>
            <TableHead className="text-xs">Quantity</TableHead>
            <TableHead className="text-xs text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {records.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-xs text-slate-400 py-6"
              >
                No inventory data yet.
              </TableCell>
            </TableRow>
          )}

          {records.map((r, i) => {
            const key = `${r.WarehouseID}-${r.ProductID}`;
            const isEditing = editKey === key;

            return (
              <TableRow key={key}>
                {/* Warehouse Name */}
                <TableCell className="text-xs">
                  {r.warehouse.WarehouseName}
                </TableCell>

                {/* Product Name */}
                <TableCell className="text-xs">
                  {r.product.Name}
                </TableCell>

                {/* Quantity */}
                <TableCell className="text-xs">
                  {isEditing ? (
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-20 px-2 py-1 rounded border text-xs"
                    />
                  ) : (
                    r.QuantityInStock
                  )}
                </TableCell>

                {/* ACTIONS */}
                <TableCell className="text-xs text-right space-x-2">
                  {!isEditing ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-[11px]"
                        onClick={() => startEdit(r)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-[11px]"
                        onClick={() =>
                          onDelete(r.warehouse.WarehouseID, r.product.ProductID)
                        }
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        className="h-7 text-[11px]"
                        onClick={() => saveEdit(r)}
                      >
                        Save
                      </Button>

                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 text-[11px]"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
