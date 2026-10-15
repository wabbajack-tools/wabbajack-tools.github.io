import { useMemo, type ReactNode } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ModlistCarousel } from '@/components/modlist/ModlistCarousel';
import { Icon, WabbajackMark, type IconName } from '@/components/common/Icon';
import { useModlists } from '@/hooks/useModlists';
import { EXTERNAL_LINKS } from '@/lib/constants';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const heroButton =
  'inline-flex h-14 flex-none items-center gap-2.5 whitespace-nowrap rounded-2xl border px-5 text-base text-fg bg-surface border-surface hover:bg-hover hover:border-transparent hover:text-primary';

const STEPS: { title: string; icon: IconName; description: string }[] = [
  {
    title: 'Download',
    icon: 'arrow_download',
    description: "Get Wabbajack from GitHub. It's free and open source. Just download the launcher and you're ready to go.",
  },
  {
    title: 'Choose',
    icon: 'games',
    description: 'Browse our gallery of curated modlists. Each one is carefully crafted and tested by the community.',
  },
  {
    title: 'Install',
    icon: 'toolbox',
    description: 'Hit install and let Wabbajack handle the rest. It downloads, organizes, and configures everything automatically.',
  },
];

function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={className ?? 'mb-5 text-[28px] leading-[1.23] font-normal'}>{children}</h2>;
}

function HomePage() {
  const { data: modlists } = useModlists();
  const stats = useMemo(
    () => (modlists ? { lists: modlists.length, games: new Set(modlists.map((m) => m.game)).size } : null),
    [modlists],
  );

  return (
    <div className="mx-auto max-w-[1280px] px-[clamp(16px,4vw,40px)]">
      {/* Hero */}
      <section className="flex max-w-[760px] flex-col items-start gap-6 pt-[clamp(48px,9vw,112px)] pb-[clamp(48px,7vw,88px)]">
        <WabbajackMark className="h-20 w-[72px]" />
        <h1 className="text-[clamp(48px,8vw,80px)] leading-[1.1] font-bold">Wabbajack</h1>
        <p className="text-[clamp(18px,2.4vw,24px)] leading-[1.35] text-pretty">
          The automated modlist installer that brings entire modding setups to life with a single click.
        </p>
        {stats && (
          <p className="text-base leading-[1.4] text-fg-66">
            The home of <span className="font-semibold text-primary">{stats.lists}</span> ready-made modlists spanning{' '}
            <span className="font-semibold text-primary">{stats.games}</span> games.
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={EXTERNAL_LINKS.download}
            className="inline-flex h-14 flex-none items-center gap-2.5 rounded-2xl border border-primary bg-primary px-6 text-[18px] font-semibold whitespace-nowrap text-ground hover:border-transparent hover:bg-hover hover:text-primary"
          >
            <Icon name="arrow_download" filled className="size-5" />
            Download now
          </a>
          <a href={EXTERNAL_LINKS.wiki} target="_blank" rel="noopener noreferrer" className={heroButton}>
            <Icon name="document_one_page_multiple" className="size-[18px] text-primary" />
            Documentation
          </a>
          <Link to="/discord" className={heroButton}>
            <Icon name="question_circle" className="size-[18px] text-primary" />
            Join Discord
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-[clamp(56px,8vw,96px)]">
        <SectionTitle>How it works</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 rounded-2xl border-3 border-surface p-4"
            >
              <div className="text-2xl leading-[1.23] font-semibold">{step.title}</div>
              <Icon name={step.icon} className="size-7 text-primary" />
              <p className="col-span-full mt-1 text-sm leading-[21px] text-fg-88">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured modlists */}
      <section className="pb-[clamp(56px,8vw,96px)]">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <SectionTitle className="text-[28px] leading-[1.23] font-normal">Featured modlists</SectionTitle>
            <p className="mt-1.5 text-sm text-fg-66">
              Curated collections from the community, from vanilla-plus to total overhauls.
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-surface px-3.5 text-sm hover:bg-hover hover:text-primary"
          >
            View all modlists
            <Icon name="chevron_right" className="text-primary" />
          </Link>
        </div>
        <ModlistCarousel />
      </section>

      {/* Platform support */}
      <section className="pb-[clamp(56px,8vw,96px)]">
        <SectionTitle>Platform support</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          <div className="flex flex-col gap-2 rounded-2xl border-3 border-surface p-4">
            <div className="text-2xl leading-[1.23] font-semibold">Windows</div>
            <p className="text-sm leading-[21px] text-fg-88">
              Requires Windows 10/11 Home or Pro. LTSC, IoT Enterprise, and modified Windows versions are not supported.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border-3 border-surface p-4">
            <div className="text-2xl leading-[1.23] font-semibold">Linux</div>
            <p className="text-sm leading-[21px] text-fg-88">
              Community-maintained guides are available for running via Proton. Check the{' '}
              <a href={EXTERNAL_LINKS.linuxGuide} className="link" target="_blank" rel="noopener noreferrer">
                Linux guide
              </a>{' '}
              or{' '}
              <a href={EXTERNAL_LINKS.linuxDiscordChannel} className="link" target="_blank" rel="noopener noreferrer">
                Discord channel
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
