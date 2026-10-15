import { useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Icon } from '@/components/common/Icon';
import { canRenderReadme, cn, isValidDiscordUrl } from '@/lib/utils';
import { getGameDisplayName, getGameIcon } from '@/types/game';
import type { ModlistMetadata } from '@/types';

interface ModlistCardProps {
  modlist: ModlistMetadata;
}

/** Compact byte size as the design prints it: "98.0 GB", "142 GB", "410 MB". */
function formatSize(bytes: number | undefined): string | null {
  if (!bytes) return null;
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value >= 100 ? value.toFixed(0) : value.toFixed(1)} ${units[i]}`;
}

const pillClass = 'inline-flex h-[26px] flex-none items-center rounded-[4px] px-2';

// As in the app's gallery tile, some details only show while the tile is hovered (or focused).
// Devices without hover always see the ones that identify the list.
const onHover = 'group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100';
const hiddenUntilHover = `opacity-0 transition-opacity duration-[80ms] ${onHover}`;
const buttonClass =
  'inline-flex h-8 items-center justify-center gap-1 rounded-[4px] px-2.5 transition-colors duration-[80ms] hover:bg-hover hover:text-primary';

export function ModlistCard({ modlist }: ModlistCardProps) {
  const isExternalLink = !canRenderReadme(modlist.links.readme);
  const image = modlist.validationSummary?.SmallImage || modlist.links.image;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = !!image && !imageFailed;
  const forceDown = modlist.force_down;
  const [iconFailed, setIconFailed] = useState(false);
  const gameIcon = getGameIcon(modlist.game);
  // A list whose image already carries its name shows the title only on hover.
  const titleOnHover = modlist.image_contains_title && showImage;

  const meta = modlist.download_metadata;
  const downloadSize = formatSize(meta?.SizeOfArchives || meta?.Size);
  const installSize = formatSize(meta?.SizeOfInstalledFiles);
  const hasSizes = !!(downloadSize || installSize);

  const tags = [...new Set(modlist.tags ?? [])].filter(Boolean);
  const routeParams = { repo: modlist.repositoryName, id: modlist.links.machineURL };

  // Opens the readme the same way the primary button does: internal details page, or offsite.
  const openLink = (className: string, label: string | undefined, children: ReactNode) =>
    isExternalLink ? (
      <a
        href={modlist.links.readme}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={className}
      >
        {children}
      </a>
    ) : (
      <Link to="/modlist/$repo/$id" params={routeParams} aria-label={label} className={className}>
        {children}
      </Link>
    );

  const imageArea = (
    <>
      {showImage && (
        <img
          src={image}
          alt=""
          loading="lazy"
          crossOrigin="anonymous"
          onError={() => setImageFailed(true)}
          className={cn(
            'absolute inset-0 size-full object-cover',
            forceDown && 'transition-[filter] duration-[80ms] group-hover/tile:scale-110 group-hover/tile:blur-[10px]'
          )}
        />
      )}
      {!showImage && <div className="no-image absolute inset-0" />}
      {/* Top glow brightens on hover, bottom shade keeps the title legible. */}
      <div className="pointer-events-none absolute -inset-x-20 -top-[95px] h-[120px] bg-white opacity-5 blur-[60px] transition-opacity duration-[80ms] group-hover/tile:opacity-30" />
      <div
        className={cn(
          'pointer-events-none absolute -inset-x-20 -bottom-[75px] h-[150px] bg-black blur-[50px]',
          titleOnHover ? `opacity-0 transition-opacity duration-[80ms] group-hover/tile:opacity-75 group-focus-visible/tile:opacity-75 [@media(hover:none)]:opacity-75` : 'opacity-75'
        )}
      />
      {forceDown && (
        <div className={cn('absolute inset-0', hiddenUntilHover)}>
          <div className="absolute inset-0 bg-unavailable-dark opacity-75" />
          <div className="absolute inset-0 grid place-items-center px-6 pt-10 pb-14 text-center text-[15px] leading-[1.35]">
            A game or mod update has made the list unavailable. It needs an update from its author
            before it can be installed.
          </div>
        </div>
      )}
      <div className="absolute inset-x-2 top-2 flex items-center gap-1">
        {gameIcon && !iconFailed && (
          <img
            src={gameIcon}
            alt=""
            loading="lazy"
            onError={() => setIconFailed(true)}
            className="size-[26px] flex-none rounded-md object-cover"
          />
        )}
        <span
          className={cn(
            pillClass,
            'min-w-0 flex-initial truncate bg-ground/66',
            gameIcon && !iconFailed && `${hiddenUntilHover} [@media(hover:none)]:opacity-100`
          )}
        >
          {getGameDisplayName(modlist.game)}
        </span>
        <span className="flex-1" />
        {modlist.nsfw && (
          <span className={cn(pillClass, 'bg-nsfw shadow-[0_0_30px_4px_var(--color-nsfw)]')}>NSFW</span>
        )}
        {forceDown && (
          <span className={cn(pillClass, 'bg-unavailable shadow-[0_0_30px_4px_var(--color-unavailable)]')}>
            Unavailable
          </span>
        )}
      </div>
      <div
        className={cn(
          'absolute inset-x-2.5 bottom-2 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-2',
          titleOnHover && `${hiddenUntilHover} [@media(hover:none)]:opacity-100`
        )}
      >
        <div className="col-span-full mb-0.5 truncate text-[22px] leading-[1.23] font-bold [text-shadow:0_1px_8px_#0009]">
          {modlist.title}
        </div>
        <div className="truncate">
          <span className="text-fg-66">by </span>
          {modlist.author}
        </div>
        {hasSizes && (
          <div className="flex gap-2 whitespace-nowrap text-fg-66">
            <span title="Download size" className="inline-flex items-center gap-1">
              <Icon name="arrow_download" filled className="size-[13px]" />
              {downloadSize ?? '—'}
            </span>
            <span title="Install size" className="inline-flex items-center gap-1">
              <Icon name="games" filled className="size-[13px]" />
              {installSize ?? '—'}
            </span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <article className="flex min-w-0 flex-col gap-2.5">
      {openLink(
        'group/tile relative isolate block aspect-video overflow-hidden rounded-lg bg-tile text-fg shadow-tile',
        isExternalLink ? `${modlist.title} (opens readme in a new tab)` : modlist.title,
        imageArea
      )}

      <p className="m-0 line-clamp-2 min-h-10 text-[13px] leading-5 text-fg-66">{modlist.description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="h-[22px] rounded-[4px] bg-ground-raised px-2 text-[12px] leading-[22px] text-fg-88">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="h-[22px] px-1.5 text-[12px] leading-[22px] text-fg-66">+{tags.length - 3}</span>
          )}
        </div>
      )}

      <div className="flex gap-1.5">
        <Link
          to="/search/$repo/$id"
          params={routeParams}
          className={cn(buttonClass, 'flex-1 bg-surface text-fg')}
        >
          <Icon name="search" className="size-4" />
          Archives
        </Link>

        {isValidDiscordUrl(modlist.links.discordURL) && (
          <a
            href={modlist.links.discordURL}
            target="_blank"
            rel="noopener noreferrer"
            title="Discord"
            className={cn(buttonClass, 'bg-surface font-normal text-fg')}
          >
            Discord
          </a>
        )}

        {openLink(cn(buttonClass, 'flex-1 bg-primary text-ground'), undefined, isExternalLink ? 'View ↗' : 'Details')}
      </div>
    </article>
  );
}
