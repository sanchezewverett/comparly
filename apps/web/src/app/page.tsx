'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Container,
    CircularProgress,
    Pagination,
    Stack,
} from '@mui/material';
import { ProductList } from '@/components/products/ProductList';

import { useProducts } from '@/hooks/useProducts';
import FilterList from '@/components/filter/FilterList';
import { FilterFromState } from '@/app/model';
import { useMediaQuery, useTheme } from '@mui/system';


export default function HomePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const theme = useTheme();
    const isUpMedium = useMediaQuery(theme.breakpoints.up('md'));
    const [filtersState, setFiltersState] = useState<FilterFromState>({});

    const page = parseInt(searchParams.get('page') || '1', 10);
    const { data, isLoading } = useProducts({
        page,
        ...filtersState,
        minPrice: filtersState.minPrice ? Number(filtersState.minPrice) : undefined,
        maxPrice: filtersState.maxPrice ? Number(filtersState.maxPrice) : undefined,
    });

    const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
        router.push(`/?page=${value}`);
    };

    return (
        <Container maxWidth='xl' sx={{ py: 4, flexGrow: 1 }}>
            <Stack direction={isUpMedium ? 'row' : 'column'} spacing={4}>
                <FilterList onFilterConfirm={setFiltersState}/>
                <Stack width='100%'>
                    {isLoading ? (
                        <Stack justifyContent='center' mt={4}>
                            <CircularProgress/>
                        </Stack>
                    ) : data ? (
                        <>
                            <ProductList products={data.data}/>
                            <Stack mt={4} direction='row' justifyContent='center'>
                                <Pagination
                                    count={data?.totalPages}
                                    page={data?.page}
                                    onChange={handleChangePage}
                                    color='primary'
                                />
                            </Stack>
                        </>
                    ) : null}
                </Stack>
            </Stack>
        </Container>
    );
}