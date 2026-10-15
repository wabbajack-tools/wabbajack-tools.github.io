import { ArchiveResultCard } from './ArchiveResultCard';
import { SearchMessageBox } from './ArchiveRow';
import type { GlobalArchiveResult } from '@/types/search';

interface GlobalSearchResultsProps {
  results: GlobalArchiveResult[];
  query: string;
  isSearching: boolean;
}

const RESULT_LIMIT = 500;

export function GlobalSearchResults({ results, query, isSearching }: GlobalSearchResultsProps) {
  if (!query.trim()) {
    return (
      <SearchMessageBox
        icon
        title="Search every modlist at once"
        message="Type a mod or file name to see which lists use it."
      />
    );
  }

  if (results.length === 0 && !isSearching) {
    return (
      <SearchMessageBox
        title={<>No archives match “{query.trim()}”</>}
        message="Results appear as archives load. Try a shorter or different term."
      />
    );
  }

  return (
    <>
      <div className="text-fg-66">
        Found{' '}
        <span className="font-bold text-primary">
          {results.length.toLocaleString()}
          {results.length >= RESULT_LIMIT && '+'}
        </span>{' '}
        unique archives, most used first
      </div>
      <div className="flex flex-col gap-1.5">
        {results.map((result) => (
          <ArchiveResultCard key={result.archive.Hash} result={result} />
        ))}
      </div>
    </>
  );
}
