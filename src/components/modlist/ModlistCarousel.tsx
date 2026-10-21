import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { getGameDisplayName } from '@/types/game';
import type { ModlistMetadata } from '@/types/modlist';
import { FALLBACK_CAROUSEL_IMAGE } from '@/lib/constants';
import { useFeaturedModlists } from '@/hooks/useModlists';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

const MAX_DOTS = 10;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const navButton =
  'grid size-9 cursor-pointer place-items-center rounded-[4px] bg-surface text-fg hover:bg-hover hover:text-primary';

export function ModlistCarousel() {
  const { data: modlists, isLoading } = useFeaturedModlists();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalModlists, setFinalModlists] = useState<ModlistMetadata[]>([]);
  const previousOrderKeyRef = useRef('');

  const orderKey = useMemo(() => {
    if (!modlists?.length) return '';
    return modlists.map((m) => `${m.repositoryName}/${m.links.machineURL}`).join('|');
  }, [modlists]);

  useEffect(() => {
    if (!modlists?.length) {
      setFinalModlists([]);
      previousOrderKeyRef.current = '';
      return;
    }

    if (orderKey === previousOrderKeyRef.current) {
      return;
    }

    previousOrderKeyRef.current = orderKey;
    setFinalModlists(shuffleArray(modlists));
  }, [modlists, orderKey]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [orderKey]);

  if (isLoading) {
    return <div className="aspect-video max-h-[640px] w-full rounded-lg bg-tile" aria-label="Loading featured modlists" />;
  }

  if (!finalModlists.length) {
    return null;
  }

  const count = finalModlists.length;
  const index = ((currentIndex % count) + count) % count;
  const current = finalModlists[index];
  const imageUrl = current.validationSummary?.LargeImage || current.links.image || FALLBACK_CAROUSEL_IMAGE;

  return (
    <div>
      <Link
        to="/modlist/$repo/$id"
        params={{ repo: current.repositoryName, id: current.links.machineURL }}
        className="relative block aspect-video max-h-[640px] w-full overflow-hidden rounded-lg bg-tile shadow-[2px_2px_25px_0_#00000040]"
      >
        <img
          key={imageUrl}
          src={imageUrl}
          alt={`Image of Modlist ${current.title}`}
          className="absolute inset-0 size-full object-cover"
          loading="eager"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.endsWith(FALLBACK_CAROUSEL_IMAGE)) img.src = FALLBACK_CAROUSEL_IMAGE;
          }}
        />
        <div className="absolute -inset-x-[10%] -bottom-[30%] h-[70%] bg-black opacity-75 blur-[80px]" />
        <div className="absolute top-3 left-3 flex gap-1">
          <span className="inline-flex h-[26px] items-center rounded-[4px] bg-ground/66 px-2">
            {getGameDisplayName(current.game)}
          </span>
        </div>
        <div className="absolute inset-x-[clamp(12px,3vw,32px)] bottom-[clamp(12px,3vw,28px)] flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[clamp(24px,4.4vw,48px)] leading-[1.15] font-bold [text-shadow:0_1px_12px_#0008]">
              {current.title}
            </div>
            <div className="mt-1 text-[clamp(14px,1.6vw,18px)] leading-[1.3]">
              <span className="text-fg-66">by </span>
              {current.author}
            </div>
          </div>
          <span className="inline-flex h-8 items-center gap-1 rounded-[4px] bg-primary px-3 text-ground">
            View details
            <Icon name="chevron_right" />
          </span>
        </div>
      </Link>

      <div className="mt-3.5 flex items-center gap-3">
        <button type="button" onClick={() => setCurrentIndex(index - 1)} className={navButton} aria-label="Previous modlist">
          <Icon name="chevron_right" flip />
        </button>
        <button type="button" onClick={() => setCurrentIndex(index + 1)} className={navButton} aria-label="Next modlist">
          <Icon name="chevron_right" />
        </button>
        <div className="ml-2 flex flex-wrap items-center gap-1.5">
          {finalModlists.slice(0, MAX_DOTS).map((m, i) => (
            <button
              key={`${m.repositoryName}/${m.links.machineURL}`}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'h-1.5 cursor-pointer rounded-[3px] transition-[width] duration-80',
                i === index ? 'w-6 bg-primary' : 'w-2 bg-surface-16',
              )}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
            />
          ))}
          {count > MAX_DOTS && <span className="ml-1 text-fg-66">+{count - MAX_DOTS}</span>}
        </div>
      </div>
    </div>
  );
}
