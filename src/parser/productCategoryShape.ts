import { z } from 'zod';
import categoriesIdentifiers from '@/parser/categories';

const productTypeShape = z.string().max(750, 'Product type must have at most 750 characters.')

export const productCategoryShape = z.object({
    google_product_category: z.enum(categoriesIdentifiers).optional(), //TODO categories as eng keys
    product_type: productTypeShape.or(z.array(productTypeShape)).optional(),
})

export const productCategoryTransform = <T extends z.infer<typeof productCategoryShape>, >({
    google_product_category,
    product_type,
    ...rest
}: T) => ({
    productType: product_type,
    googleProductCategory: google_product_category,
    ...rest,
})