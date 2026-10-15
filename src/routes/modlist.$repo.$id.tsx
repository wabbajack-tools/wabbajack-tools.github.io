import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, type ReactNode } from 'react';
import { useModlist, useReadme } from '@/hooks/useModlists';
import { Icon } from '@/components/common/Icon';
import { ModlistHero } from '@/components/modlist/detail/ModlistHero';
import { ModlistAside } from '@/components/modlist/detail/ModlistAside';
import { ModlistReadme } from '@/components/modlist/detail/ModlistReadme';
import { canRenderReadme } from '@/lib/utils';

export const Route = createFileRoute('/modlist/$repo/$id')({
  component: ModlistInfoPage,
});

function StatePanel({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1280px] px-[clamp(16px,4vw,40px)] pt-7 pb-20">{children}</div>;
}

function BackToGallery() {
  return (
    <Link
      to="/gallery"
      className="inline-flex h-8 items-center gap-1 rounded-[4px] bg-surface pr-3 pl-2 text-fg hover:bg-hover hover:text-primary"
    >
      <Icon name="chevron_right" flip className="size-4" />
      Back to gallery
    </Link>
  );
}

function ModlistInfoPage() {
  const { repo, id } = Route.useParams();
  const { data: modlist, isLoading: isLoadingModlist, error: modlistError } = useModlist(repo, id);

  const readmeUrl = modlist?.links.readme;
  const canRender = canRenderReadme(readmeUrl);

  const { data: readme, isLoading: isLoadingReadme, error: readmeError } = useReadme(
    canRender ? readmeUrl : undefined
  );

  // If we can't render the README, redirect to external
  useEffect(() => {
    if (modlist && !canRender && readmeUrl) {
      window.location.href = readmeUrl;
    }
  }, [modlist, canRender, readmeUrl]);

  if (modlist && !canRender && readmeUrl) {
    return null;
  }

  if (modlistError) {
    return (
      <StatePanel>
        <div className="flex flex-col items-start gap-5">
          <BackToGallery />
          <div className="flex w-full items-start gap-3 rounded-lg bg-error p-5 text-on-error">
            <Icon name="warning" className="size-[22px]" />
            <div className="flex flex-col gap-1.5">
              <strong className="text-[16px]">Unable to load Modlists from GitHub!</strong>
              <span className="text-[14px] leading-[21px]">The modlist repositories didn't respond. Try again later.</span>
            </div>
          </div>
        </div>
      </StatePanel>
    );
  }

  if (isLoadingModlist) {
    return (
      <div aria-busy="true">
        <div className="h-[clamp(260px,38vw,520px)] bg-tile" />
        <StatePanel>
          <div className="text-fg-66">Loading modlist…</div>
        </StatePanel>
      </div>
    );
  }

  if (!modlist) {
    return (
      <StatePanel>
        <div className="flex flex-col items-start gap-5">
          <BackToGallery />
          <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-surface px-5 py-12 text-center">
            <Icon name="question_circle" className="size-7 text-fg-66" />
            <strong className="text-[16px]">Modlist not found</strong>
            <span className="text-fg-66">Found no matching Modlist "{`${repo}/${id}`}"</span>
          </div>
        </div>
      </StatePanel>
    );
  }

  return (
    <div>
      <title>{`${modlist.title} | Wabbajack`}</title>

      <ModlistHero modlist={modlist} />

      <div className="mx-auto flex max-w-[1280px] flex-col-reverse gap-10 min-[1000px]:flex-row min-[1000px]:items-start px-[clamp(16px,4vw,40px)] pt-6 pb-20">
        <div className="flex min-w-0 flex-1 flex-col gap-7">
          {modlist.description && (
            <p className="m-0 max-w-[760px] text-[18px] leading-[1.5] text-pretty text-fg-88">{modlist.description}</p>
          )}

          {canRender && (
            <>
              <div className="flex items-center gap-3">
                <span className="text-[12px] tracking-[.08em] text-fg-66 uppercase">Readme</span>
                <span className="h-px flex-1 bg-surface" />
              </div>
              <ModlistReadme
                readme={readme}
                isLoading={isLoadingReadme}
                failed={!!readmeError}
                readmeUrl={readmeUrl}
              />
            </>
          )}
        </div>

        <ModlistAside modlist={modlist} className="min-[1000px]:sticky min-[1000px]:top-[88px] min-[1000px]:w-[300px] min-[1000px]:flex-none" />
      </div>
    </div>
  );
}
