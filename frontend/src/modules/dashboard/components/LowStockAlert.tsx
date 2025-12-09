import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

type LowStockAlertProps = {
  stats: {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    activeProducts: number;
  };
};

export function LowStockAlert(props: LowStockAlertProps) {
  const { stats } = props;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg text-white"
    >
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6" />
        <h3 className="text-lg font-bold">Low Stock Alerts</h3>
      </div>

      <p className="text-orange-100">
        {stats.activeProducts} products are running low on stock. Review
        inventory levels to avoid stockouts.
      </p>
    </motion.div>
  );
}
