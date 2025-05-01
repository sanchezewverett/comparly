import { z } from 'zod';

const basicProductDataShape = z.object({
    id: z.string().max(50, 'Product id must be at most 50 characters.'),
    title: z.string().min(1, 'Product title must be at least 1 character.').max(150, 'Product title must be at most 50 characters.'), //TODO title spec
    description: z.string().max(50, 'Product description must be at most 50 characters.'), // TODO structured
    link: z.string().url(),
    image_link: z.string().url(),
})

const priceAndAvailabilityShape = z.object({
    availability: z.enum(['id_stock', 'out_of_stock', 'preorder', 'backorder']),
    availability_date: z.string().datetime().optional(), //TODO required if  preorder
    price: z.string(), //TODO price validaotr
})

const productCategoryShape = z.object({
    google_product_category: z.string(), //TODO check against known categories
    product_type: z.string(), //
})

const productIdentifiersShape = z.object({
    brand: z.string().min(1, 'Brand must be a least 1 character.').max(70, 'Brand must be at most 70 characters.'),
    gtin: z.number().optional(), //TODO kilka formatow
    mpn: z.union([z.string().max(70, 'Mnp must be at most 70 characters'), z.number()]).optional(), //TODO required if no gtin
})

const productShape = z.union([basicProductDataShape, priceAndAvailabilityShape, productCategoryShape, productIdentifiersShape])

export const feedXmlDataShape = z.object({
    '?xml': z.any(),
    rss: z.object({
        channel: z.object({
            item: z.array(productShape),
        }),
    }),
})