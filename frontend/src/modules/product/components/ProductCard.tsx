import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { motion } from "framer-motion";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import { ProductService } from "../service/productService";

type ProductCardProps = {
  data: Product[];
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
  p: Product;
};

export function ProductCard({ data, setData, p }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<Omit<Product, "ProductID">>({
    Name: p.Name,
    UnitPrice: p.UnitPrice,
    Status: p.Status,
    ReorderLevel: p.ReorderLevel,
  });

  const saveChanges =async () => {
    const response =await ProductService.update(p.ProductID, form);
    if(!response){
      console.error("Failed to update product");
      setIsEditing(false);
      return;
    }
    setData(
      data.map((prod) =>
        prod.ProductID === p.ProductID
          ? { ...response, ProductID: p.ProductID }
          : prod
      )
    );
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setForm({
      Name: p.Name,
      UnitPrice: p.UnitPrice,
      Status: p.Status,
      ReorderLevel: p.ReorderLevel,
    });
    setIsEditing(false);
  };


  const deleteProduct = async () => {
    const response = await ProductService.delete(p.ProductID);
    if (!response) {
      console.error("Failed to delete product");
      return;
    }
    setData(data.filter((prod) => prod.ProductID !== p.ProductID));
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: !isEditing ? 1.02 : 1, y: !isEditing ? -4 : 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 transition-all"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
          {form.Name[0]}
        </div>

        {!isEditing ? (
          <span
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              form.Status
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {form.Status ? "Available" : "Out Of Stock"}
          </span>
        ) : (
          <select
            value={form.Status ? "active" : "inactive"}
            onChange={(e) =>
              setForm({ ...form, Status: e.target.value === "active" })
            }
            className="border border-gray-300 bg-gray-50 rounded-lg px-2 py-1 text-sm"
          >
            <option value="active">Available</option>
            <option value="inactive">Out Of Stock</option>
          </select>
        )}
      </div>

      {/* NAME */}
      {!isEditing ? (
        <h4 className="text-lg font-bold text-gray-800 mb-2">{p.Name}</h4>
      ) : (
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-lg mb-2"
          value={form.Name}
          onChange={(e) => setForm({ ...form, Name: e.target.value })}
        />
      )}

      {/* DETAILS */}
      <div className="space-y-2 mb-4">
        {/* PRICE */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Price:</span>

          {!isEditing ? (
            <span className="font-bold text-gray-800">${p.UnitPrice}</span>
          ) : (
            <input
              type="number"
              className="w-24 border px-2 py-1 rounded-lg"
              value={form.UnitPrice}
              onChange={(e) =>
                setForm({ ...form, UnitPrice: Number(e.target.value) })
              }
            />
          )}
        </div>

        {/* REORDER LEVEL */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Reorder Level:</span>

          {!isEditing ? (
            <span className="font-semibold text-gray-700">
              {p.ReorderLevel}
            </span>
          ) : (
            <input
              type="number"
              className="w-24 border px-2 py-1 rounded-lg"
              value={form.ReorderLevel}
              onChange={(e) =>
                setForm({ ...form, ReorderLevel: Number(e.target.value) })
              }
            />
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      {!isEditing ? (
        <div className="flex gap-2 w-full">
          <Button
            variant="secondary"
            className="flex-1 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="icon-sm" />
            Edit
          </Button>

          <Button
            variant="destructive"
            onClick={deleteProduct}
            className="flex-1 cursor-pointer"
          >
            <Trash2 className="icon-sm" />
            Delete
          </Button>
        </div>
      ) : (
        <div className="flex gap-2 w-full">
          <Button
            variant="secondary"
            className="flex-1 cursor-pointer"
            onClick={saveChanges}
          >
            <Check className="icon-sm" />
            Save
          </Button>

          <Button
            variant="destructive"
            className="flex-1 cursor-pointer"
            onClick={cancelChanges}
          >
            <X className="icon-sm" />
            Cancel
          </Button>
        </div>
      )}
    </motion.div>
  );
}
