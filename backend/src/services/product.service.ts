import { prisma } from "../prisma/client";

export const ProductService = {
  getAll: () => {
    return prisma.product.findMany();
  },

  getById: (id: number) => {
    return prisma.product.findUnique({
      where: { ProductID: id },
    });
  },

  create: (data: {
    Name: string;
    UnitPrice: number;
    Status?: boolean;
    ReorderLevel: number;
  }) => {
    return prisma.product.create({
      data,
    });
  },

  update: (id: number, data: any) => {
    return prisma.product.update({
      where: { ProductID: id },
      data,
    });
  },

  delete: (id: number) => {
    return prisma.product.delete({
      where: { ProductID: id },
    });
  },
};
