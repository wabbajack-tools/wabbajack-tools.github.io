import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useModlists } from '@/hooks/useModlists';
import { StatusGrid } from '@/components/status/StatusGrid';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { pageTransition } from '@/lib/animations';

export const Route = createFileRoute('/status')({
  component: StatusPage,
});

function StatusPage() {
  const { data: modlists, isLoading, error } = useModlists();

  const stats = useMemo(() => {
    if (!modlists) return { failing: 0, passing: 0, skipped: 0 };

    return {
      failing: modlists.filter((m) => m.validationSummary?.HasFailures).length,
      passing: modlists.filter(
        (m) => !m.validationSummary?.HasFailures && !m.force_down
      ).length,
      skipped: modlists.filter((m) => m.force_down).length,
    };
  }, [modlists]);

  return (
    <motion.div
      className="px-1 md:p-16 flex-grow"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="font-semibold my-1 text-4xl text-center mb-4">
        Status Dashboard
      </h1>

      <div className="mb-4">
        <p className="font-bold text-xl">Failing Modlists: {stats.failing}</p>
        <p className="font-bold text-xl">Succeeding Modlists: {stats.passing}</p>
        <p className="font-bold text-xl">Skipped Modlists: {stats.skipped}</p>
      </div>

      {error && <ErrorDisplay message="Unable to load Modlists from GitHub!" />}

      {isLoading && <LoadingSpinner message="Loading Modlists..." />}

      {!isLoading && !error && modlists && <StatusGrid modlists={modlists} />}
    </motion.div>
  );
}
