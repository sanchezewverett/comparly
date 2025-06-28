'use client';
import React, { FC, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  MenuItem,
  Box,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFilters } from '@/hooks/useFilters';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery, useTheme } from '@mui/system';
import CategoriesNestingMenu from '@/components/filter/CategoriesNestingMenu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const FilterList: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const isUpMedium = useMediaQuery(theme.breakpoints.up('md'));
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: filters, isLoading: loadingFilters } = useFilters();

  const [formState, setFormState] = useState({
    name: searchParams.get('name') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleCategoryChange = (categoryId: number | undefined) => {
    setFormState((prev) => ({
      ...prev,
      category: categoryId ? categoryId.toString() : '',
    }));
  };

  return (
    <Box>
      <Accordion
        sx={{ height: 'fit-content' }}
        expanded={isExpanded || isUpMedium}
        onChange={() => setIsExpanded((prev) => !prev)}
      >
        <AccordionSummary expandIcon={isUpMedium ? null : <ExpandMoreIcon />}>
          <Typography variant="h5">Filtry</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack component="form" onSubmit={handleFilter} spacing={2}>
            <CategoriesNestingMenu
              handleCategoryChange={handleCategoryChange}
              defaultValue={formState.category}
            />
            <Stack direction="row" gap={1}>
              <TextField
                label="Cena od"
                name="minPrice"
                type="number"
                size="small"
                value={formState.minPrice}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Cena do"
                name="maxPrice"
                type="number"
                size="small"
                value={formState.maxPrice}
                onChange={handleInputChange}
                fullWidth
              />
            </Stack>
            <TextField
              select
              label="Producent"
              name="brand"
              size="small"
              value={formState.brand}
              onChange={handleInputChange}
              fullWidth
              disabled={loadingFilters}
            >
              <MenuItem value="">Wszystkie</MenuItem>
              {filters?.brands.map((option) => (
                <MenuItem key={option.brand} value={option.brand}>
                  {option.brand}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Szukaj
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterList;
