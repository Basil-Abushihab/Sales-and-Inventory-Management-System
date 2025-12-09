-- CreateTable
CREATE TABLE "Customer" (
    "CustomerID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Phone" TEXT,
    "Email" TEXT,
    "Address" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("CustomerID")
);

-- CreateTable
CREATE TABLE "Product" (
    "ProductID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "UnitPrice" DOUBLE PRECISION NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT true,
    "ReorderLevel" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("ProductID")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "WarehouseID" SERIAL NOT NULL,
    "WarehouseName" TEXT NOT NULL,
    "Location" TEXT,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("WarehouseID")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "WarehouseID" INTEGER NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "QuantityInStock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("WarehouseID","ProductID")
);

-- CreateTable
CREATE TABLE "Order" (
    "OrderID" SERIAL NOT NULL,
    "CustomerID" INTEGER NOT NULL,
    "OrderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TotalAmount" DOUBLE PRECISION NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "OrderID" INTEGER NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "UnitPrice" DOUBLE PRECISION NOT NULL,
    "LineTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("OrderID","ProductID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Email_key" ON "Customer"("Email");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_WarehouseID_fkey" FOREIGN KEY ("WarehouseID") REFERENCES "Warehouse"("WarehouseID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer"("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Order"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Product"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;
