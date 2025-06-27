import { withValidation } from '@/lib/validation';

import { getPaginatedProducts } from './product.service';
import { getProductsSchema } from './product.schema';

export const GET = withValidation({ query: getProductsSchema }, async ({ query }) => {
  const products = await getPaginatedProducts(query);
  return Response.json(products);
});
