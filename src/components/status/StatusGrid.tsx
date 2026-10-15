import { StatusCard } from './StatusCard';
import type { ModlistMetadata } from '@/types';

interface StatusGroupProps {
  title: string;
  modlists: ModlistMetadata[];
}

/** One titled group ("Failing 13") of status cards. */
export function StatusGroup({ title, modlists }: StatusGroupProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="m-0 text-xl leading-[1.23] font-semibold">
        {title} <span className="font-normal text-fg-66">{modlists.length}</span>
      </h2>
      {modlists.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-2">
          {modlists.map((modlist) => (
            <StatusCard
              key={modlist.namespacedName || `${modlist.repositoryName}/${modlist.links.machineURL}`}
              modlist={modlist}
            />
          ))}
        </div>
      )}
    </section>
  );
}
