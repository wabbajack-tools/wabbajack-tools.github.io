import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { carouselSlide, defaultTransition } from '@/lib/animations';
import { getGameDisplayName } from '@/types/game';
import { FALLBACK_CAROUSEL_IMAGE } from '@/lib/constants';
import { useFeaturedModlists } from '@/hooks/useModlists';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function ModlistCarousel() {
  const { data: modlists, isLoading } = useFeaturedModlists();
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  // Shuffle modlists on mount
  const shuffledModlists = useMemo(() => {
    if (!modlists) return [];
    return [...modlists].sort(() => Math.random() - 0.5);
  }, [modlists]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto bg-gray-900">
        <LoadingSpinner message="Loading featured modlists..." />
      </div>
    );
  }

  if (!shuffledModlists.length) {
    return null;
  }

  const currentModlist = shuffledModlists[currentIndex];
  const imageUrl = currentModlist.validationSummary?.LargeImage || currentModlist.links.image || FALLBACK_CAROUSEL_IMAGE;

  const paginate = (newDirection: number) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = shuffledModlists.length - 1;
    if (newIndex >= shuffledModlists.length) newIndex = 0;
    setPage([newIndex, newDirection]);
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-900">
      <div className="overflow-hidden max-w-full relative">
        <div className="w-full bg-gray-900 relative">
          <Link
            to="/modlist/$repo/$id"
            params={{ repo: currentModlist.repositoryName, id: currentModlist.links.machineURL }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                custom={direction}
                variants={carouselSlide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={defaultTransition}
                src={imageUrl}
                alt={`Image of Modlist ${currentModlist.title}`}
                className="w-full aspect-video object-cover"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_CAROUSEL_IMAGE;
                }}
              />
            </AnimatePresence>
          </Link>

          <div className="absolute w-full bottom-0 bg-gray-900 bg-opacity-80 h-12 flex justify-center pt-1">
            <Link
              to="/modlist/$repo/$id"
              params={{ repo: currentModlist.repositoryName, id: currentModlist.links.machineURL }}
              className="hover:underline flex gap-2"
            >
              <h3 className="text-md sm:text-2xl text-center font-semibold">
                {currentModlist.title}
              </h3>
              <p className="text-md sm:text-2xl text-center font-light">
                ({getGameDisplayName(currentModlist.game)})
              </p>
            </Link>
          </div>
        </div>

        <div className="flex justify-between absolute top-1/2 w-full -translate-y-1/2">
          <Button
            onClick={() => paginate(-1)}
            className="rounded-full w-10 h-10 ml-3"
            variant="secondary"
            size="icon"
            aria-label="Previous Modlist"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => paginate(1)}
            className="rounded-full w-10 h-10 mr-3"
            variant="secondary"
            size="icon"
            aria-label="Next Modlist"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
