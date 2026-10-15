import { Link } from '@tanstack/react-router';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import type { ModlistMetadata } from '@/types';
import { getValidationState } from './validation';

const config = {
  failing: {
    word: 'Failing',
    card: 'bg-error border-error text-on-error',
    icon: <Icon name="dismiss" filled className="size-5 shrink-0 text-on-error" />,
  },
  passing: {
    word: 'Passing',
    card: 'bg-ground-raised border-ground-raised text-fg',
    icon: <Icon name="checkmark_circle" filled className="size-5 shrink-0 text-success" />,
  },
  skipped: {
    word: 'Skipped',
    card: 'border-dashed border-surface bg-transparent text-fg-66',
    icon: <Icon name="subtract" className="size-5 shrink-0 text-fg-66" />,
  },
} as const;

interface StatusCardProps {
  modlist: ModlistMetadata;
}

export function StatusCard({ modlist }: StatusCardProps) {
  const state = getValidationState(modlist);
  const { word, card, icon } = config[state];
  const summary = modlist.validationSummary;

  return (
    <Link
      to="/status/$repo/$id"
      params={{ repo: modlist.repositoryName, id: modlist.links.machineURL }}
      className={cn(
        'flex items-center gap-2.5 rounded-lg border p-3 transition-colors duration-[80ms] hover:bg-hover',
        card
      )}
    >
      {icon}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{modlist.title}</div>
        <div className="mt-0.5 opacity-75">
          {state === 'skipped'
            ? 'Validation skipped'
            : `${(summary?.Passed ?? 0).toLocaleString()} passed · ${(summary?.Failed ?? 0).toLocaleString()} failed`}
        </div>
      </div>
      <span className="whitespace-nowrap text-xs font-semibold">{word}</span>
    </Link>
  );
}
