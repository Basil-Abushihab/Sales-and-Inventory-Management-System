import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryTable } from "@/modules/inventory/components/InventoryTable";
import { InventoryForm } from "@/modules/inventory/components/InventoryForm";
import { useInventory } from "@/modules/inventory/hooks/useInventory";
import { useWarehouses } from "@/modules/warehouse/hooks/useWarehouse";
import { useProducts } from "@/modules/product/hooks/useProducts";

export const InventoryPage = () => {
  const { inventory, addInventory, deleteInventory,updateInventory } = useInventory();
  const {warehouses}=useWarehouses();
  const {data:products}=useProducts();
console.log
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight">Inventory</h2>

        <p className="text-xs text-slate-500 max-w-md">
          Manage product quantities per warehouse. These quantities affect order processing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* TABLE */}
        <Card className="rounded-3xl border-none shadow-sm bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">Inventory Records</CardTitle>
          </CardHeader>

          <CardContent>
            <InventoryTable
            onUpdate={updateInventory}
              records={inventory}
              onDelete={deleteInventory}
            />
          </CardContent>
        </Card>

        {/* FORM */}
        <Card className="rounded-3xl border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-sm">Add Inventory</CardTitle>
          </CardHeader>

          <CardContent>
            <InventoryForm
              warehouses={warehouses}
              products={products}
              onSubmit={addInventory}
            />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
