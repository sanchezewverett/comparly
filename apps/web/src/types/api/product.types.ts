export interface ProductsResponse {
  data: Product[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface Product {
  id: number;
  clientId: number;
  externalId: string;
  name: string;
  categoryId: number;
  description: string;
  price: number;
  currency: string;
  brand: string;
  imageUrl: string;
  productUrl: string;
  availability: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
}
