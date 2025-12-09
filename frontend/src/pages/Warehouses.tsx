import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WarehouseTable } from "@/modules/warehouse/components/WarehouseTable";
import { WarehouseForm } from "@/modules/warehouse/components/WarehouseForm";
import { useWarehouses } from "@/modules/warehouse/hooks/useWarehouse";

export const WarehousesPage = () => {
  const { warehouses, addWarehouse, deleteWarehouse,editWarehouse } = useWarehouses();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Manage Warehouses
        </h2>

        <p className="text-xs text-slate-500 max-w-md">
          Add new warehouse locations and update existing ones.
          These warehouses will be used for storing inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* TABLE */}
        <Card className="rounded-3xl border-none shadow-sm bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">All Warehouses</CardTitle>
          </CardHeader>
          <CardContent>
            <WarehouseTable
              onUpdate={editWarehouse}
              warehouses={warehouses}
              onDelete={deleteWarehouse}
            />
          </CardContent>
        </Card>

        {/* FORM */}
        <Card className="rounded-3xl border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-sm">Add Warehouse</CardTitle>
          </CardHeader>

          <CardContent>
            <WarehouseForm onSubmit={addWarehouse} />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
