import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getGameDisplayName } from '@/types/game';
import type { CheckedState } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface GalleryFiltersProps {
  nsfwChecked: CheckedState;
  featuredChecked: CheckedState;
  selectedGame: string;
  selectedTags: string[];
  availableGames: string[];
  availableTags: Map<string, number>;
  onNsfwChange: (checked: CheckedState) => void;
  onFeaturedChange: (checked: CheckedState) => void;
  onGameChange: (game: string) => void;
  onTagToggle: (tag: string) => void;
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
  availableGames,
  availableTags,
  onNsfwChange,
  onFeaturedChange,
  onGameChange,
  onTagToggle,
}: GalleryFiltersProps) {
  return (
    <div className="space-y-2">
      {/* Filter bar */}
      <div className="flex flex-wrap items-end justify-end md:gap-4 bg-wabbajack-cards-background-base rounded-md p-2">
        <label className="w-full md:w-auto font-semibold text-lg inline-flex items-center m-1 cursor-pointer">
          Show NSFW:
          <Checkbox
            checked={nsfwChecked}
            onCheckedChange={() => onNsfwChange(cycleTriState(nsfwChecked))}
            className="ml-2"
          />
        </label>

        <label className="w-full md:w-auto font-semibold text-lg inline-flex items-center m-1 cursor-pointer">
          Show non featured Lists:
          <Checkbox
            checked={featuredChecked}
            onCheckedChange={() => onFeaturedChange(cycleTriState(featuredChecked))}
            className="ml-2"
          />
        </label>

        <label className="w-full md:w-auto font-semibold text-lg inline-flex items-center my-1 pr-1">
          <span className="mr-2">Select Game:</span>
          <Select value={selectedGame} onValueChange={onGameChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Games" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Games</SelectItem>
              {availableGames.map((game) => (
                <SelectItem key={game} value={game}>
                  {getGameDisplayName(game)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      {/* Tag filter */}
      {availableTags.size > 0 && (
        <div className="flex flex-wrap gap-2 bg-wabbajack-cards-background-base rounded-md p-2">
          {[...availableTags.entries()].map(([tag, count]) => {
            const isSelected = selectedTags.some(
              (t) => t.toLowerCase() === tag.toLowerCase()
            );
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={cn(
                  'flex items-center justify-center rounded-2xl px-2 py-1 border-2 border-gray-200 transition-colors',
                  isSelected && 'bg-wabbajack-purple-dark text-white border-wabbajack-purple-dark'
                )}
              >
                {tag} ({count})
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
