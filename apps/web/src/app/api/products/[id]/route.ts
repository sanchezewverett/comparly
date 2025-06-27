import { withValidation } from '@/lib/validation';

import { fetchProductDetails } from '../product.service';
import { getProductDetailsSchema } from '../product.schema';

export const GET = withValidation({ params: getProductDetailsSchema }, async ({ params }) => {
  try {
    const product = await fetchProductDetails(params.id);
    return Response.json(product);
  } catch (e) {
    console.error(e);
    return new Response('Product not found', { status: 404 });
  }
});
