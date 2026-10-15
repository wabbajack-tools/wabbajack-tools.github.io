import { Link } from '@tanstack/react-router';
import { ArchiveRow } from './ArchiveRow';
import type { GlobalArchiveResult } from '@/types/search';

interface ArchiveResultCardProps {
  result: GlobalArchiveResult;
}

const MAX_VISIBLE_BADGES = 4;

export function ArchiveResultCard({ result }: ArchiveResultCardProps) {
  const { archive, modlists } = result;
  const visibleModlists = modlists.slice(0, MAX_VISIBLE_BADGES);
  const hiddenCount = modlists.length - MAX_VISIBLE_BADGES;

  return (
    <ArchiveRow archive={archive}>
      <div className="mt-1.5 flex flex-wrap items-center gap-1">
        <span className="mr-0.5 text-fg-66">
          Used by {modlists.length} {modlists.length === 1 ? 'list' : 'lists'}:
        </span>
        {visibleModlists.map((modlist) => (
          <Link
            key={`${modlist.repo}-${modlist.machineURL}`}
            to="/modlist/$repo/$id"
            params={{ repo: modlist.repo, id: modlist.machineURL }}
            className="h-[22px] rounded bg-surface-16 px-2 text-[12px] leading-[22px] text-fg hover:bg-hover hover:text-primary"
          >
            {modlist.name}
          </Link>
        ))}
        {hiddenCount > 0 && <span className="text-[12px] text-fg-66">+{hiddenCount} more</span>}
      </div>
    </ArchiveRow>
  );
}
