import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, FileArchive, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { isNexusArchive } from '@/types/search';
import type { ModlistWithMatchedArchives } from '@/hooks/useGlobalArchiveSearch';
import type { Archive } from '@/types';

interface MultiArchiveResultsProps {
  results: ModlistWithMatchedArchives[];
  searchTerms: string[];
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function ArchivePreview({ archive }: { archive: Archive }) {
  const state = archive.State;
  const isNexus = isNexusArchive(state);
  const imageUrl = isNexus ? state.ImageURL : undefined;
  const [imageError, setImageError] = useState(false);
  const hasImage = imageUrl && !imageError;

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-void/30 border border-neon-purple/10">
      {hasImage ? (
        <div className="flex-shrink-0 w-12 aspect-video rounded overflow-hidden border border-neon-purple/20 bg-void/50">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="flex-shrink-0 w-8 h-8 rounded bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
          <FileArchive className="h-4 w-4 text-neon-purple" />
        </div>
      )}
      <div className="flex-grow min-w-0">
        <p className="text-sm text-text-primary truncate">{archive.Name}</p>
        {state?.Name && state.Name !== archive.Name && (
          <p className="text-xs text-text-muted truncate">{state.Name}</p>
        )}
      </div>
      <span className="text-xs text-text-muted">{formatSize(archive.Size)}</span>
    </div>
  );
}

function ModlistResultCard({ result, searchTerms }: { result: ModlistWithMatchedArchives; searchTerms: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const { modlist, matchedArchives } = result;

  const totalMatches = Array.from(matchedArchives.values()).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div className="rounded-xl bg-surface/60 backdrop-blur-sm border border-neon-purple/10 overflow-hidden transition-all duration-300 hover:border-neon-purple/30">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-4 text-left hover:bg-surface-light/50 transition-colors"
      >
        <div className="flex-shrink-0 text-neon-purple">
          {expanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>

        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-text-primary truncate">
            {modlist.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {searchTerms.map((term) => {
              const count = matchedArchives.get(term)?.length || 0;
              return (
                <Badge key={term} variant="secondary" className="text-xs">
                  {term}: {count}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2 text-sm text-text-muted">
          <Layers className="h-4 w-4" />
          <span>{totalMatches} matches</span>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-neon-purple/10"
        >
          <div className="p-4 space-y-4">
            {searchTerms.map((term) => {
              const archives = matchedArchives.get(term) || [];
              return (
                <div key={term}>
                  <h4 className="text-sm font-medium text-neon-cyan mb-2">
                    &quot;{term}&quot; ({archives.length} match{archives.length !== 1 ? 'es' : ''})
                  </h4>
                  <div className="space-y-1.5">
                    {archives.slice(0, 5).map((archive) => (
                      <ArchivePreview key={archive.Hash} archive={archive} />
                    ))}
                    {archives.length > 5 && (
                      <p className="text-xs text-text-muted pl-3">
                        +{archives.length - 5} more archives
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            <Link
              to="/modlist/$repo/$id"
              params={{ repo: modlist.repo, id: modlist.machineURL }}
              className="inline-flex items-center gap-2 text-sm text-neon-purple hover:text-neon-cyan transition-colors"
            >
              View modlist details &rarr;
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function MultiArchiveResults({ results, searchTerms }: MultiArchiveResultsProps) {
  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface/60 border border-neon-purple/20 mb-4">
          <Layers className="h-10 w-10 text-text-muted" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No modlists found
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          No modlists contain archives matching all of: {searchTerms.map((t) => `"${t}"`).join(', ')}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-secondary">
          Found{' '}
          <span className="font-semibold text-text-primary">{results.length}</span>{' '}
          modlist{results.length !== 1 ? 's' : ''} containing all: {searchTerms.map((t) => `"${t}"`).join(' + ')}
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
            key={`${result.modlist.repo}/${result.modlist.machineURL}`}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ModlistResultCard result={result} searchTerms={searchTerms} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
