import { z } from "zod";
import categoriesIdentifiers from "./categories";

export const productCategoryShape = z.object({
  google_product_category: z.string().optional(), //TODO categories as eng keys
  product_type: z
    .string()
    .max(750, "Product type must have at most 750 characters."),
});

export const productCategoryTransform = <
  T extends z.infer<typeof productCategoryShape>
>({
  google_product_category,
  product_type,
  ...rest
}: T) => ({
  internalProductCategory: product_type,
  googleProductCategory: google_product_category,
  ...rest,
});
