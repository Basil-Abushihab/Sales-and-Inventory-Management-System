import { prisma } from "../prisma/client";

export const OrderService = {
  getAll: () => {
    return prisma.order.findMany({
      include: {
        customer: true,
        orderDetails: {
          include: { product: true }
        }
      },
    });
  },

  getById: (id: number) => {
    return prisma.order.findUnique({
      where: { OrderID: id },
      include: {
        customer: true,
        orderDetails: {
          include: { product: true }
        }
      },
    });
  },

  create: async (data: {
    CustomerID: number;
    Status: string;
    WarehouseId:number
    items: { ProductID: number; Quantity: number, }[];
  }) => {
    return prisma.$transaction(async (tx) => {
      // Step 1: Create the Order with temporary totalAmount = 0
      const order = await tx.order.create({
        data: {
          CustomerID: data.CustomerID,
          Status: data.Status,
          TotalAmount: 0,
        },
      });

      let totalAmount = 0;

      // Step 2: Create Order Details + Update Inventory
      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { ProductID: item.ProductID },
        });

        if (!product) {
          throw new Error(`Product ${item.ProductID} not found`);
        }

        const unitPrice = product.UnitPrice;
        const lineTotal = unitPrice * item.Quantity;

        // Add to total order amount
        totalAmount += lineTotal;

        // Create order detail row
        await tx.orderDetail.create({
          data: {
            OrderID: order.OrderID,
            ProductID: item.ProductID,
            Quantity: item.Quantity,
            UnitPrice: unitPrice,
            LineTotal: lineTotal,
          },
        });


        // Update inventory (subtract stock)
        await tx.inventory.update({
          where: {
            WarehouseID_ProductID: {
              WarehouseID: data.WarehouseId, 
              ProductID: item.ProductID,
            },
          },
          data: {
            QuantityInStock: {
              decrement: item.Quantity,
            },
          },
        });
      }

      // Step 3: Update order with final total amount
      const updatedOrder = await tx.order.update({
        where: { OrderID: order.OrderID },
        data: { TotalAmount: totalAmount },
        include: {
          customer: true,
          orderDetails: true,
        },
      });

      return updatedOrder;
    });
  },

  delete: (id: number) => {
    return prisma.order.delete({
      where: { OrderID: id },
    });
  },
};
