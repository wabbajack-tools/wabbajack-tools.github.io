import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useModlists } from '@/hooks/useModlists';
import { StatCard } from '@/components/status/StatCard';
import { getValidationState } from '@/components/status/validation';
import { StatusGroup } from '@/components/status/StatusGrid';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import type { ModlistMetadata } from '@/types';

export const Route = createFileRoute('/status/')({
  component: StatusPage,
});

function StatusPage() {
  const { data: modlists, isLoading, error } = useModlists();

  const groups = useMemo(() => {
    const out: Record<'failing' | 'passing' | 'skipped', ModlistMetadata[]> = {
      failing: [],
      passing: [],
      skipped: [],
    };
    for (const modlist of modlists ?? []) out[getValidationState(modlist)].push(modlist);
    for (const list of Object.values(out)) list.sort((a, b) => a.title.localeCompare(b.title));
    return out;
  }, [modlists]);

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-7 px-[clamp(16px,4vw,40px)] pt-8 pb-[72px]">
      <title>Status | Wabbajack</title>
      <div>
        <h1 className="m-0 text-4xl leading-[1.23] font-bold">Status</h1>
        <p className="mt-1.5 text-base text-fg-66">
          Monitor the validation status of all modlists in real time.
        </p>
      </div>

      {error && <ErrorDisplay message="Unable to load Modlists from GitHub!" />}

      {isLoading && <LoadingSpinner message="Loading Modlists..." />}

      {!isLoading && !error && modlists && (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
            <StatCard state="passing" value={groups.passing.length} />
            <StatCard state="failing" value={groups.failing.length} />
            <StatCard state="skipped" value={groups.skipped.length} />
          </div>
          <StatusGroup title="Failing" modlists={groups.failing} />
          <StatusGroup title="Passing" modlists={groups.passing} />
          <StatusGroup title="Skipped" modlists={groups.skipped} />
        </>
      )}
    </div>
  );
}
