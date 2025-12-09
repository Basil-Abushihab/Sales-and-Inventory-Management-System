import { prisma } from "../prisma/client";

export const InventoryService = {
  getAll: () => {
    return prisma.inventory.findMany({
      include: {
        product: true,
        warehouse: true,
      },
    });
  },

  getOne: (warehouseId: number, productId: number) => {
    return prisma.inventory.findUnique({
      where: {
        WarehouseID_ProductID: { WarehouseID: warehouseId, ProductID: productId },
      },
      include: {
        product: true,
        warehouse: true,
      },
    });
  },

  create: (data: {
    WarehouseID: number;
    ProductID: number;
    QuantityInStock: number;
  }) => {
    return prisma.inventory.create({
      data,
    });
  },

  update: (
    warehouseId: number,
    productId: number,
    data: { QuantityInStock: number }
  ) => {
    return prisma.inventory.update({
      where: {
        WarehouseID_ProductID: { WarehouseID: warehouseId, ProductID: productId },
      },
      data,
    });
  },

  delete: (warehouseId: number, productId: number) => {
    return prisma.inventory.delete({
      where: {
        WarehouseID_ProductID: { WarehouseID: warehouseId, ProductID: productId },
      },
    });
  },
};
