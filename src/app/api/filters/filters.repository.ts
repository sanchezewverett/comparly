import { prisma } from "@/lib/prisma";

export const getFilters = async () => {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const brands = await prisma.product.findMany({
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });

  return {
    data: {
      categories,
      brands,
    },
  };
};
