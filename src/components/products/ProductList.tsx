'use client';

import { Grid } from '@mui/material';
import { Product } from '@/types/api/products.types';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <Grid container spacing={{ xs: 12, sm:6, md:3 }}>
      {products.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg:3 }}
          key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};