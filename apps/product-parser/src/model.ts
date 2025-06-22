import { z } from "zod";
import {
  basicProductDataShape,
  basicProductDataTransform,
} from "./basicProductDataShape";
import {
  priceAndAvailabilityShape,
  priceAndAvailabilityTransform,
} from "./priceAndAvailabilityShape";
import {
  productCategoryShape,
  productCategoryTransform,
} from "./productCategoryShape";
import {
  productIdentifierRefinement,
  productIdentifiersShape,
} from "./productIdentifiersShape";

const productShape = basicProductDataShape
  .merge(priceAndAvailabilityShape)
  .merge(productCategoryShape)
  .merge(productIdentifiersShape)
  .refine(productIdentifierRefinement)
  .transform(basicProductDataTransform)
  .transform(priceAndAvailabilityTransform)
  .transform(productCategoryTransform);

export const feedXmlDocumentShape = z.object({
  rss: z.object({
    channel: z.object({
      item: z.array(z.record(z.string(), z.any())),
    }),
  }),
});

export const productsDataShape = z.array(productShape);

export type FeedXmlDocument = z.infer<typeof feedXmlDocumentShape>;

export type ProductDataShape = z.infer<typeof productsDataShape>;
