"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/api/products.types";

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Nie udało się załadować produktu.");
  return res.json();
}

export function useProduct(id: string) {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
}
