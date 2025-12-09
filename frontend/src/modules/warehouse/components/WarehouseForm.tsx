import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Warehouse } from "@/types";

type Props = {
  onSubmit: (w:Omit<Warehouse, "WarehouseID">) => void;
};

export const WarehouseForm = ({ onSubmit }: Props) => {
  const [form, setForm] = useState<Omit<Warehouse, "WarehouseID">>({WarehouseName:"",Location:""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ WarehouseName:"", Location: "" });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label className="text-xs">Warehouse Name</Label>
        <Input
          required
          value={form.WarehouseName}
          onChange={(e) =>
            setForm((f) => ({ ...f, WarehouseName: e.target.value }))
          }
          className="h-9 text-xs rounded-2xl"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Location</Label>
        <Input
          required
          value={form.Location??""}
          onChange={(e) =>
            setForm((f) => ({ ...f, Location: e.target.value }))
          }
          className="h-9 text-xs rounded-2xl"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-2xl bg-gradient-to-r from-orange-500 via-orange-500 to-amber-400 text-xs font-semibold"
      >
        Add Warehouse
      </Button>
    </form>
  );
};
