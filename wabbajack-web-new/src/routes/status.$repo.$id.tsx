import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Search, FileWarning } from 'lucide-react';
import { useDetailedStatus } from '@/hooks/useModlistStatus';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { pageTransition } from '@/lib/animations';
import { cn } from '@/lib/utils';
import type { ValidatedArchive } from '@/types';

export const Route = createFileRoute('/status/$repo/$id')({
  component: DetailedStatusPage,
});

function DetailedStatusPage() {
  const { repo, id } = Route.useParams();
  const { data: status, isLoading, error } = useDetailedStatus(repo, id);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message={`Error loading status report for ${repo}/${id}`} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <LoadingSpinner message="Loading detailed status..." />
      </div>
    );
  }

  if (!status) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message={`Status report not found for ${repo}/${id}`} />
      </div>
    );
  }

  const validArchives = status.Archives?.filter(
    (a: ValidatedArchive) => a.Status === 'Valid'
  ).length || 0;
  const invalidArchives = status.Archives?.filter(
    (a: ValidatedArchive) => a.Status === 'InValid'
  ).length || 0;

  const statusConfig = status.Status === 'Valid'
    ? {
        color: 'emerald',
        icon: CheckCircle2,
        label: 'Valid',
        bgClass: 'bg-emerald-500/10 border-emerald-500/30',
      }
    : status.Status === 'ForcedDown'
    ? {
        color: 'yellow',
        icon: AlertCircle,
        label: 'Forced Down',
        bgClass: 'bg-yellow-500/10 border-yellow-500/30',
      }
    : {
        color: 'red',
        icon: XCircle,
        label: 'Invalid',
        bgClass: 'bg-red-500/10 border-red-500/30',
      };

  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      className="flex-grow"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <title>Status: {status.Name} | Wabbajack</title>

      {/* Hero section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6"
          >
            <Link to="/status">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Status
            </Link>
          </Button>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-3xl md:text-4xl text-text-primary"
          >
            {status.Name}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Status card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'rounded-2xl p-6 border backdrop-blur-sm mb-6',
            statusConfig.bgClass
          )}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-${statusConfig.color}-500/20`}>
                <StatusIcon className={`h-8 w-8 text-${statusConfig.color}-400`} />
              </div>
              <div>
                <p className="text-sm text-text-muted uppercase tracking-wide">
                  Status
                </p>
                <p className={`text-2xl font-display font-bold text-${statusConfig.color}-400`}>
                  {statusConfig.label}
                </p>
              </div>
            </div>

            <Button variant="glow" size="sm" asChild>
              <Link to="/search/$repo/$id" params={{ repo, id }}>
                <Search className="h-4 w-4 mr-2" />
                Archive Search
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-sm text-text-muted">Valid Archives</p>
              <p className="text-2xl font-bold text-emerald-400">{validArchives}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Invalid Archives</p>
              <p className="text-2xl font-bold text-red-400">{invalidArchives}</p>
            </div>
          </div>
        </motion.div>

        {/* Invalid archives list */}
        {invalidArchives > 0 && status.Archives && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-surface/60 backdrop-blur-sm border border-neon-purple/20 overflow-hidden"
          >
            <div className="p-4 border-b border-neon-purple/10 flex items-center gap-2">
              <FileWarning className="h-5 w-5 text-red-400" />
              <h2 className="font-semibold text-text-primary">
                Invalid Archives ({invalidArchives})
              </h2>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {status.Archives.filter(
                (a: ValidatedArchive) => a.Status === 'InValid'
              ).map((archive: ValidatedArchive) => (
                <div
                  key={archive.Original.Hash || archive.Original.Name}
                  className="flex items-center justify-between p-4 border-b border-neon-purple/10 last:border-0 hover:bg-red-500/5 transition-colors"
                >
                  <span className="font-mono text-sm text-text-secondary truncate mr-4">
                    {archive.Original.Name}
                  </span>
                  <Badge variant="destructive">
                    Invalid
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All valid message */}
        {invalidArchives === 0 && validArchives > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-8 text-center"
          >
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-emerald-400 mb-2">
              All Archives Valid
            </h3>
            <p className="text-text-secondary">
              All {validArchives} archives have been validated successfully.
            </p>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}
