import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrders } from "@/modules/order/hooks/useOrders";
import { OrdersTable } from "@/modules/order/components/OrdersTable";
import { CreateOrderForm } from "@/modules/order/components/CreateOrderForm";
import { useCustomer } from "@/modules/customers/hooks/useCustomer";
import { useProducts } from "@/modules/product/hooks/useProducts";
import { useWarehouses } from "@/modules/warehouse/hooks/useWarehouse";

export const OrdersPage = () => {
  const {
    orders,
    loading,
    createOrder,
    deleteOrder,
    updateOrderDetail,
    deleteOrderDetail,
  } = useOrders();

  const {data:customers} = useCustomer();
  const {data:products} = useProducts();
  const {warehouses}=useWarehouses();

  if (loading)
    return (
      <div className="text-center py-10 text-sm text-slate-500">
        Loading orders…
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h2 className="text-xl font-semibold tracking-tight">Orders</h2>
        <p className="text-xs text-slate-500 max-w-md">
          Create, edit, and manage customer orders and their items.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* TABLE */}
        <Card className="rounded-3xl border-none shadow-sm bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersTable
              orders={orders}
              onDeleteOrder={deleteOrder}
              onUpdateDetail={(orderId, productId, qty) =>
                updateOrderDetail(orderId, productId, { Quantity: qty })
              }
              onDeleteDetail={deleteOrderDetail}
            />
          </CardContent>
        </Card>

        {/* CREATE ORDER */}
        <Card className="rounded-3xl border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-sm">Create Order</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateOrderForm
            warehouses={warehouses}
              customers={customers}
              products={products}
              onSubmit={createOrder}
            />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
