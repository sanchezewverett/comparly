"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "@/types/api/products.types";

interface UseProductsProps {
  page?: number;
  category?: string;
  name?: string;
}

async function fetchProducts({
  page = 1,
  category,
  name,
}: UseProductsProps): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: "16",
    ...(category ? { category } : {}),
    ...(name ? { name } : {}),
  });
  const res = await fetch(`/api/products?${params}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export function useProducts({ page = 1, category, name }: UseProductsProps) {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", page, category, name],
    queryFn: () => fetchProducts({ page, category, name }),
    staleTime: 1000 * 60,
  });
}
