import { prisma } from "../prisma/client";

export const OrderDetailService = {
  getAll: () => {
    return prisma.orderDetail.findMany({
      include: {
        order: true,
        product: true,
      },
    });
  },

  getOne: (orderId: number, productId: number) => {
    return prisma.orderDetail.findUnique({
      where: {
        OrderID_ProductID: {
          OrderID: orderId,
          ProductID: productId,
        },
      },
      include: {
        order: true,
        product: true,
      },
    });
  },

  create: async (data: {
    OrderID: number;
    ProductID: number;
    Quantity: number;
  }) => {
    const product = await prisma.product.findUnique({
      where: { ProductID: data.ProductID },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const unitPrice = product.UnitPrice;
    const lineTotal = unitPrice * data.Quantity;

    return prisma.orderDetail.create({
      data: {
        OrderID: data.OrderID,
        ProductID: data.ProductID,
        Quantity: data.Quantity,
        UnitPrice: unitPrice,
        LineTotal: lineTotal,
      },
    });
  },

  update: async (
    orderId: number,
    productId: number,
    data: { Quantity: number }
  ) => {
    const product = await prisma.product.findUnique({
      where: { ProductID: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const unitPrice = product.UnitPrice;
    const lineTotal = unitPrice * data.Quantity;

    return prisma.orderDetail.update({
      where: {
        OrderID_ProductID: {
          OrderID: orderId,
          ProductID: productId,
        },
      },
      data: {
        Quantity: data.Quantity,
        UnitPrice: unitPrice,
        LineTotal: lineTotal,
      },
    });
  },

  delete: (orderId: number, productId: number) => {
    return prisma.orderDetail.delete({
      where: {
        OrderID_ProductID: {
          OrderID: orderId,
          ProductID: productId,
        },
      },
    });
  },
};
