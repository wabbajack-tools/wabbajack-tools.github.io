import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/** The Fluent UI System Icons the site ships in public/icons, as the desktop app uses them. */
export type IconName =
  | 'arrow_download'
  | 'arrow_upload'
  | 'checkmark_circle'
  | 'chevron_right'
  | 'cloud_arrow_down'
  | 'dismiss'
  | 'document_one_page_multiple'
  | 'filter_dismiss'
  | 'games'
  | 'heart'
  | 'home'
  | 'maximize'
  | 'question_circle'
  | 'search'
  | 'settings'
  | 'subtract'
  | 'toolbox'
  | 'warning';

interface IconProps {
  name: IconName;
  /** Filled variant: the app uses Regular at rest and Filled on hover and when active. */
  filled?: boolean;
  /** Point the glyph the other way (chevron_right becomes a back arrow). */
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Draws an icon in `currentColor` by masking a block with the SVG, so it takes the text colour of
 * its parent (set a `text-*` or `bg-*`-free colour on the parent, or a `text-*` class here).
 * Size it with `size-*` classes.
 */
export function Icon({ name, filled = false, flip = false, className, style }: IconProps) {
  const url = `url(/icons/${name}_24_${filled ? 'filled' : 'regular'}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block size-4 flex-none bg-current', flip && '-scale-x-100', className)}
      style={{ mask: `${url} center / contain no-repeat`, WebkitMask: `${url} center / contain no-repeat`, ...style }}
    />
  );
}

/** The tiki-mask mark, drawn in `currentColor` (primary by default). */
export function WabbajackMark({ className }: { className?: string }) {
  const url = 'url(/wabbajack-mark.svg)';
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block flex-none bg-current text-primary', className)}
      style={{ mask: `${url} center / contain no-repeat`, WebkitMask: `${url} center / contain no-repeat` }}
    />
  );
}
