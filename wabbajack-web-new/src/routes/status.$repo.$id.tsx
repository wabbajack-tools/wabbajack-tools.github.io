import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useDetailedStatus } from '@/hooks/useModlistStatus';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { Badge } from '@/components/ui/badge';
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
    return <ErrorDisplay message={`Error loading status report for ${repo}/${id}`} />;
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading detailed status..." />;
  }

  if (!status) {
    return <ErrorDisplay message={`Status report not found for ${repo}/${id}`} />;
  }

  const validArchives = status.Archives?.filter(
    (a: ValidatedArchive) => a.Status === 'Valid'
  ).length || 0;
  const invalidArchives = status.Archives?.filter(
    (a: ValidatedArchive) => a.Status === 'InValid'
  ).length || 0;

  return (
    <motion.div
      className="m-8 flex-grow"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <title>Status: {status.Name} | Wabbajack</title>

      <div className="max-w-4xl mx-auto">
        <h1 className="font-semibold text-3xl text-center mb-4">
          {status.Name}
        </h1>

        <div className="bg-wabbajack-cards-background-base rounded-md p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Status:</span>
            <Badge
              variant={
                status.Status === 'Valid'
                  ? 'success'
                  : status.Status === 'ForcedDown'
                  ? 'secondary'
                  : 'destructive'
              }
            >
              {status.Status}
            </Badge>
          </div>

          <p>
            <span className="font-semibold">Valid Archives:</span> {validArchives}
          </p>
          <p>
            <span className="font-semibold">Invalid Archives:</span> {invalidArchives}
          </p>

          <div className="mt-4">
            <Link
              to="/search/$repo/$id"
              params={{ repo, id }}
              className="text-wabbajack-purple-light hover:underline"
            >
              View Archive Search
            </Link>
          </div>
        </div>

        {status.Archives && status.Archives.length > 0 && (
          <div className="bg-wabbajack-cards-background-base rounded-md p-4">
            <h2 className="font-semibold text-xl mb-4">Archive Status</h2>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {status.Archives.filter(
                (a: ValidatedArchive) => a.Status === 'InValid'
              ).map((archive: ValidatedArchive) => (
                <div
                  key={archive.Original.Hash || archive.Original.Name}
                  className={cn(
                    'p-2 rounded',
                    'bg-wabbajack-red/20 border border-wabbajack-red'
                  )}
                >
                  <span className="font-medium">{archive.Original.Name}</span>
                  <Badge variant="destructive" className="ml-2">
                    {archive.Status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
