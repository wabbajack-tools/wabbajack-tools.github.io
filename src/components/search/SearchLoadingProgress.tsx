import { Icon } from '@/components/common/Icon';
import type { SearchLoadingState } from '@/types/search';

interface SearchLoadingProgressProps {
  loadingState: SearchLoadingState;
}

/** The streaming-index panel: a primary fill that grows with the share of modlists loaded. */
export function SearchLoadingProgress({ loadingState }: SearchLoadingProgressProps) {
  const { totalModlists, loadedModlists, loadedArchives, isComplete } = loadingState;
  const progress = totalModlists > 0 ? (loadedModlists / totalModlists) * 100 : 0;
  const width = `${isComplete ? 100 : progress}%`;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(isComplete ? 100 : progress)}
      aria-label="Archive index loading progress"
      className="relative flex items-center gap-2.5 overflow-hidden rounded-lg bg-surface px-3.5 py-3"
    >
      <div
        className="absolute inset-y-0 left-0 bg-primary/16 transition-[width] duration-300"
        style={{ width }}
      />
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary/80 transition-[width] duration-300"
        style={{ width }}
      />
      {isComplete && <Icon name="checkmark_circle" filled className="relative size-4 text-success" />}
      <span className="relative">
        {isComplete ? 'Loaded ' : 'Loading '}
        <span className="font-bold text-primary">{loadedArchives.toLocaleString()}</span> archives
        from{' '}
        <span className="font-bold text-primary">
          {isComplete ? totalModlists.toLocaleString() : `${loadedModlists}/${totalModlists}`}
        </span>{' '}
        modlists{!isComplete && '…'}
      </span>
    </div>
  );
}
