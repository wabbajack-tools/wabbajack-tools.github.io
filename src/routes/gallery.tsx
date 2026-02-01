import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Grid3X3, Sparkles } from 'lucide-react';
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
      className="flex-grow"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Grid3X3 className="h-8 w-8 text-neon-purple" />
            <h1 className="font-display font-bold text-4xl md:text-5xl gradient-text">
              Modlist Gallery
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Browse our collection of curated modlists for your favorite games
          </motion.p>

          {!isLoading && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/60 backdrop-blur-sm border border-neon-purple/20"
            >
              <Sparkles className="h-4 w-4 text-neon-purple" />
              <span className="text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">{filteredModlists.length}</span> modlists available
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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

        {error && (
          <div className="mt-8">
            <ErrorDisplay message="Unable to load Modlists from GitHub!" />
          </div>
        )}

        {isLoading && (
          <div className="mt-8">
            <LoadingSpinner message="Loading Modlists..." />
          </div>
        )}

        {!isLoading && !error && filteredModlists.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface/60 border border-neon-purple/20 mb-4">
              <Grid3X3 className="h-10 w-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No modlists found
            </h3>
            <p className="text-text-secondary">
              Try adjusting your filters to see more results
            </p>
          </motion.div>
        )}

        {!isLoading && !error && filteredModlists.length > 0 && (
          <div className="mt-8">
            <ModlistGrid modlists={filteredModlists} />
          </div>
        )}
      </section>
    </motion.div>
  );
}
