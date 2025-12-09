import type { Product } from "@/types";
import { motion } from "framer-motion";

type ProductProps={
    products:Product[];
}
export function ProductStats(props:ProductProps) {
    const {products}=props;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Product Statistics</h3>
        <button className="text-sm text-gray-500 flex items-center gap-1">
          Today
        </button>
      </div>

      <div className="space-y-4">
        {products.slice(0, 3).map((p) => (
          <div key={p.ProductID} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center text-white font-semibold">
                {p.Name[0]}
              </div>
              <span className="font-medium text-gray-700">{p.Name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-800">${p.UnitPrice}</span>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-semibold">
                +{Math.floor(Math.random() * 20)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
