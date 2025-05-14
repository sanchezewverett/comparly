import { z } from "zod";

export const getProductsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(10),
  name: z.string().optional(),
  category: z.coerce.number().optional(),
});

export type GetProductsQuery = z.infer<typeof getProductsSchema>;

export const getProductDetailsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export type GetProductsDetailsParams = z.infer<typeof getProductDetailsSchema>;
