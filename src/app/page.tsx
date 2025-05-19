'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Container, CircularProgress, Box, Pagination, Typography, Stack, TextField, MenuItem, Button } from '@mui/material';
import { ProductList } from '@/components/products/ProductList';

import { useProducts } from '@/hooks/useProducts';
import { useFilters } from '@/hooks/useFilters';



export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: filters, isLoading: loadingFilters } = useFilters();

  const [formState, setFormState] = useState({
    name: searchParams.get('name') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  const [filtersState, setFiltersState] = useState(formState);
    
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isError } = useProducts({
    page,
    ...filtersState,
    minPrice: filtersState.minPrice ? Number(filtersState.minPrice) : undefined,
    maxPrice: filtersState.maxPrice ? Number(filtersState.maxPrice) : undefined,
  });

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/?page=${value}`);
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setFiltersState(formState);
    const params = new URLSearchParams();
    params.set('page', '1');
      Object.entries(formState).forEach(([key, value]) => {
        if (value) params.set(key, value);
    });

    router.push(`/?${params.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" spacing={4} alignItems="flex-start">
        <Box component="form" onSubmit={handleFilter} sx={{ minWidth: 300, maxWidth:300 }}>
          <Typography variant="h6" gutterBottom>Filtry</Typography>
          <TextField
            select
            label="Kategoria"
            name='category'
            value={formState.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={loadingFilters}
          >
            <MenuItem value="">Wszystkie</MenuItem>
            {filters?.categories.map(option => (
              <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={2} sx={{py:1}}>
            <TextField
            label="Cena od"
            name='minPrice'
            type="number"
            value={formState.minPrice}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cena do"
            name='maxPrice'
            type="number"
            value={formState.maxPrice}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          </Stack>
          <TextField
            select
            label="Producent"
            name='brand'
            value={formState.brand}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={loadingFilters}
          >
            <MenuItem value="">Wszystkie</MenuItem>
            {filters?.brands.map(option => (
              <MenuItem key={option.brand} value={option.brand}>{option.brand}</MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Szukaj
          </Button>
        </Box>

        <Stack>
          {isLoading ? (
            <Stack  justifyContent="center" mt={4}>
              <CircularProgress />
            </Stack>
          ) : isError ? (
            <Typography color="error" mt={4}>
              Nie udało się załadować produktów.
            </Typography>
          ) : data ? (
            <>
              <ProductList products={data.data} />
              <Stack mt={4} direction="row" justifyContent="center">
                <Pagination
                  count={data.totalPages}
                  page={data.page}
                  onChange={handleChangePage}
                  color="primary"
                />
              </Stack>
            </>
          ) : null}
        </Stack>
      </Stack>
    </Container>
  );
}