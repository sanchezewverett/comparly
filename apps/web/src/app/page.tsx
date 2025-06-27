'use client';

import React, { useState, useEffect } from 'react';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { Container, CircularProgress, Pagination, Stack } from '@mui/material';
import { ProductList } from '@/components/products/ProductList';

import { useProducts } from '@/hooks/useProducts';
import FilterList from '@/components/filter/FilterList';
import { FilterFromState } from '@/app/model';
import { useMediaQuery, useTheme } from '@mui/system';

const parseSearchParams = (searchParams: ReadonlyURLSearchParams) => ({
  name: searchParams.get('name') || '',
  category: searchParams.get('category') || '',
  brand: searchParams.get('brand') || '',
  minPrice: searchParams.get('minPrice') || '',
  maxPrice: searchParams.get('maxPrice') || '',
  query: searchParams.get('query') || '',
});

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isUpMedium = useMediaQuery(theme.breakpoints.up('md'));
  const [filtersState, setFiltersState] = useState<FilterFromState>(() =>
    parseSearchParams(searchParams),
  );

  const page = parseInt(searchParams.get('page') || '1', 10);
  const { data, isLoading } = useProducts({
    page,
    ...filtersState,
    minPrice: filtersState.minPrice ? Number(filtersState.minPrice) : undefined,
    maxPrice: filtersState.maxPrice ? Number(filtersState.maxPrice) : undefined,
  });

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', value.toString());
    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    setFiltersState(() => parseSearchParams(searchParams));
  }, [searchParams]);

  return (
    <Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
      <Stack direction={isUpMedium ? 'row' : 'column'} spacing={4}>
        <FilterList onFilterConfirm={setFiltersState} />
        <Stack width="100%">
          {isLoading ? (
            <Stack justifyContent="center" mt={4}>
              <CircularProgress />
            </Stack>
          ) : data ? (
            <>
              <ProductList products={data.data} />
              {data.totalPages > 1 ? (
                <Stack mt="auto" pt={4} direction="row" justifyContent="center">
                  <Pagination
                    count={data?.totalPages}
                    page={data?.page}
                    onChange={handleChangePage}
                    color="primary"
                  />
                </Stack>
              ) : null}
            </>
          ) : null}
        </Stack>
      </Stack>
    </Container>
  );
}
