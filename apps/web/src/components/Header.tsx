'use client';

import React, { useState, useMemo } from 'react';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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

  const handleSearch = () => {
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });
    params.set('name', query);
    router.push(`/?${params.toString()}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const searchInputWidth = useMemo(() => {
    return isUpSmall ? (isUpMedium ? '400px' : '300px') : undefined;
  }, [isUpSmall, isUpMedium]);

  return (
    <Stack
      component="header"
      bgcolor="white"
      paddingInline={3}
      paddingBlock={2}
      boxShadow={1}
      flexDirection={isUpSmall ? 'row' : 'column'}
      alignItems="center"
      justifyContent="center"
      position="sticky"
      top="0"
      zIndex={1000}
      spacing={isUpSmall ? 0 : 2}
    >
      <AppLogo />
      <Stack
        direction="row"
        justifyContent={isUpSmall ? 'flex-end' : 'center'}
        spacing={2}
        maxWidth="lg"
        width="100%"
      >
        <TextField
          label="Wyszukaj produkt"
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          fullWidth={!isUpSmall}
          sx={{ width: searchInputWidth }}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={handleSearch} edge="end">
                  <SearchIcon />
                </IconButton>
              ),
            },
          }}
        />
        {isUpMedium ? (
          <Button
            target="_blank"
            href={LICENSE_QUESTION_URL}
            startIcon={<AddBusinessIcon />}
            variant="contained"
          >
            Dodaj swój sklep
          </Button>
        ) : (
          <IconButton color="primary" target="_blank" href={LICENSE_QUESTION_URL}>
            <AddBusinessIcon />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
