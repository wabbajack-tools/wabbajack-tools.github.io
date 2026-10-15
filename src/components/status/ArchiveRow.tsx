import { Icon } from '@/components/common/Icon';
import { formatBytes } from '@/lib/utils';
import { isNexusArchive } from '@/types/search';
import type { ArchiveState, ValidatedArchive } from '@/types';

const SOURCE_LABELS: Record<string, string> = {
  Nexus: 'Nexus Mods',
  Http: 'Direct download',
  GoogleDrive: 'Google Drive',
  Mega: 'MEGA',
  ModDB: 'ModDB',
  MediaFire: 'MediaFire',
  GameFile: 'Game files',
  WabbajackCDN: 'Wabbajack CDN',
  Manual: 'Manual download',
  LoversLab: 'LoversLab',
  VectorPlexus: 'Vector Plexus',
  Bethesda: 'Bethesda.net',
};

/** "NexusDownloader, Wabbajack.Lib" → "Nexus Mods"; unknown downloaders fall back to their bare name. */
function sourceLabel(state: ArchiveState | undefined): string | undefined {
  const type = state?.$type?.split(',')[0]?.replace(/Downloader$/, '').replace(/OAuth$/, '').trim();
  if (!type) return undefined;
  return SOURCE_LABELS[type] ?? type;
}

/** The secondary line: where the archive comes from, the mod it belongs to, and its size, as far as the report says. */
function archiveDetails(archive: ValidatedArchive): string {
  const { State, Size, Name } = archive.Original;
  const parts: string[] = [];
  const source = sourceLabel(State);
  if (source) parts.push(source);
  if (State && isNexusArchive(State) && State.Name && State.Name !== Name) parts.push(State.Name);
  if (Size > 0) parts.push(formatBytes(Size, 1));
  return parts.join(' · ');
}

export function ArchiveRow({ archive }: { archive: ValidatedArchive }) {
  const details = archiveDetails(archive);
  return (
    <div className="flex items-center gap-3 rounded-lg bg-ground-raised p-3">
      <Icon name="dismiss" className="size-[18px] shrink-0 text-fail-border-hot" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold [overflow-wrap:anywhere]">{archive.Original.Name}</div>
        {details && <div className="mt-0.5 text-fg-66">{details}</div>}
      </div>
      <span className="rounded px-2 py-[3px] text-xs font-semibold bg-error text-on-error">Invalid</span>
    </div>
  );
}
