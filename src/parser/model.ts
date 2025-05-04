import { z } from 'zod';
import { basicProductDataShape, basicProductDataTransform } from '@/parser/basicProductDataShape';
import { priceAndAvailabilityShape, priceAndAvailabilityTransform } from '@/parser/priceAndAvailabilityShape';
import { productCategoryShape, productCategoryTransform } from '@/parser/productCategoryShape';
import { productIdentifierRefinement, productIdentifiersShape } from '@/parser/productIdentifiersShape';


const productShape = basicProductDataShape
    .merge(priceAndAvailabilityShape)
    .merge(productCategoryShape)
    .merge(productIdentifiersShape)
    .refine(productIdentifierRefinement)
    .transform(basicProductDataTransform)
    .transform(priceAndAvailabilityTransform)
    .transform(productCategoryTransform)


export const feedXmlDocumentShape = z.object({
    rss: z.object({
        channel: z.object({
            item: z.array(z.record(z.string(), z.any())),
        }),
    }),
})

export const productsDataShape = z.array(productShape)

export type FeedXmlDocument = z.infer<typeof feedXmlDocumentShape>;

export type ProductDataShape = z.infer<typeof productsDataShape>;