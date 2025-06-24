import { z } from "zod";

export const productIdentifiersShape = z.object({
  brand: z
    .string()
    .nonempty("Brand must be a least 1 character.")
    .max(70, "Brand must be at most 70 characters."),
  gtin: z.union([z.string(), z.string()]).optional(), //TODO check multiple gtin types later
  mpn: z
    .union([
      z.string().max(70, "Mnp must be at most 70 characters"),
      z.number(),
    ])
    .transform((val) => String(val))
    .optional(),
});

export const productIdentifierRefinement = (
  value: z.infer<typeof productIdentifiersShape>
) => [value.gtin || value.mpn, "Product GTIN or MNP must be defined."];
