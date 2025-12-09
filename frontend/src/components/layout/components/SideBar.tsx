import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";
import { useState } from "react";
import {Link} from "react-router";
export function Sidebar() {
  const nav = [
    { url:"/", id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { url:"/customers", id: "customers", label: "Customers", icon: Users },
    { url:"/products", id: "products", label: "Products", icon: Package },
    { url:"/warehouses", id: "warehouses", label: "Warehouses", icon: Warehouse },
    { url:"/inventory", id: "inventory", label: "Inventory", icon: ClipboardList },
    { url:"/orders", id: "orders", label: "Orders", icon: ShoppingCart },
  ];
  const [selectedPage, setSelectedPage] = useState<string>(nav[0].id);

  return (
    <AnimatePresence>
      (
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        exit={{ x: -280 }}
        transition={{ type: "spring", damping: 20 }}
        className="w-70 bg-white shadow-2xl flex flex-col border-r border-orange-100"
      >
        <div className="p-6 border-b border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Stockflow</h1>
              <p className="text-xs text-gray-500">Inventory System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {nav.map((item) => (
            <Link to={item.url} key={item.id}>
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPage(item.id)}
                className={clsx(
                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    selectedPage === item.id
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200"
                      : "text-gray-600 hover:bg-orange-50"
                  }`
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            </Link>
          ))}
        </nav>
      </motion.aside>
      )
    </AnimatePresence>
  );
}
