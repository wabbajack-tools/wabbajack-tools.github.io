import { useState, useMemo } from 'react';
import { Icon } from '@/components/common/Icon';
import { getGameDisplayName } from '@/types/game';
import type { GameWithCount, TriState } from '@/hooks/useGalleryFilters';
import { cn } from '@/lib/utils';

export interface GalleryFiltersProps {
  filters: {
    nsfw: TriState;
    featured: TriState;
    game: string;
    tags: string[];
    search: string;
  };
  /** Number of filters that differ from their defaults. */
  activeCount: number;
  /** Modlists matching every filter except the game (the "All games" count). */
  baseCount: number;
  availableGames: GameWithCount[];
  availableTags: Map<string, number>;
  onNsfwChange: (value: TriState) => void;
  onFeaturedChange: (value: TriState) => void;
  onGameChange: (game: string) => void;
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
  onSearchChange: (search: string) => void;
  onReset: () => void;
}

const NSFW_OPTIONS: [TriState, string][] = [
  ['false', 'Hidden'],
  ['true', 'Exclusively'],
  ['indeterminate', 'Included'],
];

const FEATURED_OPTIONS: [TriState, string][] = [
  ['indeterminate', 'Included'],
  ['true', 'Exclusively'],
  ['false', 'Hidden'],
];

const fieldClass =
  'w-full rounded-[4px] border border-surface bg-surface px-2 text-fg outline-none placeholder:text-fg-66 focus:border-surface-50';

function isTagSelected(selectedTags: string[], tag: string) {
  return selectedTags.some((t) => t.toLowerCase() === tag.toLowerCase());
}

function SegmentedControl({
  label,
  options,
  value,
  onChange,
  large,
}: {
  label: string;
  options: [TriState, string][];
  value: TriState;
  onChange: (value: TriState) => void;
  large?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-[12px] text-fg-66">{label}</div>
      <div role="radiogroup" aria-label={label} className="grid grid-cols-3 gap-0.5 rounded-[4px] bg-ground p-0.5">
        {options.map(([optionValue, optionLabel]) => {
          const on = optionValue === value;
          return (
            <button
              key={optionValue}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(optionValue)}
              className={cn(
                'cursor-pointer rounded-[3px] transition-colors duration-[80ms]',
                large ? 'h-10 text-[13px]' : 'h-7 text-[12px]',
                on ? 'bg-primary text-ground' : 'text-fg hover:bg-hover hover:text-primary'
              )}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GameSelect({
  value,
  baseCount,
  availableGames,
  onChange,
  className,
}: {
  value: string;
  baseCount: number;
  availableGames: GameWithCount[];
  onChange: (game: string) => void;
  className?: string;
}) {
  // Keep a selected game that no longer matches anything visible in the list.
  const selectedMissing =
    value !== 'all' && !availableGames.some((g) => g.gameId.toLowerCase() === value.toLowerCase());
  return (
    <select
      aria-label="Game"
      value={availableGames.find((g) => g.gameId.toLowerCase() === value.toLowerCase())?.gameId ?? value}
      onChange={(e) => onChange(e.target.value)}
      className={cn('cursor-pointer [&>option]:bg-surface', className)}
    >
      <option value="all">All games ({baseCount})</option>
      {selectedMissing && <option value={value}>{getGameDisplayName(value)} (0)</option>}
      {availableGames.map(({ gameId, count }) => (
        <option key={gameId} value={gameId}>
          {getGameDisplayName(gameId)} ({count})
        </option>
      ))}
    </select>
  );
}

const resetButtonClass =
  'flex cursor-pointer items-center justify-center gap-1.5 rounded-[4px] transition-colors duration-[80ms] hover:bg-hover hover:text-primary';

/** Wide layout (>= 1000px): sticky 270px filter column. */
export function GalleryFiltersAside({
  filters,
  baseCount,
  availableGames,
  availableTags,
  onNsfwChange,
  onFeaturedChange,
  onGameChange,
  onTagToggle,
  onClearTags,
  onSearchChange,
  onReset,
}: GalleryFiltersProps) {
  const [tagSearch, setTagSearch] = useState('');

  const sortedTags = useMemo(() => {
    const query = tagSearch.trim().toLowerCase();
    return [...availableTags.entries()]
      .sort((a, b) => b[1] - a[1])
      .filter(([tag]) => tag.toLowerCase().includes(query));
  }, [availableTags, tagSearch]);

  return (
    <aside className="sticky top-[88px] hidden max-h-[calc(100vh-104px)] w-[270px] flex-none flex-col gap-6 overflow-auto pr-1 [scrollbar-color:var(--color-surface-16)_var(--color-ground)] min-[1000px]:flex">
      <div className="flex flex-col gap-2">
        <label htmlFor="gallery-search">Search</label>
        <div className="relative flex">
          <input
            id="gallery-search"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Title, author, tag…"
            className={cn(fieldClass, 'h-9 pr-[34px] text-[13px]')}
          />
          {filters.search ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 grid w-8 cursor-pointer place-items-center text-primary"
            >
              <Icon name="dismiss" className="size-3.5" />
            </button>
          ) : (
            <span className="pointer-events-none absolute inset-y-0 right-0 grid w-8 place-items-center text-primary">
              <Icon name="search" className="size-4" />
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div>Game</div>
        <GameSelect
          value={filters.game}
          baseCount={baseCount}
          availableGames={availableGames}
          onChange={onGameChange}
          className={cn(fieldClass, 'h-9 text-[13px]')}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div>Include</div>
        <div className="flex flex-col gap-3 rounded-lg bg-surface p-3">
          <SegmentedControl label="NSFW" options={NSFW_OPTIONS} value={filters.nsfw} onChange={onNsfwChange} />
          <SegmentedControl
            label="Featured lists"
            options={FEATURED_OPTIONS}
            value={filters.featured}
            onChange={onFeaturedChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span>Tags</span>
          {filters.tags.length > 0 && (
            <button type="button" onClick={onClearTags} className="link cursor-pointer text-[12px]">
              Clear all
            </button>
          )}
        </div>
        <input
          aria-label="Filter tags"
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
          placeholder="Filter tags"
          className={cn(fieldClass, 'h-8 text-[13px]')}
        />
        <div className="flex max-h-[280px] flex-col gap-0.5 overflow-auto [scrollbar-color:var(--color-surface-16)_var(--color-ground)]">
          {sortedTags.length === 0 ? (
            <p className="m-0 px-1.5 py-2 text-fg-66">No tags found</p>
          ) : (
            sortedTags.map(([tag, count]) => {
              const on = isTagSelected(filters.tags, tag);
              return (
                <label
                  key={tag}
                  className="flex h-7 flex-none cursor-pointer items-center gap-2 rounded-[4px] px-1.5 hover:bg-surface"
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => onTagToggle(tag)}
                    className="m-0 size-4 accent-primary"
                  />
                  <span className={cn('flex-1 truncate', on ? 'text-primary' : 'text-fg')}>{tag}</span>
                  <span className="text-[12px] text-fg-25">{count}</span>
                </label>
              );
            })
          )}
        </div>
      </div>

      <button type="button" onClick={onReset} className={cn(resetButtonClass, 'h-8 flex-none bg-surface text-fg')}>
        <Icon name="filter_dismiss" className="size-4" />
        Reset filters
      </button>
    </aside>
  );
}

/** Narrow layout (< 1000px): search + "Filters" toggle with an inline panel. */
export function GalleryFiltersInline({
  filters,
  activeCount,
  baseCount,
  availableGames,
  availableTags,
  onNsfwChange,
  onFeaturedChange,
  onGameChange,
  onTagToggle,
  onSearchChange,
  onReset,
}: GalleryFiltersProps) {
  const [open, setOpen] = useState(false);

  const topTags = useMemo(
    () => [...availableTags.entries()].sort((a, b) => b[1] - a[1]).slice(0, 16),
    [availableTags]
  );

  return (
    <div className="flex flex-col gap-3 min-[1000px]:hidden">
      <div className="flex gap-2">
        <div className="relative flex flex-1">
          <input
            aria-label="Search modlists"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search modlists"
            className={cn(fieldClass, 'h-11 min-w-0 flex-1 px-2.5 text-[15px]', filters.search && 'pr-10')}
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 grid w-10 cursor-pointer place-items-center text-primary"
            >
              <Icon name="dismiss" className="size-4" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex h-11 cursor-pointer items-center gap-1.5 rounded-[4px] bg-surface px-3.5 text-[14px] text-fg transition-colors duration-[80ms] hover:bg-hover hover:text-primary"
        >
          Filters
          {activeCount > 0 && (
            <span className="h-5 min-w-5 rounded-[4px] bg-primary px-1.5 text-center text-[12px] leading-5 text-ground">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 rounded-lg bg-surface p-3">
          <GameSelect
            value={filters.game}
            baseCount={baseCount}
            availableGames={availableGames}
            onChange={onGameChange}
            className="h-11 rounded-[4px] border-0 bg-ground px-2 text-[15px] text-fg"
          />
          <SegmentedControl label="NSFW" options={NSFW_OPTIONS} value={filters.nsfw} onChange={onNsfwChange} large />
          <SegmentedControl
            label="Featured lists"
            options={FEATURED_OPTIONS}
            value={filters.featured}
            onChange={onFeaturedChange}
            large
          />
          <div className="text-[12px] text-fg-66">Tags</div>
          <div className="flex flex-wrap gap-1.5">
            {topTags.map(([tag, count]) => {
              const on = isTagSelected(filters.tags, tag);
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onTagToggle(tag)}
                  className={cn(
                    'h-9 cursor-pointer rounded-[4px] px-2.5 text-[13px]',
                    on ? 'bg-primary text-ground' : 'bg-ground text-fg'
                  )}
                >
                  {tag} <span className="opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={onReset} className={cn(resetButtonClass, 'h-10 bg-ground text-[14px] text-fg')}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
