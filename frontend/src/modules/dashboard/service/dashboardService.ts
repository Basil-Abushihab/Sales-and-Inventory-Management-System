import { CustomersService } from "@/modules/customers/service/customersService";
import { ProductService } from "@/modules/product/service/productService";
import { OrderService } from "@/modules/order/service/orderService";

export const fetchDashboardData = async () => {
  const [customers, products, orders] = await Promise.all([
    CustomersService.getCustomers(),
    ProductService.getAll(),
    OrderService.getAll(),
  ]);

  return { customers, products, orders };
};