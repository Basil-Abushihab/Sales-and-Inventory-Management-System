import { prisma } from "../prisma/client";


export const CustomerService = {
  getAll: () => {
    return prisma.customer.findMany();
  },

  getById: (id: number) => {
    return prisma.customer.findUnique({
      where: { CustomerID: id },
    });
  },

  create: (data: {
    Name: string;
    Phone?: string | null;
    Email?: string | null;
    Address?: string | null;
  }) => {
    return prisma.customer.create({
      data,
    });
  },

  update: (id: number, data: any) => {
    return prisma.customer.update({
      where: { CustomerID: id },
      data,
    });
  },

  delete: (id: number) => {
    return prisma.customer.delete({
      where: { CustomerID: id },
    });
  },
};
