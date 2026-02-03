import { useMemo, useCallback } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import type { ModlistMetadata } from '@/types';
import type { CheckedState } from '@/components/ui/checkbox';
import { getGameDisplayName } from '@/types/game';

export type TriState = 'true' | 'false' | 'indeterminate';

interface GalleryFilters {
  nsfw: TriState;
  featured: TriState;
  game: string;
  tags: string[];
  search: string;
}

function triStateToChecked(state: TriState): CheckedState {
  if (state === 'true') return true;
  if (state === 'false') return false;
  return 'indeterminate';
}

function checkedToTriState(checked: CheckedState): TriState {
  if (checked === true) return 'true';
  if (checked === false) return 'false';
  return 'indeterminate';
}

export function useGalleryFilters() {
  const search = useSearch({ from: '/gallery' });
  const navigate = useNavigate();

  const filters: GalleryFilters = {
    nsfw: (search.nsfw as TriState) || 'false',
    featured: (search.featured as TriState) || 'indeterminate',
    game: search.game || 'all',
    tags: search.tags ? (Array.isArray(search.tags) ? search.tags : [search.tags]) : [],
    search: (search.search as string) || '',
  };

  const setFilters = useCallback(
    (newFilters: Partial<GalleryFilters>) => {
      navigate({
        to: '/gallery',
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          ...newFilters,
        }),
        replace: true,
      });
    },
    [navigate]
  );

  const setNsfw = useCallback(
    (checked: CheckedState) => setFilters({ nsfw: checkedToTriState(checked) }),
    [setFilters]
  );

  const setFeatured = useCallback(
    (checked: CheckedState) => setFilters({ featured: checkedToTriState(checked) }),
    [setFilters]
  );

  const setGame = useCallback(
    (game: string) => setFilters({ game }),
    [setFilters]
  );

  const toggleTag = useCallback(
    (tag: string) => {
      const currentTags = filters.tags;
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag];
      setFilters({ tags: newTags });
    },
    [filters.tags, setFilters]
  );

  const setSearch = useCallback(
    (searchText: string) => setFilters({ search: searchText || undefined }),
    [setFilters]
  );

  return {
    filters,
    nsfwChecked: triStateToChecked(filters.nsfw),
    featuredChecked: triStateToChecked(filters.featured),
    setNsfw,
    setFeatured,
    setGame,
    toggleTag,
    setSearch,
    setFilters,
  };
}

interface FilterOptions {
  skipGameFilter?: boolean;
}

export function useFilteredModlists(
  modlists: ModlistMetadata[] | undefined,
  filters: GalleryFilters,
  options: FilterOptions = {}
) {
  const { skipGameFilter = false } = options;

  return useMemo(() => {
    if (!modlists) return [];

    return modlists
      .filter((m) => !m.force_down)
      .filter((m) => {
        // NSFW filter
        switch (filters.nsfw) {
          case 'false': // Hide NSFW
            return !m.nsfw;
          case 'true': // Only NSFW
            return m.nsfw;
          case 'indeterminate': // Include NSFW (Both)
            return true;
          default:
            return !m.nsfw;
        }
      })
      .filter((m) => {
        // Featured filter
        switch (filters.featured) {
          case 'indeterminate': // All lists
            return true;
          case 'true': // Featured only
            return m.official;
          case 'false': // Non-featured only
            return !m.official;
          default:
            return true;
        }
      })
      .filter((m) => {
        // Game filter (can be skipped for counting purposes)
        if (skipGameFilter) return true;
        if (filters.game === 'all') return true;
        return m.game.toLowerCase() === filters.game.toLowerCase();
      })
      .filter((m) => {
        // Tags filter
        if (filters.tags.length === 0) return true;
        return filters.tags.every((tag) =>
          m.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
        );
      })
      .filter((m) => {
        // Text search filter
        if (!filters.search) return true;
        const searchLower = filters.search.toLowerCase();
        return (
          m.title.toLowerCase().includes(searchLower) ||
          m.description.toLowerCase().includes(searchLower) ||
          m.author?.toLowerCase().includes(searchLower) ||
          m.tags?.some((t) => t.toLowerCase().includes(searchLower))
        );
      });
  }, [modlists, filters, skipGameFilter]);
}

export function useAvailableTags(modlists: ModlistMetadata[] | undefined) {
  return useMemo(() => {
    if (!modlists) return new Map<string, number>();

    const tagCounts = new Map<string, number>();

    modlists.forEach((m) => {
      m.tags?.forEach((tag) => {
        const normalizedTag = tag.toLowerCase();
        tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
      });
    });

    // Sort by count descending, then alphabetically
    return new Map(
      [...tagCounts.entries()].sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
      })
    );
  }, [modlists]);
}

export interface GameWithCount {
  gameId: string;
  count: number;
}

export function useAvailableGames(modlists: ModlistMetadata[]): GameWithCount[] {
  return useMemo(() => {
    if (!modlists || modlists.length === 0) return [];

    // Use case-insensitive deduplication (list should already be filtered)
    const gameMap = new Map<string, { canonicalId: string; count: number }>();

    modlists.forEach((m) => {
      const normalizedKey = m.game.toLowerCase();
      const existing = gameMap.get(normalizedKey);

      if (existing) {
        existing.count += 1;
      } else {
        gameMap.set(normalizedKey, { canonicalId: m.game, count: 1 });
      }
    });

    return [...gameMap.values()]
      .map(({ canonicalId, count }) => ({ gameId: canonicalId, count }))
      .sort((a, b) =>
        getGameDisplayName(a.gameId).localeCompare(getGameDisplayName(b.gameId))
      );
  }, [modlists]);
}
