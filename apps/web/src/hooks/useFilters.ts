'use client';

import { Filters } from '@/types/api/filter.types';
import { useQuery } from '@tanstack/react-query';

async function fetchFilters(): Promise<Filters> {
  const res = await fetch('/api/filters');
  if (!res.ok) throw new Error('Nie udało się pobrać kategorii');
  const { data } = await res.json();
  return data;
}

export function useFilters() {
  return useQuery<Filters, Error>({
    queryKey: ['filters'],
    queryFn: fetchFilters,
    staleTime: 1000 * 60 * 10,
  });
}
