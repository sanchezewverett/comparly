'use client';

import React, { useState, useMemo } from 'react';
import { Button, debounce, IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import AppLogo from '@/components/AppLogo';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useMediaQuery, useTheme } from '@mui/system';
import { useRouter, useSearchParams } from 'next/navigation';
import { LICENSE_QUESTION_URL } from '@/constant';

const Header = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const theme = useTheme();
    const isUpMedium = useMediaQuery(theme.breakpoints.up('md'));
    const isUpSmall = useMediaQuery(theme.breakpoints.up('sm'));

    const setParamsDebounced = useMemo(() => debounce((productQuery: string) => {
        const params = new URLSearchParams();

        searchParams.entries().forEach(([key, value]) => {
            params.append(key, value);
        })
        params.set('query', productQuery);

        router.push(`/?${params.toString()}`);
    }, 500), [searchParams, router])

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setParamsDebounced(event.target.value);
    }

    const searchInputWidth = useMemo(() => {
        return isUpSmall ? isUpMedium ? '400px' : '300px' : undefined
    }, [isUpSmall, isUpMedium]);

    return (
        <Stack
            component='header'
            bgcolor='white'
            paddingInline={3}
            paddingBlock={2}
            boxShadow={1}
            flexDirection={isUpSmall ? 'row' : 'column'}
            alignItems='center'
            justifyContent='center'
            position='sticky'
            top='0'
            zIndex={1000}
            spacing={isUpSmall ? 0 : 2}
        >
            <AppLogo/>
            <Stack
                direction='row'
                justifyContent={isUpSmall ? 'flex-end' : 'center'}
                spacing={2}
                maxWidth='lg'
                width='100%'
            >
                <TextField
                    label='Wyszukaj produkt'
                    size='small'
                    value={query}
                    onChange={handleQueryChange}
                    variant='outlined'
                    fullWidth={!isUpSmall}
                    sx={{ width: searchInputWidth }}
                    slotProps={{ input: { endAdornment: <SearchIcon/> } }}/>
                {isUpMedium ?
                    <Button
                        target='_blank'
                        href={LICENSE_QUESTION_URL}
                        startIcon={<AddBusinessIcon/>}
                        variant='contained'>
                        Dodaj swój sklep
                    </Button>
                    : <IconButton
                        color='primary'
                        target='_blank'
                        href={LICENSE_QUESTION_URL}
                    >
                        <AddBusinessIcon/>
                    </IconButton>
                }
            </Stack>
        </Stack>
    );
};

export default Header;