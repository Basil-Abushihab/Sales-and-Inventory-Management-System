import express from "express";
import customerRoutes from "./routes/customer.routes";
import productRoutes from "./routes/product.routes";
import warehouseRoutes from "./routes/warehouse.routes";
import inventoryRoutes from "./routes/inventory.routes";
import orderRoutes from "./routes/order.routes";
import orderDetailRoutes from "./routes/orderDetail.routes";
import cors from "cors";


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use("/customers",customerRoutes);
app.use("/products",productRoutes);
app.use("/warehouses",warehouseRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/orders", orderRoutes);
app.use("/orderDetails", orderDetailRoutes);


const port =3000;

app.listen(port,()=>{
    console.log("running server on port 3000")
});