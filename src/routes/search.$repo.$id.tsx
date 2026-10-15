import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo, useRef, useEffect, useLayoutEffect, type ReactNode } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useDetailedStatus } from '@/hooks/useModlistStatus';
import { useModlist } from '@/hooks/useModlists';
import { ArchiveRow, SearchInput, SearchMessageBox } from '@/components/search/ArchiveRow';
import { Icon } from '@/components/common/Icon';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import type { Archive, ValidatedArchive } from '@/types';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export const Route = createFileRoute('/search/$repo/$id')({
  component: ArchiveSearchPage,
});

/** Gap between rows; the virtualizer measures each row including it. */
const ROW_GAP = 6;

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-5 px-[clamp(16px,4vw,40px)] pt-7 pb-[72px]">
      {children}
    </div>
  );
}

function ArchiveSearchPage() {
  const { repo, id } = Route.useParams();
  const { data: status, isLoading, error } = useDetailedStatus(repo, id);
  const { data: modlist } = useModlist(repo, id);

  const [searchString, setSearchString] = useState('');
  const debouncedSearch = useDebounce(searchString, 200);

  const listRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  const archives = useMemo(() => {
    if (!status?.Archives) return [];

    return status.Archives.map((va: ValidatedArchive) => va.Original)
      .filter((archive: Archive) => {
        if (!debouncedSearch.trim()) return true;
        const search = debouncedSearch.toLowerCase();
        const stateName = archive.State?.Name || '';
        const author = (archive.State as { Author?: string })?.Author || '';
        const description = (archive.State as { Description?: string })?.Description || '';
        return (
          archive.Name.toLowerCase().includes(search) ||
          stateName.toLowerCase().includes(search) ||
          author.toLowerCase().includes(search) ||
          description.toLowerCase().includes(search)
        );
      })
      .sort((a: Archive, b: Archive) => a.Name.localeCompare(b.Name));
  }, [status, debouncedSearch]);

  const virtualizer = useWindowVirtualizer({
    count: archives.length,
    estimateSize: () => 96,
    overscan: 10,
    scrollMargin,
  });

  // The list scrolls with the page: tell the virtualizer where it starts in the document.
  const hasList = archives.length > 0;
  useLayoutEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current;
    const update = () => setScrollMargin(el.getBoundingClientRect().top + window.scrollY);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [hasList, isLoading]);

  const totalArchives = status?.Archives?.length || 0;
  const title = modlist?.title || status?.Name || id;

  if (error) {
    return (
      <PageShell>
        <ErrorDisplay message={`Error loading archives for ${repo}/${id}`} />
      </PageShell>
    );
  }

  if (isLoading) {
    return (
      <PageShell>
        <LoadingSpinner message="Loading archives..." />
      </PageShell>
    );
  }

  if (status?.Status === 'ForcedDown') {
    return (
      <PageShell>
        <ErrorDisplay message="Modlist has been forced down. Archives are not available." />
      </PageShell>
    );
  }

  if (!status) {
    return (
      <PageShell>
        <ErrorDisplay message={`Could not find archives for ${repo}/${id}`} />
      </PageShell>
    );
  }

  const query = debouncedSearch.trim();
  const image = modlist?.links?.image;

  return (
    <PageShell>
      <div>
        <Link
          to="/modlist/$repo/$id"
          params={{ repo, id }}
          className="inline-flex h-8 items-center gap-1 rounded bg-surface pr-3 pl-2 text-fg hover:bg-hover hover:text-primary"
        >
          <Icon name="chevron_right" flip />
          Back to {title}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative aspect-video w-32 flex-none overflow-hidden rounded-lg bg-tile">
          {image && <img src={image} alt="" className="absolute inset-0 size-full object-cover" />}
        </div>
        <div className="min-w-0">
          <h1 className="m-0 text-[clamp(28px,4vw,36px)] leading-[1.23] font-bold [overflow-wrap:anywhere]">
            {title}
          </h1>
          <p className="mt-1 text-[15px] text-fg-66">
            Search through{' '}
            <span className="font-semibold text-primary">{totalArchives.toLocaleString()}</span> archives in this
            modlist
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-[2] flex flex-col gap-2 bg-ground py-2">
        <SearchInput value={searchString} onChange={setSearchString} placeholder="Search by file, mod or author" />
        <div className="text-fg-66">
          {query
            ? `Found ${archives.length.toLocaleString()} of ${totalArchives.toLocaleString()}`
            : `Showing all ${totalArchives.toLocaleString()}`}
        </div>
      </div>

      {hasList ? (
        <div ref={listRef} className="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
                paddingBottom: ROW_GAP,
              }}
            >
              <ArchiveRow archive={archives[virtualItem.index]} />
            </div>
          ))}
        </div>
      ) : query ? (
        <SearchMessageBox
          title={<>No archives match “{query}”</>}
          message="Check the spelling, or search for part of the file name."
        />
      ) : (
        <SearchMessageBox title="No archives" message="This modlist has no archives to search." />
      )}
    </PageShell>
  );
}
