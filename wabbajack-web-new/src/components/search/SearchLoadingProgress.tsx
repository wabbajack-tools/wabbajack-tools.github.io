import { motion } from 'framer-motion';
import { Database, Loader2 } from 'lucide-react';
import type { SearchLoadingState } from '@/types/search';

interface SearchLoadingProgressProps {
  loadingState: SearchLoadingState;
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function SearchLoadingProgress({ loadingState }: SearchLoadingProgressProps) {
  const { totalModlists, loadedModlists, loadedArchives, isComplete } = loadingState;

  const progress = totalModlists > 0 ? (loadedModlists / totalModlists) * 100 : 0;

  return (
    <div className="rounded-xl bg-surface/60 backdrop-blur-sm border border-neon-purple/20 p-4">
      <div className="flex items-center gap-3 mb-3">
        {isComplete ? (
          <Database className="h-5 w-5 text-neon-cyan" />
        ) : (
          <Loader2 className="h-5 w-5 text-neon-purple animate-spin" />
        )}
        <span className="text-sm text-text-secondary">
          {isComplete ? (
            <>
              Loaded{' '}
              <span className="font-semibold text-neon-cyan">
                {formatNumber(loadedArchives)}
              </span>{' '}
              archives from{' '}
              <span className="font-semibold text-text-primary">{loadedModlists}</span>{' '}
              modlists
            </>
          ) : (
            <>
              Loading{' '}
              <span className="font-semibold text-neon-purple">
                {formatNumber(loadedArchives)}
              </span>{' '}
              archives from{' '}
              <span className="font-semibold text-text-primary">{loadedModlists}</span>
              <span className="text-text-muted">/{totalModlists}</span> modlists...
            </>
          )}
        </span>
      </div>

      <div className="relative h-2 bg-void/50 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        {!isComplete && (
          <motion.div
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '500%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>
    </div>
  );
}
