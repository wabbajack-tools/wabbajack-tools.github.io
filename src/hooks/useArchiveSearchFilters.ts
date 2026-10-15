import { useCallback } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';

interface ArchiveSearchFilters {
  q: string;
  nsfw: boolean;
}

export function useArchiveSearchFilters() {
  const search = useSearch({ from: '/search/global' });
  const navigate = useNavigate();

  const filters: ArchiveSearchFilters = {
    q: search.q == null ? '' : String(search.q),
    nsfw: String(search.nsfw) === 'true',
  };

  const setFilters = useCallback(
    (newFilters: Partial<ArchiveSearchFilters>) => {
      navigate({
        to: '/search/global',
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          ...Object.fromEntries(
            Object.entries(newFilters).map(([key, value]) => [
              key,
              typeof value === 'boolean' ? (value ? 'true' : undefined) : value || undefined,
            ])
          ),
        }),
        replace: true,
      });
    },
    [navigate]
  );

  const setQuery = useCallback(
    (q: string) => setFilters({ q }),
    [setFilters]
  );

  const setNsfw = useCallback(
    (nsfw: boolean) => setFilters({ nsfw }),
    [setFilters]
  );

  return {
    filters,
    setQuery,
    setNsfw,
    setFilters,
  };
}
