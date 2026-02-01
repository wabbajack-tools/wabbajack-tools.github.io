import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import type { ModlistMetadata } from '@/types';

interface StatusCardProps {
  modlist: ModlistMetadata;
}

function isForceDown(modlist: ModlistMetadata): boolean {
  return modlist.force_down;
}

function hasFailures(modlist: ModlistMetadata): boolean {
  return modlist.validationSummary?.HasFailures || false;
}

export function StatusCard({ modlist }: StatusCardProps) {
  const bgClass = hasFailures(modlist)
    ? 'bg-wabbajack-red'
    : isForceDown(modlist)
    ? 'bg-wabbajack-cards-background-base'
    : 'bg-wabbajack-cards-background-hover';

  return (
    <div className={cn('text-white rounded-md shadow-md', bgClass)}>
      <div className="p-2">
        <Link
          to="/status/$repo/$id"
          params={{ repo: modlist.repositoryName, id: modlist.links.machineURL }}
          className="font-semibold text-lg hover:underline"
        >
          {modlist.title}
        </Link>
        {isForceDown(modlist) ? (
          <>
            <p>List Validation skipped.</p>
            <p>This can be set intentionally!</p>
          </>
        ) : (
          <>
            <p>Passed: {modlist.validationSummary?.Passed || 0}</p>
            <p>Failed: {modlist.validationSummary?.Failed || 0}</p>
          </>
        )}
      </div>
    </div>
  );
}
