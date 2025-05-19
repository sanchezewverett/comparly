import { getProducts, getProductById } from "./product.repository";
import { GetProductsQuery } from "./product.schema";

export const getPaginatedProducts = async ({
  page,
  pageSize,
  name,
  category,
  minPrice,
  maxPrice,
  brand,
}: GetProductsQuery) => {
  return getProducts({
    page,
    pageSize,
    name,
    category,
    minPrice,
    maxPrice,
    brand,
  });
};

export const fetchProductDetails = async (id: number) => {
  const product = await getProductById(id);
  if (!product) throw new Error("Product not found");
  return product;
};
