import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Warehouse } from "@/types";
import { useState } from "react";

type Props = {
  warehouses: Warehouse[];
  onDelete: (id: number) => void;
  onUpdate: (updated: Warehouse) => void;
};

export const WarehouseTable = ({ warehouses, onDelete, onUpdate }: Props) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Warehouse, "WarehouseID">>({
    WarehouseName: "",
    Location: "",
  });

  const startEdit = (w: Warehouse) => {
    setEditId(w.WarehouseID);
    setForm({
      WarehouseName: w.WarehouseName,
      Location: w.Location,
    });
  };

  const saveChanges = () => {
    if (!editId) return;

    onUpdate({
      WarehouseID: editId,
      ...form,
    });

    setEditId(null);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80">
            <TableHead className="text-xs">Name</TableHead>
            <TableHead className="text-xs">Location</TableHead>
            <TableHead className="text-xs text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {warehouses.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-xs text-slate-400 py-6"
              >
                No warehouses yet. Add one using the form on the right.
              </TableCell>
            </TableRow>
          )}

          {warehouses.map((w) => {
            const isEditing = editId === w.WarehouseID;

            return (
              <TableRow key={w.WarehouseID}>
                {/* NAME */}
                <TableCell className="text-xs">
                  {isEditing ? (
                    <input
                      type="text"
                      value={form.WarehouseName}
                      onChange={(e) =>
                        setForm({ ...form, WarehouseName: e.target.value })
                      }
                      className="w-full px-2 py-1 border rounded-lg text-xs"
                    />
                  ) : (
                    w.WarehouseName
                  )}
                </TableCell>

                {/* LOCATION */}
                <TableCell className="text-xs">
                  {isEditing ? (
                    <input
                      type="text"
                      value={form.Location??""}
                      onChange={(e) =>
                        setForm({ ...form, Location: e.target.value })
                      }
                      className="w-full px-2 py-1 border rounded-lg text-xs"
                    />
                  ) : (
                    w.Location
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
                        onClick={() => startEdit(w)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-[11px]"
                        onClick={() => onDelete(w.WarehouseID)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        className="h-7 text-[11px]"
                        onClick={saveChanges}
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
