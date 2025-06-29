import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getProducts = async ({
  page,
  pageSize,
  name,
  minPrice,
  maxPrice,
  brand,
  category,
}: {
  page: number;
  pageSize: number;
  name?: string;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
}) => {
  const where: Prisma.ProductDetailsWhereInput = {};

  console.log('-------');
  console.log(name);
  console.log('-------');
  if (name) {
    where.name = { contains: name, mode: 'insensitive' };
  }

  if (minPrice) {
    where.price = { gte: minPrice };
  }

  if (maxPrice) {
    where.price = { lte: maxPrice };
  }

  if (brand) {
    where.product = {
      brand: { contains: brand, mode: 'insensitive' },
    };
  }

  if (category) {
    where.product = {
      googleCategoryId: category,
    };
  }

  const [products, total] = await Promise.all([
    prisma.productDetails.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { product: true },
    }),
    prisma.productDetails.count({ where }),
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
  return prisma.productDetails.findUnique({
    where: { id },
    include: { product: true, client: true },
  });
};
