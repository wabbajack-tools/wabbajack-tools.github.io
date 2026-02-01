import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
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
    <div className="space-y-4">
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

        <label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox
            checked={nsfwChecked}
            onCheckedChange={() => onNsfwChange(cycleTriState(nsfwChecked))}
          />
          <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
            Show NSFW
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox
            checked={featuredChecked}
            onCheckedChange={() => onFeaturedChange(cycleTriState(featuredChecked))}
          />
          <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
            Non-featured
          </span>
        </label>

        <div className="h-6 w-px bg-neon-purple/20 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Game:</span>
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
        </div>
      </motion.div>

      {/* Tag filter */}
      {availableTags.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 p-4 rounded-xl bg-surface/40 backdrop-blur-sm border border-neon-purple/10"
        >
          {[...availableTags.entries()].map(([tag, count]) => {
            const isSelected = selectedTags.some(
              (t) => t.toLowerCase() === tag.toLowerCase()
            );
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={cn(
                  'group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  isSelected
                    ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'bg-surface-light/50 text-text-secondary border border-neon-purple/20 hover:border-neon-purple/50 hover:text-text-primary'
                )}
              >
                {tag}
                <span
                  className={cn(
                    'text-xs',
                    isSelected ? 'text-white/70' : 'text-text-muted'
                  )}
                >
                  ({count})
                </span>
                {isSelected && (
                  <X className="h-3 w-3 ml-1 opacity-70 group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </motion.div>
      )}

      {/* Active filters summary */}
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-muted">Active filters:</span>
          <div className="flex flex-wrap gap-1">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="glow"
                className="cursor-pointer"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
