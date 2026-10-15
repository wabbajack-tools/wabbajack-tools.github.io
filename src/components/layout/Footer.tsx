import { Link } from '@tanstack/react-router';
import { Icon, WabbajackMark } from '@/components/common/Icon';
import { EXTERNAL_LINKS } from '@/lib/constants';

const linkClass = 'inline-flex h-8 items-center rounded-2xl px-3 text-fg hover:bg-dark-bg hover:text-primary';

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-surface bg-ground">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-5 px-[clamp(16px,4vw,40px)] py-7">
        <div className="flex items-center gap-3">
          <WabbajackMark className="h-[31px] w-7" />
          <div>
            <div className="text-sm font-semibold">Automated Modlist Installer</div>
            <div className="mt-0.5 text-fg-66">Free &amp; Open Source</div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-1">
          <a href={EXTERNAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>
          <Link to="/discord" className={linkClass}>Discord</Link>
          <a href={EXTERNAL_LINKS.wiki} target="_blank" rel="noopener noreferrer" className={linkClass}>Wiki</a>
          <a href={EXTERNAL_LINKS.patreon} target="_blank" rel="noopener noreferrer" className={linkClass}>Patreon</a>
          <a href={EXTERNAL_LINKS.reddit} target="_blank" rel="noopener noreferrer" className={linkClass}>Reddit</a>
        </nav>
      </div>
      <div className="flex items-center justify-center gap-[5px] px-4 pb-6 text-xs text-fg-66">
        Made with <Icon name="heart" filled className="size-3 text-primary" /> by the Wabbajack Team
      </div>
    </footer>
  );
}
