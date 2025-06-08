'use client';

import { Grid } from '@mui/material';
import { Product } from '@/types/api/product.types';
import { ProductCard } from './ProductCard';

type Props = {
    products: Product[];
};

export const ProductList = ({ products }: Props) => {
    return (
        <Grid container spacing={3} alignItems={'center'}>
            {products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                      key={product.id}
                      sx={{ minWidth: 240 }}>
                    <ProductCard product={product}/>
                </Grid>
            ))}
        </Grid>
    );
};