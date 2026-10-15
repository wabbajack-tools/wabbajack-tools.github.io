import { createFileRoute } from '@tanstack/react-router';
import { useModlists } from '@/hooks/useModlists';
import {
  useGalleryFilters,
  useFilteredModlists,
  useAvailableTags,
  useAvailableGames,
  parseGallerySearch,
} from '@/hooks/useGalleryFilters';
import { ModlistGrid, ModlistGridSkeleton } from '@/components/modlist/ModlistGrid';
import {
  GalleryFiltersAside,
  GalleryFiltersInline,
  type GalleryFiltersProps,
} from '@/components/modlist/GalleryFilters';
import { Icon } from '@/components/common/Icon';

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
  validateSearch: parseGallerySearch,
});

const buttonClass =
  'h-8 px-3 rounded-[4px] bg-surface text-fg cursor-pointer transition-colors duration-[80ms] hover:bg-hover hover:text-primary';

function GalleryPage() {
  const { data: modlists, isLoading, error, refetch, isRefetching } = useModlists();
  const {
    filters,
    activeCount,
    setNsfw,
    setFeatured,
    setGame,
    toggleTag,
    clearTags,
    setSearch,
    resetFilters,
  } = useGalleryFilters();

  const filteredModlists = useFilteredModlists(modlists, filters);
  // Get modlists filtered by everything except game, so game counts reflect other active filters
  const modlistsWithoutGameFilter = useFilteredModlists(modlists, filters, { skipGameFilter: true });
  const availableTags = useAvailableTags(filteredModlists);
  const availableGames = useAvailableGames(modlistsWithoutGameFilter);

  const filterProps: GalleryFiltersProps = {
    filters,
    activeCount,
    baseCount: modlistsWithoutGameFilter.length,
    availableGames,
    availableTags,
    onNsfwChange: setNsfw,
    onFeaturedChange: setFeatured,
    onGameChange: setGame,
    onTagToggle: toggleTag,
    onClearTags: clearTags,
    onSearchChange: setSearch,
    onReset: resetFilters,
  };

  const showEmpty = !isLoading && !error && filteredModlists.length === 0;
  const showGrid = !isLoading && !error && filteredModlists.length > 0;

  return (
    <div className="mx-auto flex max-w-[1440px] items-start gap-8 px-[clamp(16px,3vw,32px)] pt-8 pb-16">
      <GalleryFiltersAside {...filterProps} />

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h1 className="m-0 text-[36px] leading-[1.23] font-bold">Modlist gallery</h1>
          <p className="m-0 text-[16px] text-fg-66">
            <span className="font-semibold text-primary">
              {isLoading ? '…' : error ? 0 : filteredModlists.length.toLocaleString('en-US')}
            </span>{' '}
            modlists available
          </p>
        </div>

        <GalleryFiltersInline {...filterProps} />

        {filters.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {filters.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-label={`Remove tag ${tag}`}
                className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-[4px] bg-hover pr-2 pl-2.5 text-primary transition-colors duration-[80ms] hover:bg-surface-32"
              >
                {tag}
                <Icon name="dismiss" className="size-3" />
              </button>
            ))}
          </div>
        )}

        {isLoading && <ModlistGridSkeleton />}

        {error && !isLoading && (
          <div className="flex flex-col items-start gap-3 rounded-lg bg-error px-6 py-12 text-on-error">
            <Icon name="warning" className="size-7" />
            <div className="text-[24px] leading-[1.23] font-semibold">The gallery couldn't load</div>
            <p className="m-0 max-w-[560px] text-[14px] leading-[21px]">
              Unable to load Modlists from GitHub! Check your connection, then try again. If it keeps
              happening, GitHub may be down.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="h-8 cursor-pointer rounded-[4px] bg-on-error px-3 text-error disabled:cursor-default disabled:opacity-70"
            >
              {isRefetching ? 'Retrying…' : 'Try again'}
            </button>
          </div>
        )}

        {showEmpty && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border-[3px] border-surface px-6 py-16 text-center">
            <Icon name="search" className="size-9 text-primary" />
            <div className="text-[24px] leading-[1.23] font-semibold">No modlists found</div>
            <p className="m-0 text-[14px] text-fg-66">Try adjusting your filters.</p>
            <button type="button" onClick={resetFilters} className={buttonClass}>
              Reset filters
            </button>
          </div>
        )}

        {showGrid && <ModlistGrid modlists={filteredModlists} />}
      </div>
    </div>
  );
}
