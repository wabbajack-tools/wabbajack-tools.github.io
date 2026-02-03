import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, Tags, Search, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getGameDisplayName } from '@/types/game';
import type { CheckedState } from '@/components/ui/checkbox';
import type { GameWithCount } from '@/hooks/useGalleryFilters';
import { cn } from '@/lib/utils';

interface GalleryFiltersProps {
  nsfwChecked: CheckedState;
  featuredChecked: CheckedState;
  selectedGame: string;
  selectedTags: string[];
  searchText: string;
  availableGames: GameWithCount[];
  availableTags: Map<string, number>;
  onNsfwChange: (checked: CheckedState) => void;
  onFeaturedChange: (checked: CheckedState) => void;
  onGameChange: (game: string) => void;
  onTagToggle: (tag: string) => void;
  onSearchChange: (search: string) => void;
}

function cycleTriState(current: CheckedState): CheckedState {
  if (current === false) return true;
  if (current === true) return 'indeterminate';
  return false;
}

export function GalleryFilters({
  nsfwChecked,
  featuredChecked,
  selectedGame,
  selectedTags,
  searchText,
  availableGames,
  availableTags,
  onNsfwChange,
  onFeaturedChange,
  onGameChange,
  onTagToggle,
  onSearchChange,
}: GalleryFiltersProps) {
  const [tagSearch, setTagSearch] = useState('');
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

  // Sort tags by count (descending) and filter by search
  const sortedTags = useMemo(() => {
    const entries = [...availableTags.entries()];
    return entries
      .sort((a, b) => b[1] - a[1])
      .filter(([tag]) =>
        tag.toLowerCase().includes(tagSearch.toLowerCase())
      );
  }, [availableTags, tagSearch]);

  const isTagSelected = (tag: string) =>
    selectedTags.some((t) => t.toLowerCase() === tag.toLowerCase());

  return (
    <div className="space-y-4" >
      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-surface/60 backdrop-blur-sm border border-neon-purple/20"
      >
        <div className="flex items-center gap-2 text-neon-purple">
          <Filter className="h-5 w-5" />
          <span className="font-medium text-text-primary">Filters</span>
        </div>

        <div className="h-6 w-px bg-neon-purple/20 hidden sm:block" />

        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="Search modlists..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9"
          />
          {searchText && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-surface-light transition-colors"
            >
              <X className="h-3 w-3 text-text-muted hover:text-text-primary" />
            </button>
          )}
        </div>

        <div className="h-6 w-px bg-neon-purple/20 hidden sm:block" />

        <div className="flex items-center gap-4">

          <label className="flex items-center gap-2 cursor-pointer group">
              <span className="text-sm text-text-secondary">NSFW:</span>
            <Checkbox
              checked={nsfwChecked}
              onCheckedChange={() => onNsfwChange(cycleTriState(nsfwChecked))}
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors min-w-[80px]">
              {nsfwChecked === true ? 'Exclusively' : nsfwChecked === 'indeterminate' ? 'Included' : 'Hidden'}
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
              <span className="text-sm text-text-secondary">Featured Lists:</span>
            <Checkbox
              checked={featuredChecked}
              onCheckedChange={() => onFeaturedChange(cycleTriState(featuredChecked))}
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors min-w-[100px]">
              {featuredChecked === true ? 'Exclusively' : featuredChecked === 'indeterminate' ? 'Included' : 'Hidden'}
            </span>
          </label>
        </div>

        <div className="h-6 w-px bg-neon-purple/20 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Game:</span>
          <Select value={selectedGame} onValueChange={onGameChange}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="All Games" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Games</SelectItem>
              {availableGames.map(({ gameId, count }) => (
                <SelectItem key={gameId} value={gameId}>
                  {getGameDisplayName(gameId)} ({count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-6 w-px bg-neon-purple/20 hidden sm:block" />

        {/* Tags popover */}
        <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'gap-2',
                selectedTags.length > 0 && 'border-neon-purple/50 text-neon-purple'
              )}
            >
              <Tags className="h-4 w-4" />
              Tags
              {selectedTags.length > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-neon-purple text-white text-xs">
                  {selectedTags.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            {/* Search input */}
            <div className="p-3 border-b border-neon-purple/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Search tags..."
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </div>

            {/* Tags list */}
            <div className="max-h-64 overflow-y-auto p-2">
              {sortedTags.length === 0 ? (
                <p className="text-sm text-text-muted text-center py-4">
                  No tags found
                </p>
              ) : (
                <div className="space-y-1">
                  {sortedTags.map(([tag, count]) => {
                    const selected = isTagSelected(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => onTagToggle(tag)}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                          selected
                            ? 'bg-neon-purple/20 text-neon-purple'
                            : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <div
                            className={cn(
                              'w-4 h-4 rounded border flex items-center justify-center transition-colors',
                              selected
                                ? 'bg-neon-purple border-neon-purple'
                                : 'border-text-muted'
                            )}
                          >
                            {selected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          {tag}
                        </span>
                        <span className="text-xs text-text-muted">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer with clear button */}
            {selectedTags.length > 0 && (
              <div className="p-2 border-t border-neon-purple/10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-text-muted hover:text-text-primary"
                  onClick={() => {
                    selectedTags.forEach((tag) => onTagToggle(tag));
                  }}
                >
                  Clear all tags
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </motion.div>

      {/* Selected tags display */}
      {selectedTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-text-muted">Active tags:</span>
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className="group flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-neon-purple/20 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/30 transition-colors"
            >
              {tag}
              <X className="h-3 w-3 opacity-60 group-hover:opacity-100" />
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
