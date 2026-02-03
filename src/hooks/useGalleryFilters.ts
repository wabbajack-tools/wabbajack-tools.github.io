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
    featured: (search.featured as TriState) || 'false',
    game: search.game || 'all',
    tags: search.tags ? (Array.isArray(search.tags) ? search.tags : [search.tags]) : [],
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

  return {
    filters,
    nsfwChecked: triStateToChecked(filters.nsfw),
    featuredChecked: triStateToChecked(filters.featured),
    setNsfw,
    setFeatured,
    setGame,
    toggleTag,
    setFilters,
  };
}

export function useFilteredModlists(
  modlists: ModlistMetadata[] | undefined,
  filters: GalleryFilters
) {
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
          case 'false': // All lists
            return true;
          case 'true': // Featured only
            return m.official;
          case 'indeterminate': // Non-featured only
            return !m.official;
          default:
            return true;
        }
      })
      .filter((m) => {
        // Game filter
        if (filters.game === 'all') return true;
        return m.game.toLowerCase() === filters.game.toLowerCase();
      })
      .filter((m) => {
        // Tags filter
        if (filters.tags.length === 0) return true;
        return filters.tags.every((tag) =>
          m.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
        );
      });
  }, [modlists, filters]);
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

export function useAvailableGames(modlists: ModlistMetadata[] | undefined) {
  return useMemo(() => {
    if (!modlists) return [];

    const games = new Set(modlists.map((m) => m.game.toLowerCase()));
    // Sort alphabetically by display name
    return [...games].sort((a, b) =>
      getGameDisplayName(a).localeCompare(getGameDisplayName(b))
    );
  }, [modlists]);
}
