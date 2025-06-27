import { z } from 'zod';
import categoriesIdentifiers from './categoryIdentifiers';
import { categoriesPL } from './categoriesPL';

export const productCategoryShape = z.object({
    google_product_category: z.string().optional(),
    product_type: z
        .string()
        .max(750, 'Product type must have at most 750 characters.'),
});


export const productCategoryTransform = <
    T extends z.infer<typeof productCategoryShape>
>({ google_product_category, product_type, ...rest }: T) => {
    let googleProductCategory: null | number = null

    if (google_product_category) {
        const categoryById = categoriesIdentifiers.find(identifier => identifier === google_product_category)

        if (categoryById) {
            googleProductCategory = Number(categoryById)
        } else {
            googleProductCategory = findCategoryIdByName(google_product_category)
        }
    }

    return {
        internalProductCategory: product_type,
        googleProductCategory,
        ...rest,
    }
};

const findCategoryIdByName = (name: string) => {
    const nameWithDecodedGtSign = name.replace(/&gt;/g, '>')
    return categoriesPL[nameWithDecodedGtSign]
}

