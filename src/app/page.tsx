'use client';

import { ProductList } from '@/components/products/ProductList';
import { useProducts } from '@/hooks/useProducts';
import { Container, CircularProgress, Box, Pagination, Typography, Stack } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category') || "";
  const name = searchParams.get('name') || "";

  const { data, isLoading, isError } = useProducts({page, category, name});

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/?page=${value}`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error" mt={4}>
          Nie udało się załadować produktów.
        </Typography>
      </Container>
    );
  }

  if (data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ProductList products={data.data} />
        <Stack mt={4} direction="row" justifyContent="center">
          <Pagination
            count={data.totalPages}
            page={data.page}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
      </Container>
    );
  }
}