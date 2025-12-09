import { Dashboard } from "@/pages/Dashboard";
import type { Route } from "../AppRoutes";
import { Customers } from "@/pages/Customers";
import { Products } from "@/pages/Products";
import { WarehousesPage } from "@/pages/Warehouses";
import { InventoryPage } from "@/pages/Inventory";
import { OrdersPage } from "@/pages/Orders";

export const publicRoutes: Route[] = [
    {element:<Dashboard/>,path:"/"},
    {element:<Customers/>,path:"/customers"},
    {element:<Products/>,path:"/products"},
    {element:<WarehousesPage/>,path:"/warehouses"},
    {element:<InventoryPage/>,path:"/inventory"},
    {element:<OrdersPage/>,path:"/orders"},
];
