import { useMemo, useCallback } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import type { ModlistMetadata } from '@/types';
import { getGameDisplayName } from '@/types/game';

/**
 * URL value of the NSFW and Featured filters.
 * nsfw:     'false' = hidden (default), 'true' = exclusively, 'indeterminate' = included.
 * featured: 'indeterminate' = included (default), 'true' = exclusively, 'false' = hidden.
 */
export type TriState = 'true' | 'false' | 'indeterminate';

interface GalleryFilters {
  nsfw: TriState;
  featured: TriState;
  game: string;
  tags: string[];
  search: string;
}

export const DEFAULT_NSFW: TriState = 'false';
export const DEFAULT_FEATURED: TriState = 'indeterminate';

/**
 * TanStack Router JSON-parses each query value, so a hand-written or shared URL such as
 * `?nsfw=true&search=2077` arrives as a boolean / number rather than the strings the app writes
 * (the router quotes those as `%22true%22`). Normalise everything back to strings.
 */
function asString(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return undefined;
}

function asTriState(value: unknown, fallback: TriState): TriState {
  const s = asString(value);
  return s === 'true' || s === 'false' || s === 'indeterminate' ? s : fallback;
}

function asTags(value: unknown): string[] | undefined {
  const list = (Array.isArray(value) ? value : [value]).map(asString).filter((t): t is string => !!t);
  return list.length ? list : undefined;
}

/** The /gallery query params, as written by setFilters below. */
export interface GallerySearch {
  nsfw?: TriState;
  featured?: TriState;
  game?: string;
  tags?: string[];
  search?: string;
}

/** validateSearch for the /gallery route: accepts both app-written and hand-written URLs. */
export function parseGallerySearch(search: Record<string, unknown>): GallerySearch {
  const nsfw = asString(search.nsfw);
  const featured = asString(search.featured);
  return {
    nsfw: nsfw ? asTriState(nsfw, DEFAULT_NSFW) : undefined,
    featured: featured ? asTriState(featured, DEFAULT_FEATURED) : undefined,
    game: asString(search.game),
    tags: asTags(search.tags),
    search: asString(search.search),
  };
}

export function useGalleryFilters() {
  const search = useSearch({ from: '/gallery' });
  const navigate = useNavigate();

  const { nsfw, featured, game, tags, search: text } = search;
  const filters: GalleryFilters = useMemo(
    () => ({
      nsfw: nsfw ?? DEFAULT_NSFW,
      featured: featured ?? DEFAULT_FEATURED,
      game: game || 'all',
      tags: tags ?? [],
      search: text || '',
    }),
    [nsfw, featured, game, tags, text]
  );

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

  const setNsfw = useCallback((value: TriState) => setFilters({ nsfw: value }), [setFilters]);

  const setFeatured = useCallback(
    (value: TriState) => setFilters({ featured: value }),
    [setFilters]
  );

  const setGame = useCallback((game: string) => setFilters({ game }), [setFilters]);

  const toggleTag = useCallback(
    (tag: string) => {
      const currentTags = filters.tags;
      const selected = currentTags.some((t) => t.toLowerCase() === tag.toLowerCase());
      const newTags = selected
        ? currentTags.filter((t) => t.toLowerCase() !== tag.toLowerCase())
        : [...currentTags, tag];
      setFilters({ tags: newTags });
    },
    [filters.tags, setFilters]
  );

  const clearTags = useCallback(() => setFilters({ tags: [] }), [setFilters]);

  const setSearch = useCallback(
    (searchText: string) => setFilters({ search: searchText || undefined }),
    [setFilters]
  );

  const resetFilters = useCallback(() => {
    navigate({ to: '/gallery', search: {}, replace: true });
  }, [navigate]);

  /** Number of filters that differ from their defaults (search, game, each tag, nsfw, featured). */
  const activeCount =
    (filters.search ? 1 : 0) +
    (filters.game !== 'all' ? 1 : 0) +
    filters.tags.length +
    (filters.nsfw !== DEFAULT_NSFW ? 1 : 0) +
    (filters.featured !== DEFAULT_FEATURED ? 1 : 0);

  return {
    filters,
    activeCount,
    setNsfw,
    setFeatured,
    setGame,
    toggleTag,
    clearTags,
    setSearch,
    resetFilters,
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
