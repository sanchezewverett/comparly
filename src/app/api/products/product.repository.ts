import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getProducts = async ({
  page,
  pageSize,
  name,
  category,
  minPrice,
  maxPrice,
  brand,
}: {
  page: number;
  pageSize: number;
  name?: string;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
}) => {
  const where: Prisma.ProductWhereInput = {};

  if (name) {
    where.name = { contains: name, mode: "insensitive" };
  }

  if (category) {
    where.category = { id: category };
  }

  if (minPrice) {
    where.price = { gte: minPrice };
  }

  if (maxPrice) {
    where.price = { lte: maxPrice };
  }

  if (brand) {
    where.brand = { contains: brand, mode: "insensitive" };
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { category: true },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    data: products,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
};

export const getProductById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true, client: true },
  });
};
