import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types";

type Props = {
  index: number;
  item: { ProductID: number | ""; Quantity: number };
  products: Product[];
  onChange: (
    index: number,
    field: "ProductID" | "Quantity",
    value: number | ""
  ) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
};

export const OrderItemRow = ({
  index,
  item,
  products,
  onChange,
  onRemove,
  canRemove,
}: Props) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-end">
      {/* PRODUCT SELECT */}
      <div className="col-span-6 space-y-1">
        <Label className="text-xs">Product</Label>
        <select
          className="h-9 rounded-xl text-xs border border-slate-200 px-2"
          value={item.ProductID}
          onChange={(e) =>
            onChange(
              index,
              "ProductID",
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
        >
          <option value="">Choose...</option>
          {products.map((p) => (
            <option key={p.ProductID} value={p.ProductID}>
              {p.Name}
            </option>
          ))}
        </select>
      </div>

      {/* QUANTITY */}
      <div className="col-span-4 space-y-1">
        <Label className="text-xs">Quantity</Label>
        <Input
          type="number"
          min={1}
          className="h-9 text-xs rounded-xl"
          value={item.Quantity}
          onChange={(e) =>
            onChange(
              index,
              "Quantity",
              Number(e.target.value) <= 0 ? 1 : Number(e.target.value)
            )
          }
        />
      </div>

      {/* REMOVE BUTTON */}
      <div className="col-span-2 flex justify-end">
        {canRemove && (
          <Button
            type="button"
            variant="destructive"
            className="h-9 text-[10px] rounded-xl"
            onClick={() => onRemove(index)}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};
