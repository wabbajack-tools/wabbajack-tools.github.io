import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useGlobalArchiveSearch, useFilteredArchives, useMultiArchiveSearch } from '@/hooks/useGlobalArchiveSearch';
import { useArchiveSearchFilters } from '@/hooks/useArchiveSearchFilters';
import { SearchLoadingProgress } from '@/components/search/SearchLoadingProgress';
import { GlobalSearchResults } from '@/components/search/GlobalSearchResults';
import { MultiArchiveResults } from '@/components/search/MultiArchiveResults';
import { SearchInput } from '@/components/search/ArchiveRow';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';

interface GlobalSearchParams {
  q?: string;
  nsfw?: string;
}

/**
 * The router JSON-parses search values, so `?q=2077` arrives as a number and `?nsfw=true` as a
 * boolean. Coerce back to strings so the page never sees a non-string query.
 */
function asSearchString(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  return typeof value === 'string' ? value : String(value);
}

export const Route = createFileRoute('/search/global')({
  component: GlobalSearchPage,
  validateSearch: (search: Record<string, unknown>): GlobalSearchParams => ({
    q: asSearchString(search.q),
    nsfw: asSearchString(search.nsfw),
  }),
});

function GlobalSearchPage() {
  const { allArchives, loadingState, isLoadingSummaries, error } = useGlobalArchiveSearch();
  const { filters, setQuery, setNsfw } = useArchiveSearchFilters();

  // Local state for debounced input
  const [inputValue, setInputValue] = useState(filters.q);

  // Sync input value with URL when filters.q changes (e.g. browser back/forward)
  const [prevQ, setPrevQ] = useState(filters.q);
  if (filters.q !== prevQ) {
    setPrevQ(filters.q);
    setInputValue(filters.q);
  }

  // Debounce search query updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== filters.q) {
        setQuery(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, filters.q, setQuery]);

  // Filter archives based on search query
  const { results: searchResults, isMultiSearch, searchTerms } = useFilteredArchives(allArchives, filters.q, filters.nsfw);

  // Multi-archive search (when using commas)
  const multiSearchResults = useMultiArchiveSearch(allArchives, searchTerms, filters.nsfw);

  // Still streaming the index while a query is active
  const isSearching = !loadingState.isComplete && filters.q.trim().length > 0;

  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-5 px-[clamp(16px,4vw,40px)] pt-8 pb-[72px]">
      <div>
        <h1 className="m-0 text-[36px] leading-[1.23] font-bold">Archive search</h1>
        <p className="mt-1.5 max-w-[640px] text-[16px] text-fg-66">
          Find which modlists include a specific mod, tool or resource.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          placeholder="Search archives, e.g. SkyUI"
          className="flex-[1_1_320px]"
        />
        <button
          type="button"
          onClick={() => setNsfw(!filters.nsfw)}
          aria-pressed={filters.nsfw}
          className="h-11 cursor-pointer rounded bg-surface px-3.5 text-[14px] text-fg hover:bg-hover hover:text-primary"
        >
          {filters.nsfw ? 'NSFW shown' : 'NSFW hidden'}
        </button>
      </div>
      <div className="-mt-3 text-fg-66">
        Separate terms with commas to find lists that contain all of them, e.g. “SKSE, SkyUI”.
      </div>

      {isLoadingSummaries && <LoadingSpinner message="Loading modlist index..." />}

      {error && <ErrorDisplay message="Unable to load modlist data. Please try again later." />}

      {!isLoadingSummaries && !error && (
        <>
          <SearchLoadingProgress loadingState={loadingState} />
          {isMultiSearch ? (
            <MultiArchiveResults results={multiSearchResults} searchTerms={searchTerms} isSearching={isSearching} />
          ) : (
            <GlobalSearchResults results={searchResults} query={filters.q} isSearching={isSearching} />
          )}
        </>
      )}
    </div>
  );
}
