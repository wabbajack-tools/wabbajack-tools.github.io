import { createFileRoute, Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useDetailedStatus } from '@/hooks/useModlistStatus';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { Icon } from '@/components/common/Icon';
import { ArchiveRow } from '@/components/status/ArchiveRow';
import { cn } from '@/lib/utils';
import type { ValidatedArchive } from '@/types';

export const Route = createFileRoute('/status/$repo/$id')({
  component: DetailedStatusPage,
});

const CONTAINER = 'mx-auto flex max-w-[960px] flex-col gap-5 px-[clamp(16px,4vw,40px)] pt-7 pb-[72px]';

function BackToStatus() {
  return (
    <div>
      <Link
        to="/status"
        className="inline-flex h-8 items-center gap-1 rounded pr-3 pl-2 bg-surface text-fg transition-colors duration-[80ms] hover:bg-hover hover:text-primary"
      >
        <Icon name="chevron_right" flip className="size-4" />
        Back to status
      </Link>
    </div>
  );
}

function StatusBox({
  className,
  icon,
  title,
  children,
  action,
}: {
  className: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
  action: ReactNode;
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-4 rounded-lg p-4', className)}>
      {icon}
      <div className="flex-[1_1_300px]">
        <div className="text-2xl leading-[1.23] font-semibold">{title}</div>
        <div className="mt-1 text-sm leading-[21px]">{children}</div>
      </div>
      {action}
    </div>
  );
}

function CountCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg bg-surface px-4 py-3.5">
      <div className="text-[32px] leading-[1.1] font-semibold">{value.toLocaleString()}</div>
      <div className="mt-1 text-fg-66">{label}</div>
    </div>
  );
}

function DetailedStatusPage() {
  const { repo, id } = Route.useParams();
  const { data: status, isLoading, error } = useDetailedStatus(repo, id);

  if (error) {
    return (
      <div className={CONTAINER}>
        <BackToStatus />
        <ErrorDisplay message={`Error loading status report for ${repo}/${id}`} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={CONTAINER}>
        <LoadingSpinner message="Loading detailed status..." />
      </div>
    );
  }

  if (!status) {
    return (
      <div className={CONTAINER}>
        <BackToStatus />
        <ErrorDisplay message={`Status report not found for ${repo}/${id}`} />
      </div>
    );
  }

  const archives = status.Archives ?? [];
  const invalid = archives.filter((a: ValidatedArchive) => a.Status === 'InValid');
  const validCount = archives.filter((a: ValidatedArchive) => a.Status === 'Valid').length;
  const invalidCount = invalid.length;

  const isValid = status.Status === 'Available' || status.Status === 'Valid';

  const searchButton = (dark?: boolean) => (
    <Link
      to="/search/$repo/$id"
      params={{ repo, id }}
      className={cn(
        'flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-fg transition-colors duration-[80ms] hover:bg-hover hover:text-primary',
        dark ? 'bg-ground' : 'bg-surface'
      )}
    >
      <Icon name="search" className="size-4" />
      Archive search
    </Link>
  );

  return (
    <div className={CONTAINER}>
      <title>{`Status: ${status.Name} | Wabbajack`}</title>
      <BackToStatus />
      <h1 className="m-0 text-[40px] leading-[1.23] font-semibold [overflow-wrap:anywhere]">{status.Name}</h1>

      {isValid ? (
        <StatusBox
          className="border-[3px] border-surface"
          icon={<Icon name="checkmark_circle" filled className="size-8 shrink-0 text-success" />}
          title="Valid"
          action={searchButton()}
        >
          <span className="text-fg-66">Every archive downloaded and matched. This list installs today.</span>
        </StatusBox>
      ) : status.Status === 'ForcedDown' ? (
        <StatusBox
          className="bg-unavailable"
          icon={<Icon name="warning" filled className="size-8 shrink-0 text-fg" />}
          title="Forced down"
          action={searchButton(true)}
        >
          A game or mod update has made the list unavailable for installation. The modlist requires an update from
          its author before it is installable.
        </StatusBox>
      ) : (
        <StatusBox
          className="attention-fail"
          icon={<Icon name="dismiss" filled className="size-8 shrink-0 text-fail-border-hot" />}
          title="Invalid"
          action={searchButton()}
        >
          <span className="text-on-error">
            {invalidCount > 0
              ? `${invalidCount.toLocaleString()} ${invalidCount === 1 ? 'archive' : 'archives'} can no longer be downloaded, so the list can't be installed right now. The author needs to update it.`
              : "This list failed validation, so it can't be installed right now. The author needs to update it."}
          </span>
        </StatusBox>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        <CountCard value={validCount} label="Valid archives" />
        <CountCard value={invalidCount} label="Invalid archives" />
      </div>

      {invalidCount > 0 && (
        <>
          <h2 className="mt-2 text-xl font-semibold">Invalid archives ({invalidCount.toLocaleString()})</h2>
          <div className="flex max-h-[420px] flex-col gap-1.5 overflow-auto [scrollbar-color:var(--color-surface-16)_var(--color-ground)]">
            {invalid.map((archive: ValidatedArchive) => (
              <ArchiveRow key={archive.Original.Hash || archive.Original.Name} archive={archive} />
            ))}
          </div>
        </>
      )}

      {invalidCount === 0 && validCount > 0 && (
        <div className="flex flex-col items-center gap-2 rounded-2xl border-[3px] border-surface px-4 py-10 text-center">
          <Icon name="checkmark_circle" className="size-8 text-success" />
          <div className="text-xl font-semibold">All archives valid</div>
          <div className="text-fg-66">Nothing needs fixing.</div>
        </div>
      )}
    </div>
  );
}
