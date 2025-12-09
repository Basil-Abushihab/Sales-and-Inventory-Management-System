import { useEffect, useState } from "react";
import { fetchDashboardData } from "@/modules/dashboard/service/dashboardService";
import type { Customer, OrderWithDetails, Product } from "@/types";

export const useStats = () => {
  const [data, setData] = useState<{
    customers: Customer[];
    products: Product[];
    orders: OrderWithDetails[];
} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchDashboardData();
        setData(result);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = data
    ? {
        totalSales: data.orders.reduce((sum, o) => sum + o.TotalAmount, 0)??0,
        totalOrders: data.orders.length??0,
        totalProducts: data.products.length??0,
        totalCustomers: data.customers.length??0,
        activeProducts: data.products.filter((p) => p.Status).length??0,
      }
    : null;

  return { data, stats, loading };
};
