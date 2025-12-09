import { LowStockAlert } from "@/modules/dashboard/components/LowStockAlert";
import { ProductStats } from "@/modules/dashboard/components/ProductStats";
import { RecentOrders } from "@/modules/dashboard/components/RecentOrders";
import { StatCard } from "@/modules/dashboard/components/StatCard";
import { useStats } from "@/modules/dashboard/hooks/useStats";

export const Dashboard = () => {
    const { data, stats,loading } = useStats();
if(loading){
  return <div>Loading...</div>;
}

  if (!data || !stats) {
    return <div>No data available</div>;
  }


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={`$${stats.totalSales.toLocaleString()}`}
          change="+23.5%"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          change="+12.3%"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts.toString()}
          change="+5.2%"
        />
        <StatCard
          title="Customers"
          value={stats.totalCustomers.toString()}
          change="+8.1%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductStats products={data.products} />
        <RecentOrders customers={data.customers} orders={data.orders}/>
      </div>

      <LowStockAlert stats={stats} />
    </div>
  );
};
