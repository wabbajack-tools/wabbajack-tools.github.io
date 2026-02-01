import { motion } from 'framer-motion';
import { Search, FileArchive } from 'lucide-react';
import { ArchiveResultCard } from './ArchiveResultCard';
import type { GlobalArchiveResult } from '@/types/search';

interface GlobalSearchResultsProps {
  results: GlobalArchiveResult[];
  query: string;
  isSearching: boolean;
}

export function GlobalSearchResults({ results, query, isSearching }: GlobalSearchResultsProps) {
  if (!query.trim()) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface/60 border border-neon-purple/20 mb-4">
          <Search className="h-10 w-10 text-text-muted" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Search for archives
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          Enter a search term to find archives across all modlists. Use commas to find modlists with multiple archives (e.g., &quot;SKSE, SkyUI&quot;).
        </p>
      </motion.div>
    );
  }

  if (results.length === 0 && !isSearching) {
    return (
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
          No archives match &quot;{query}&quot;. Try a different search term.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-secondary">
          Found{' '}
          <span className="font-semibold text-text-primary">
            {results.length}
          </span>
          {results.length === 500 && '+'} unique archives
        </p>
      </div>

      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.02,
            },
          },
        }}
      >
        {results.map((result) => (
          <motion.div
            key={result.archive.Hash}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ArchiveResultCard result={result} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
