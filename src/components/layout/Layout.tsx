import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const backdrop = 'url(/wabbajack-backdrop.svg) center / contain no-repeat';

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      {/* The app's faint tiki-face drawing behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[120px] -right-[120px] z-0 h-[990px] w-[640px] bg-backdrop"
        style={{ mask: backdrop, WebkitMask: backdrop }}
      />
      <Header />
      <main className="relative z-[1] flex-1">{children}</main>
      <Footer />
    </div>
  );
}
