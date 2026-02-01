import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useModlists } from '@/hooks/useModlists';
import {
  useGalleryFilters,
  useFilteredModlists,
  useAvailableTags,
  useAvailableGames,
} from '@/hooks/useGalleryFilters';
import { ModlistGrid } from '@/components/modlist/ModlistGrid';
import { GalleryFilters } from '@/components/modlist/GalleryFilters';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { pageTransition } from '@/lib/animations';

interface GallerySearch {
  nsfw?: string;
  featured?: string;
  game?: string;
  tags?: string | string[];
}

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
  validateSearch: (search: Record<string, unknown>): GallerySearch => {
    return {
      nsfw: search.nsfw as string | undefined,
      featured: search.featured as string | undefined,
      game: search.game as string | undefined,
      tags: search.tags as string | string[] | undefined,
    };
  },
});

function GalleryPage() {
  const { data: modlists, isLoading, error } = useModlists();
  const {
    filters,
    nsfwChecked,
    featuredChecked,
    setNsfw,
    setFeatured,
    setGame,
    toggleTag,
  } = useGalleryFilters();

  const filteredModlists = useFilteredModlists(modlists, filters);
  const availableTags = useAvailableTags(filteredModlists);
  const availableGames = useAvailableGames(modlists);

  return (
    <motion.div
      className="px-1 md:p-8 flex-grow"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="font-semibold my-1 text-4xl text-center">Gallery</h1>

      <GalleryFilters
        nsfwChecked={nsfwChecked}
        featuredChecked={featuredChecked}
        selectedGame={filters.game}
        selectedTags={filters.tags}
        availableGames={availableGames}
        availableTags={availableTags}
        onNsfwChange={setNsfw}
        onFeaturedChange={setFeatured}
        onGameChange={setGame}
        onTagToggle={toggleTag}
      />

      {error && <ErrorDisplay message="Unable to load Modlists from GitHub!" />}

      {isLoading && <LoadingSpinner message="Loading Modlists..." />}

      {!isLoading && !error && filteredModlists.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No modlists match your current filters.
        </div>
      )}

      {!isLoading && !error && filteredModlists.length > 0 && (
        <div className="mt-4">
          <ModlistGrid modlists={filteredModlists} />
        </div>
      )}
    </motion.div>
  );
}
