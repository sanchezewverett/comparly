'use client';

import { Product } from '@/types/api/product.types';
import { Card, CardContent, Typography, CardMedia, Box, Button } from '@mui/material';
import Link from 'next/link';

type Props = {
  product: Product;
};

const DEFAULT_IMAGE = './placeholder.png';

export const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        variant="outlined"
        sx={{
          height: 350,
          '&:hover': {
            boxShadow: 4,
          },
        }}
      >
        <CardMedia
          component="img"
          image={product.imageUrl || DEFAULT_IMAGE}
          alt={product.name}
          sx={{ height: 160, objectFit: 'scale-down' }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={product.name}
            >
              {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" noWrap>
              {product.category?.name}
            </Typography>
          </Box>

          <Typography variant="body1" fontWeight="medium" mt={2}>
            {Number(product.price / 100).toFixed(2)} {product.currency}
          </Typography>
        </CardContent>

        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            fullWidth
            onClick={(e) => e.stopPropagation()}
          >
            Zobacz w sklepie
          </Button>
        </Box>
      </Card>
    </Link>
  );
};
