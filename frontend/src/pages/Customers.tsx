import { CustomerForm } from "@/modules/customers/components/CustomerForm";
import { CustomersTable } from "@/modules/customers/components/CustomerTable";
import { useCustomer } from "@/modules/customers/hooks/useCustomer";

export function Customers() {
  const { data, setData, isLoading } = useCustomer();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Browse Customers</h2>
      <CustomersTable data={data} setData={setData} />
      <CustomerForm data={data} setData={setData} />
    </div>
  );
}
