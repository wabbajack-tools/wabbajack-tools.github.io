import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, FileArchive, Database } from 'lucide-react';
import { useDetailedStatus } from '@/hooks/useModlistStatus';
import { useModlist } from '@/hooks/useModlists';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ModlistArchiveCard } from '@/components/search/ModlistArchiveCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { pageTransition } from '@/lib/animations';
import type { Archive, ValidatedArchive } from '@/types';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export const Route = createFileRoute('/search/$repo/$id')({
  component: ArchiveSearchPage,
});

function ArchiveSearchPage() {
  const { repo, id } = Route.useParams();
  const { data: status, isLoading, error } = useDetailedStatus(repo, id);
  const { data: modlist } = useModlist(repo, id);

  const [searchString, setSearchString] = useState('');
  const debouncedSearch = useDebounce(searchString, 200);

  const parentRef = useRef<HTMLDivElement>(null);

  const archives = useMemo(() => {
    if (!status?.Archives) return [];

    return status.Archives.map((va: ValidatedArchive) => va.Original)
      .filter((archive: Archive) => {
        if (!debouncedSearch.trim()) return true;
        const search = debouncedSearch.toLowerCase();
        const stateName = archive.State?.Name || '';
        const author = (archive.State as { Author?: string })?.Author || '';
        const description = (archive.State as { Description?: string })?.Description || '';
        return (
          archive.Name.toLowerCase().includes(search) ||
          stateName.toLowerCase().includes(search) ||
          author.toLowerCase().includes(search) ||
          description.toLowerCase().includes(search)
        );
      })
      .sort((a: Archive, b: Archive) => a.Name.localeCompare(b.Name));
  }, [status, debouncedSearch]);

  // TanStack Virtual's `useVirtualizer` returns functions that are not safely memoizable by the React Compiler.
  // This is a known incompatibility where the compiler skips memoization for this component to prevent stale UIs.
  // We ignore this warning as the virtualization logic remains functional and stable without compiler-driven memoization.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: archives.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 10,
  });

  const totalArchives = status?.Archives?.length || 0;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message={`Error loading archives for ${repo}/${id}`} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <LoadingSpinner message="Loading archives..." />
      </div>
    );
  }

  if (status?.Status === 'ForcedDown') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message="Modlist has been forced down. Archives are not available." />
      </div>
    );
  }

  if (!status) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message={`Could not find archives for ${repo}/${id}`} />
      </div>
    );
  }

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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6"
          >
            <Link to="/modlist/$repo/$id" params={{ repo, id }}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {modlist?.title || status.Name}
            </Link>
          </Button>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Database className="h-8 w-8 text-neon-purple" />
              <h1 className="font-display font-bold text-4xl md:text-5xl gradient-text">
                Archive Search
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary mb-2"
            >
              {modlist?.title || status.Name}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-text-muted"
            >
              Search through {totalArchives.toLocaleString()} archives in this modlist
            </motion.p>

            {/* Search input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                <Input
                  type="text"
                  placeholder="Search by name, author, or description..."
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-text-secondary">
            {debouncedSearch.trim() ? (
              <>
                Found{' '}
                <span className="font-semibold text-text-primary">
                  {archives.length.toLocaleString()}
                </span>{' '}
                of {totalArchives.toLocaleString()} archives
              </>
            ) : (
              <>
                Showing all{' '}
                <span className="font-semibold text-text-primary">
                  {totalArchives.toLocaleString()}
                </span>{' '}
                archives
              </>
            )}
          </p>
        </div>

        {/* Archive cards */}
        {archives.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface/60 border border-neon-purple/20 mb-4">
              <FileArchive className="h-10 w-10 text-text-muted" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No archives found
            </h3>
            <p className="text-text-secondary">
              No archives match &quot;{searchString}&quot;
            </p>
          </motion.div>
        ) : (
          <div
            ref={parentRef}
            className="h-[600px] overflow-auto rounded-lg"
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const archive = archives[virtualItem.index];
                return (
                  <div
                    key={virtualItem.key}
                    data-index={virtualItem.index}
                    ref={virtualizer.measureElement}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                    className="pb-3"
                  >
                    <ModlistArchiveCard archive={archive} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
}
