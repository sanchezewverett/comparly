import { prisma } from "@/lib/prisma";

export const getFilters = async () => {
  const brands = await prisma.product.findMany({
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });

  return {
    data: {
      brands,
    },
  };
};
