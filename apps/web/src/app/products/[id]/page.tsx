'use client';

import { useParams } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';
import { useProduct } from '@/hooks/useProduct';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography color="error">{'Nie znaleziono produktu.'}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{ display: 'flex', boxShadow: 0, flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          image={product.imageUrl || '/placeholder.png'}
          alt={product.name}
          sx={{ width: { xs: '100%', md: 350 }, height: 350, objectFit: 'scale-down' }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.category?.name}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Cena: {Number(product.price / 100).toFixed(2)} {product.currency}
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            {product.description || 'Brak opisu produktu.'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 2 }}
          >
            Zobacz w sklepie
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
