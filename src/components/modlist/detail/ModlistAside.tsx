import { Link } from '@tanstack/react-router';
import { Icon } from '@/components/common/Icon';
import { cn, isValidDiscordUrl } from '@/lib/utils';
import { getGameDisplayName } from '@/types/game';
import type { ModlistMetadata } from '@/types';

function formatSize(bytes: number | undefined): string {
  if (!bytes) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value >= 100 ? value.toFixed(0) : value.toFixed(1)} ${units[i]}`;
}

function formatCount(n: number | undefined): string {
  return n == null ? '—' : n.toLocaleString('en-US');
}

const secondaryButton =
  'flex h-10 flex-1 items-center justify-center rounded-lg bg-surface text-fg hover:bg-hover hover:text-primary';

function StatusBox({ modlist }: { modlist: ModlistMetadata }) {
  const summary = modlist.validationSummary;
  const failing = !!summary && (summary.HasFailures || summary.Failed > 0);

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-lg p-3',
        !summary ? 'border border-dashed border-surface text-fg-66' : failing ? 'bg-error text-on-error' : 'bg-surface'
      )}
    >
      {!summary ? (
        <Icon name="subtract" className="size-[22px]" />
      ) : failing ? (
        <Icon name="dismiss" filled className="size-[22px]" />
      ) : (
        <Icon name="checkmark_circle" filled className="size-[22px] text-success" />
      )}
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-semibold">{!summary ? 'Skipped' : failing ? 'Failing' : 'Passing'}</div>
        <div className={failing ? undefined : 'text-fg-66'}>
          {summary
            ? `${formatCount(summary.Passed)} passed · ${formatCount(summary.Failed)} failed`
            : 'Validation skipped'}
        </div>
      </div>
      <Link
        to="/status/$repo/$id"
        params={{ repo: modlist.repositoryName, id: modlist.links.machineURL }}
        className={failing ? 'font-bold text-on-error underline' : 'link'}
      >
        Report
      </Link>
    </div>
  );
}

export function ModlistAside({ modlist, className }: { modlist: ModlistMetadata; className?: string }) {
  const meta = modlist.download_metadata;
  const maintainers = (modlist.maintainers ?? []).map((m) => m.replace(/^github\//, '')).join(', ');
  const facts: [string, string][] = [
    ['Version', modlist.version || '—'],
    ['Game', getGameDisplayName(modlist.game)],
    ['Download size', formatSize(meta?.SizeOfArchives)],
    ['Install size', formatSize(meta?.SizeOfInstalledFiles)],
    ['Archives', formatCount(meta?.NumberOfArchives)],
    ['Installed files', formatCount(meta?.NumberOfInstalledFiles)],
    ['Maintainers', maintainers || modlist.author || '—'],
    ['Updated', modlist.dateUpdated ? modlist.dateUpdated.slice(0, 10) : '—'],
  ];
  const tags = [...new Set(modlist.tags ?? [])];
  const hasDiscord = isValidDiscordUrl(modlist.links.discordURL);
  const hasWebsite = !!modlist.links.websiteURL;

  return (
    <aside className={cn('flex max-w-full flex-col gap-4', className)}>
      <div className="flex flex-col gap-2">
        <Link
          to="/search/$repo/$id"
          params={{ repo: modlist.repositoryName, id: modlist.links.machineURL }}
          className="flex h-[49px] items-center justify-center gap-2 rounded-2xl border border-primary bg-primary text-[15px] font-semibold text-ground hover:border-transparent hover:bg-hover hover:text-primary"
        >
          <Icon name="search" className="size-[18px]" />
          Archive search
        </Link>
        {(hasDiscord || hasWebsite) && (
          <div className="flex gap-2">
            {hasDiscord && (
              <a href={modlist.links.discordURL} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                Discord
              </a>
            )}
            {hasWebsite && (
              <a href={modlist.links.websiteURL} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                Website ↗
              </a>
            )}
          </div>
        )}
      </div>

      <StatusBox modlist={modlist} />

      <dl className="m-0 grid grid-cols-[auto_1fr] rounded-lg border-[3px] border-surface px-3 py-1 text-[13px]">
        {facts.map(([k, v], i) => {
          const last = i === facts.length - 1;
          return (
            <div key={k} className="contents">
              <dt className={cn('py-[9px] pr-3 text-fg-66', !last && 'border-b border-ground-raised')}>{k}</dt>
              <dd
                className={cn(
                  'm-0 py-[9px] text-right [overflow-wrap:anywhere]',
                  !last && 'border-b border-ground-raised'
                )}
              >
                {v}
              </dd>
            </div>
          );
        })}
      </dl>

      {tags.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-fg-66">Tags</span>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span key={tag} className="h-6 rounded-[4px] bg-surface px-2 text-[12px] leading-6">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
