import type { Customer, Order } from "@/types";
import { motion } from "framer-motion";

type RecentOrdersProps={
    orders:Order[];
    customers:Customer[];
}

export function RecentOrders(props:RecentOrdersProps) {
    const {orders,customers}=props;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
        <button className="text-sm text-orange-600 font-semibold">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((o) => {
          const c = customers.find((cu) => cu.CustomerID === o.CustomerID);
          return (
            <div
              key={o.OrderID}
              className="flex items-center justify-between p-4 bg-orange-50 rounded-xl"
            >
              <div>
                <p className="font-semibold text-gray-800">{c?.Name}</p>
                <p className="text-sm text-gray-500">{o.OrderDate}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-800">${o.TotalAmount}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-lg ${
                    o.Status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {o.Status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
