import { useMemo } from 'react';
import { StatusCard } from './StatusCard';
import type { ModlistMetadata } from '@/types';

interface StatusGridProps {
  modlists: ModlistMetadata[];
}

export function StatusGrid({ modlists }: StatusGridProps) {
  const sortedModlists = useMemo(() => {
    return [...modlists].sort((a, b) => {
      // Failing first
      const aHasFailures = a.validationSummary?.HasFailures || false;
      const bHasFailures = b.validationSummary?.HasFailures || false;
      if (aHasFailures !== bHasFailures) {
        return aHasFailures ? -1 : 1;
      }

      // Force down last
      if (a.force_down !== b.force_down) {
        return a.force_down ? 1 : -1;
      }

      // Alphabetically
      return a.title.localeCompare(b.title);
    });
  }, [modlists]);

  return (
    <div className="my-1 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sortedModlists.map((modlist) => (
        <StatusCard
          key={modlist.namespacedName || `${modlist.repositoryName}/${modlist.links.machineURL}`}
          modlist={modlist}
        />
      ))}
    </div>
  );
}
