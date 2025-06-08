"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "@/types/api/product.types";

interface UseProductsProps {
  page?: number;
  category?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
}

async function fetchProducts({
  page = 1,
  category,
  name,
  minPrice,
  maxPrice,
  brand,
}: UseProductsProps): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: "16",
    ...(category ? { category } : {}),
    ...(brand ? { brand } : {}),
    ...(name ? { name } : {}),
    ...(minPrice !== undefined ? { minPrice: String(minPrice * 100) } : {}),
    ...(maxPrice !== undefined ? { maxPrice: String(maxPrice * 100) } : {}),
  });
  const res = await fetch(`/api/products?${params}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export function useProducts(props: UseProductsProps) {
  //TODO: talk about pagination from UI perspective
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", props],
    queryFn: () => fetchProducts(props),
    staleTime: 1000 * 60,
  });
}
