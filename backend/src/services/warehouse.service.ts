import { prisma } from "../prisma/client";

export const WarehouseService = {
  getAll: () => {
    return prisma.warehouse.findMany();
  },

  getById: (id: number) => {
    return prisma.warehouse.findUnique({
      where: { WarehouseID: id },
    });
  },

  create: (data: {
    WarehouseName: string;
    Location?: string | null;
  }) => {
    return prisma.warehouse.create({
      data,
    });
  },

  update: (id: number, data: any) => {
    return prisma.warehouse.update({
      where: { WarehouseID: id },
      data,
    });
  },

  delete: (id: number) => {
    return prisma.warehouse.delete({
      where: { WarehouseID: id },
    });
  },
};
