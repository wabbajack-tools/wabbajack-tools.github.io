import { ModlistCard } from './ModlistCard';
import type { ModlistMetadata } from '@/types';

interface ModlistGridProps {
  modlists: ModlistMetadata[];
}

export function ModlistGrid({ modlists }: ModlistGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-x-4 gap-y-7">
      {modlists.map((modlist) => (
        <ModlistCard
          key={modlist.namespacedName || `${modlist.repositoryName}/${modlist.links.machineURL}`}
          modlist={modlist}
        />
      ))}
    </div>
  );
}

/** Loading state: six placeholder tiles. */
export function ModlistGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading modlists"
      className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-4 gap-y-6"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex flex-col gap-2.5">
          <div className="aspect-video rounded-lg bg-tile" />
          <div className="h-3 w-4/5 rounded-[4px] bg-surface" />
          <div className="h-3 w-[55%] rounded-[4px] bg-surface" />
        </div>
      ))}
    </div>
  );
}
