import { useState, type ReactNode } from 'react';
import { Icon } from '@/components/common/Icon';
import { isNexusArchive } from '@/types/search';
import { cn } from '@/lib/utils';
import type { Archive } from '@/types';
import { formatSize } from './format';

interface ArchiveRowProps {
  archive: Archive;
  /** Extra content under the description (e.g. the "Used by" chips of the global search). */
  children?: ReactNode;
}

/** One archive as a ground-raised card: thumbnail, file name, mod + author, description, size. */
export function ArchiveRow({ archive, children }: ArchiveRowProps) {
  const state = archive.State;
  const isNexus = isNexusArchive(state);
  const [imageError, setImageError] = useState(false);

  const modName = state?.Name && state.Name !== archive.Name ? state.Name : undefined;
  const author = isNexus ? state.Author : undefined;
  const description = isNexus ? state.Description : undefined;
  const imageUrl = isNexus ? state.ImageURL : undefined;
  const hasImage = !!imageUrl && !imageError;

  return (
    <div className="flex items-start gap-3.5 rounded-lg bg-ground-raised p-3 hover:bg-surface">
      <div className="grid h-12 w-[72px] flex-none place-items-center overflow-hidden rounded bg-tile">
        {hasImage ? (
          <img
            src={imageUrl}
            alt=""
            className="size-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <Icon name="document_one_page_multiple" className="size-[22px] text-surface-50" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <div className="text-[14px] font-semibold [overflow-wrap:anywhere]">{archive.Name}</div>
        {(modName || author) && (
          <div className="[overflow-wrap:anywhere]">
            {modName && <span className="font-bold text-primary">{modName}</span>}
            {author && (
              <>
                <span className="text-fg-66">{modName ? ' by ' : 'by '}</span>
                {author}
              </>
            )}
          </div>
        )}
        {description && (
          <div className="line-clamp-2 leading-[19px] text-fg-66 [overflow-wrap:anywhere]">
            {description}
          </div>
        )}
        {children}
      </div>

      <div className="flex-none text-[12px] whitespace-nowrap text-fg-66">{formatSize(archive.Size)}</div>
    </div>
  );
}

/** The outline box used for empty and no-result states. */
export function SearchMessageBox({
  title,
  message,
  icon = false,
}: {
  title: ReactNode;
  message: ReactNode;
  icon?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl border-[3px] border-surface px-4 py-12 text-center">
      {icon && <Icon name="search" className="mb-0.5 size-8 text-primary" />}
      <div className="text-[20px] font-semibold">{title}</div>
      <div className="text-fg-66">{message}</div>
    </div>
  );
}

/** Search input with the search glyph on the right, 44px tall. */
export function SearchInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={cn('relative flex', className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-11 min-w-0 flex-1 rounded border border-surface bg-surface pr-10 pl-3 text-[15px] text-fg outline-none placeholder:text-fg-66 focus:border-primary"
      />
      <span className="pointer-events-none absolute inset-y-0 right-0 grid w-10 place-items-center">
        <Icon name="search" className="size-[18px] text-primary" />
      </span>
    </div>
  );
}
