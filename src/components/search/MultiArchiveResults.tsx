import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import { SearchMessageBox } from './ArchiveRow';
import { formatSize } from './format';
import type { ModlistWithMatchedArchives } from '@/hooks/useGlobalArchiveSearch';
import type { Archive } from '@/types';

interface MultiArchiveResultsProps {
  results: ModlistWithMatchedArchives[];
  searchTerms: string[];
  isSearching: boolean;
}

const MAX_PREVIEW = 5;

function ArchivePreview({ archive }: { archive: Archive }) {
  const modName = archive.State?.Name && archive.State.Name !== archive.Name ? archive.State.Name : undefined;
  return (
    <div className="flex items-center gap-2.5 rounded bg-ground px-2.5 py-2">
      <Icon name="document_one_page_multiple" className="size-4 text-surface-50" />
      <div className="min-w-0 flex-1">
        <div className="[overflow-wrap:anywhere]">{archive.Name}</div>
        {modName && <div className="text-[12px] text-fg-66 [overflow-wrap:anywhere]">{modName}</div>}
      </div>
      <span className="text-[12px] whitespace-nowrap text-fg-66">{formatSize(archive.Size)}</span>
    </div>
  );
}

function ModlistResultCard({ result, searchTerms }: { result: ModlistWithMatchedArchives; searchTerms: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { modlist, matchedArchives } = result;

  const totalMatches = Array.from(matchedArchives.values()).reduce((sum, arr) => sum + arr.length, 0);
  const hasImage = !!modlist.smallImage && !imageError;

  return (
    <div className="overflow-hidden rounded-lg bg-ground-raised">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center gap-3 py-2.5 pr-3.5 pl-2.5 text-left hover:bg-surface"
      >
        <Icon
          name="chevron_right"
          className={cn('size-4 text-primary transition-transform duration-[80ms]', expanded && 'rotate-90')}
        />
        <div className={cn('aspect-video w-16 flex-none overflow-hidden rounded bg-tile', !hasImage && 'no-image')}>
          {hasImage && (
            <img
              src={modlist.smallImage}
              alt=""
              className="size-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="text-[15px] font-semibold">{modlist.name}</div>
          <div className="flex flex-wrap gap-1">
            {searchTerms.map((term) => (
              <span key={term} className="h-5 rounded bg-surface-16 px-1.5 text-[12px] leading-5">
                {term}: {matchedArchives.get(term)?.length || 0}
              </span>
            ))}
          </div>
        </div>
        <div className="whitespace-nowrap text-fg-66">
          {totalMatches} {totalMatches === 1 ? 'match' : 'matches'}
        </div>
      </button>

      {expanded && (
        <div className="flex flex-col gap-3 px-3.5 pt-1 pb-3.5">
          {searchTerms.map((term) => {
            const archives = matchedArchives.get(term) || [];
            return (
              <div key={term} className="flex flex-col gap-1">
                <div className="mb-0.5 font-bold text-primary">
                  “{term}” · {archives.length} {archives.length === 1 ? 'match' : 'matches'}
                </div>
                {archives.slice(0, MAX_PREVIEW).map((archive) => (
                  <ArchivePreview key={archive.Hash} archive={archive} />
                ))}
                {archives.length > MAX_PREVIEW && (
                  <div className="pl-0.5 text-[12px] text-fg-66">+{archives.length - MAX_PREVIEW} more archives</div>
                )}
              </div>
            );
          })}
          <div>
            <Link to="/modlist/$repo/$id" params={{ repo: modlist.repo, id: modlist.machineURL }} className="link">
              View modlist details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function MultiArchiveResults({ results, searchTerms, isSearching }: MultiArchiveResultsProps) {
  const termsLabel = searchTerms.map((t) => `“${t}”`).join(' + ');

  if (results.length === 0 && !isSearching) {
    return (
      <SearchMessageBox
        title="No modlists match"
        message={<>No modlist contains archives matching all of: {termsLabel}</>}
      />
    );
  }

  return (
    <>
      <div className="text-fg-66">
        Found <span className="font-bold text-primary">{results.length.toLocaleString()}</span>{' '}
        {results.length === 1 ? 'modlist' : 'modlists'} containing all of: {termsLabel}
      </div>
      <div className="flex flex-col gap-1.5">
        {results.map((result) => (
          <ModlistResultCard
            key={`${result.modlist.repo}/${result.modlist.machineURL}`}
            result={result}
            searchTerms={searchTerms}
          />
        ))}
      </div>
    </>
  );
}
