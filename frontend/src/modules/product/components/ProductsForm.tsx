import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { ProductService } from "../service/productService";

type ProductFormProps = {
  data: Product[];
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
};

export function ProductForm({ data, setData }: ProductFormProps) {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState<Omit<Product, "ProductID">>({
    Name: "",
    UnitPrice: 0,
    Status: true,
    ReorderLevel: 0,
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct: Omit<Product, "ProductID"> = {
      ...form,
      UnitPrice: Number(form.UnitPrice),
      ReorderLevel: Number(form.ReorderLevel),
    };
    const response=await ProductService.create(newProduct);
    if(!response){
      console.error("Failed to create product");
      resetForm();
      return;
    }

    setData([...data, { ...response }]);
    resetForm();
  };

  const resetForm = () => {
    setShow(false);
    setEditId(null);
    setForm({
      Name: "",
      UnitPrice: 0,
      Status: true,
      ReorderLevel: 0,
    });
  };

  const inputClasses =
    "peer w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 " +
    "focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 " +
    "outline-none transition-all";

  return (
    <>
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShow(true)}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg 
                     flex items-center gap-2 font-semibold hover:shadow-xl transition"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </motion.button>
      </div>

      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-5 bg-white border border-orange-100 rounded-2xl p-7 shadow-xl"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            {editId ? "Edit Product" : "Add New Product"}
          </h3>

          <form onSubmit={submit} className="grid grid-cols-2 gap-6">

            {/* PRODUCT NAME */}
            <div className="relative">
              <input
                type="text"
                value={form.Name}
                onChange={(e) => setForm({ ...form, Name: e.target.value })}
                className={inputClasses}
                required
              />
              <label className="form-label">Product Name</label>
            </div>

            {/* UNIT PRICE */}
            <div className="relative">
              <input
                type="number"
                value={form.UnitPrice}
                onChange={(e) =>
                  setForm({ ...form, UnitPrice: Number(e.target.value) })
                }
                className={inputClasses}
                required
              />
              <label className="form-label">Unit Price</label>
            </div>

            {/* STATUS */}
            <div className="relative">
              <select
                value={form.Status ? "Available" : "Out Of Stock"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    Status: e.target.value === "Available",
                  })
                }
                className={inputClasses}
              >
                <option value="active">Available</option>
                <option value="inactive">Out Of Stock</option>
              </select>
              <label className="form-label">Status</label>
            </div>

            {/* REORDER LEVEL */}
            <div className="relative">
              <input
                type="number"
                value={form.ReorderLevel}
                onChange={(e) =>
                  setForm({ ...form, ReorderLevel: Number(e.target.value) })
                }
                className={inputClasses}
                required
              />
              <label className="form-label">Reorder Level</label>
            </div>

            {/* BUTTONS */}
            <div className="col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg font-semibold transition"
              >
                {editId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
}
