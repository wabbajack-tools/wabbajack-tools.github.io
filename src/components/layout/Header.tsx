import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { Icon, WabbajackMark, type IconName } from '@/components/common/Icon';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const navLinks: { to: '/' | '/gallery' | '/search/global' | '/status'; label: string; icon: IconName; matches: string[] }[] = [
  { to: '/', label: 'Home', icon: 'home', matches: [] },
  { to: '/gallery', label: 'Gallery', icon: 'games', matches: ['/gallery', '/modlist'] },
  { to: '/search/global', label: 'Archive search', icon: 'search', matches: ['/search'] },
  { to: '/status', label: 'Status', icon: 'checkmark_circle', matches: ['/status'] },
];

function isActive(pathname: string, link: (typeof navLinks)[number]) {
  if (link.to === '/') return pathname === '/';
  return link.matches.some(prefix => pathname.startsWith(prefix));
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-20 border-b border-surface bg-ground">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-6 px-[clamp(16px,4vw,40px)]">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <WabbajackMark className="h-[31px] w-7" />
          <span className="text-xl leading-[1.23] font-bold text-fg">Wabbajack</span>
        </Link>

        {/* Wide: inline nav and a Download button */}
        <nav className="hidden flex-1 gap-1 min-[1000px]:flex">
          {navLinks.map(link => {
            const active = isActive(pathname, link);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'relative flex h-10 flex-none items-center gap-2 rounded-lg px-3 whitespace-nowrap',
                  active ? 'bg-ground-raised text-primary hover:bg-hover' : 'text-fg hover:bg-hover hover:text-primary'
                )}
              >
                <Icon name={link.icon} filled={active} className="size-[18px]" />
                <span className="text-sm">{link.label}</span>
                {active && <span className="absolute right-3.5 -bottom-3 left-3.5 h-[3px] rounded-[3px] bg-primary" />}
              </Link>
            );
          })}
        </nav>
        <a
          href={EXTERNAL_LINKS.download}
          className="hidden h-8 flex-none items-center gap-1.5 rounded px-3 whitespace-nowrap bg-primary text-ground hover:bg-hover hover:text-primary min-[1000px]:inline-flex"
        >
          <Icon name="arrow_download" />
          Download
        </a>

        {/* Narrow: a menu button */}
        <div className="flex-1 min-[1000px]:hidden" />
        <button
          type="button"
          onClick={() => setMenuOpen(open => !open)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className="flex size-11 cursor-pointer flex-col justify-center gap-1 rounded bg-surface px-3 text-fg hover:bg-hover hover:text-primary min-[1000px]:hidden"
        >
          <span className="h-0.5 rounded-sm bg-current" />
          <span className="h-0.5 rounded-sm bg-current" />
          <span className="h-0.5 rounded-sm bg-current" />
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-surface px-4 pt-2 pb-4 min-[1000px]:hidden">
          {navLinks.map(link => {
            const active = isActive(pathname, link);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex h-12 items-center gap-3 rounded-lg px-3.5 text-base hover:bg-hover hover:text-primary',
                  active ? 'bg-ground-raised text-primary' : 'text-fg'
                )}
              >
                <Icon name={link.icon} filled={active} className="size-5" />
                {link.label}
              </Link>
            );
          })}
          <a
            href={EXTERNAL_LINKS.download}
            className="mt-2 flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-ground"
          >
            Download Wabbajack
          </a>
        </div>
      )}
    </header>
  );
}
