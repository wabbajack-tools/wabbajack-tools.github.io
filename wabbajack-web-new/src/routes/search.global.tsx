import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Search, Database, Eye, EyeOff } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useGlobalArchiveSearch, useFilteredArchives } from '@/hooks/useGlobalArchiveSearch';
import { useArchiveSearchFilters } from '@/hooks/useArchiveSearchFilters';
import { SearchLoadingProgress } from '@/components/search/SearchLoadingProgress';
import { GlobalSearchResults } from '@/components/search/GlobalSearchResults';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { pageTransition } from '@/lib/animations';

interface GlobalSearchParams {
  q?: string;
  nsfw?: string;
}

export const Route = createFileRoute('/search/global')({
  component: GlobalSearchPage,
  validateSearch: (search: Record<string, unknown>): GlobalSearchParams => {
    return {
      q: search.q as string | undefined,
      nsfw: search.nsfw as string | undefined,
    };
  },
});

function GlobalSearchPage() {
  const { allArchives, loadingState, isLoadingSummaries, error } = useGlobalArchiveSearch();
  const { filters, setQuery, setNsfw } = useArchiveSearchFilters();

  // Local state for debounced input
  const [inputValue, setInputValue] = useState(filters.q);

  // Sync input value with URL on mount
  useEffect(() => {
    setInputValue(filters.q);
  }, [filters.q]);

  // Debounce search query updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== filters.q) {
        setQuery(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, filters.q, setQuery]);

  // Filter archives based on search query
  const searchResults = useFilteredArchives(allArchives, filters.q, filters.nsfw);

  // Determine if we're still searching (loading and have a query)
  const isSearching = useMemo(() => {
    return !loadingState.isComplete && filters.q.trim().length > 0;
  }, [loadingState.isComplete, filters.q]);

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Database className="h-8 w-8 text-neon-cyan" />
            <h1 className="font-display font-bold text-4xl md:text-5xl gradient-text">
              Archive Search
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto mb-8"
          >
            Search for archives across all modlists. Find which modlists include specific mods, tools, or resources.
          </motion.p>

          {/* Search input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
              <Input
                type="text"
                placeholder="Search archives (e.g., SKSE, ENB, SkyUI)..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button
                variant={filters.nsfw ? 'default' : 'outline'}
                size="sm"
                onClick={() => setNsfw(!filters.nsfw)}
                className="gap-2"
              >
                {filters.nsfw ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                {filters.nsfw ? 'NSFW Shown' : 'NSFW Hidden'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Loading state for summaries */}
        {isLoadingSummaries && (
          <div className="mt-8">
            <LoadingSpinner message="Loading modlist index..." />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mt-8">
            <ErrorDisplay message="Unable to load modlist data. Please try again later." />
          </div>
        )}

        {/* Progress indicator */}
        {!isLoadingSummaries && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <SearchLoadingProgress loadingState={loadingState} />
          </motion.div>
        )}

        {/* Search results */}
        {!isLoadingSummaries && !error && (
          <GlobalSearchResults
            results={searchResults}
            query={filters.q}
            isSearching={isSearching}
          />
        )}
      </section>
    </motion.div>
  );
}
