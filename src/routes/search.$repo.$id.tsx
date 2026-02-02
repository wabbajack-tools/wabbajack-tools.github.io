import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
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

export const Route = createFileRoute('/search/$repo/$id')({
  component: ArchiveSearchPage,
});

function ArchiveSearchPage() {
  const { repo, id } = Route.useParams();
  const { data: status, isLoading, error } = useDetailedStatus(repo, id);
  const { data: modlist } = useModlist(repo, id);

  const [searchString, setSearchString] = useState('');

  const archives = useMemo(() => {
    if (!status?.Archives) return [];

    return status.Archives.map((va: ValidatedArchive) => va.Original)
      .filter((archive: Archive) => {
        if (!searchString.trim()) return true;
        const search = searchString.toLowerCase();
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
  }, [status, searchString]);

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
            {searchString.trim() ? (
              <>
                Found{' '}
                <span className="font-semibold text-text-primary">
                  {archives.length}
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
          <motion.div
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.01,
                },
              },
            }}
          >
            {archives.map((archive: Archive) => (
              <motion.div
                key={archive.Hash || archive.Name}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ModlistArchiveCard archive={archive} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}
