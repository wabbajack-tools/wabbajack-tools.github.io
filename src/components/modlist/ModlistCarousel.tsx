import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { carouselSlide, defaultTransition } from '@/lib/animations';
import { getGameDisplayName } from '@/types/game';
import { FALLBACK_CAROUSEL_IMAGE } from '@/lib/constants';
import { useFeaturedModlists } from '@/hooks/useModlists';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function ModlistCarousel() {
    const { data: modlists, isLoading } = useFeaturedModlists();
    const [[currentIndex, direction], setPage] = useState([0, 0]);

    const finalModlists = useMemo(() => {
        if (!modlists || modlists.length === 0) return [];
        // Shuffle modlists using Fisher-Yates algorithm for true randomness
        return shuffleArray(modlists);
  }, [modlists]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <LoadingSpinner message="Loading featured modlists..." />
      </div>
    );
  }

  if (!finalModlists.length) {
    return null;
  }

  const currentModlist = finalModlists[currentIndex];
  const imageUrl = currentModlist.validationSummary?.LargeImage || currentModlist.links.image || FALLBACK_CAROUSEL_IMAGE;

  const paginate = (newDirection: number) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = finalModlists.length - 1;
    if (newIndex >= finalModlists.length) newIndex = 0;
    setPage([newIndex, newDirection]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden border border-neon-purple/20 shadow-[0_0_60px_rgba(168,85,247,0.15)]">
        {/* Main image area */}
        <Link
          to="/modlist/$repo/$id"
          params={{ repo: currentModlist.repositoryName, id: currentModlist.links.machineURL }}
          className="block"
        >
          <div className="relative aspect-video overflow-hidden bg-void">
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
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_CAROUSEL_IMAGE;
                }}
              />
            </AnimatePresence>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-void/30 via-transparent to-void/30" />
          </div>
        </Link>

        {/* Info bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-void via-void/95 to-transparent">
          <Link
            to="/modlist/$repo/$id"
            params={{ repo: currentModlist.repositoryName, id: currentModlist.links.machineURL }}
            className="block group"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {getGameDisplayName(currentModlist.game)}
                </Badge>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary group-hover:text-neon-purple transition-colors">
                  {currentModlist.title}
                </h3>
                <p className="text-text-secondary mt-1">
                  by {currentModlist.author}
                </p>
              </div>

              <Button variant="glow" size="sm" className="hidden sm:flex">
                View Details
              </Button>
            </div>
          </Link>
        </div>

        {/* Navigation arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <Button
            onClick={(e) => {
              e.preventDefault();
              paginate(-1);
            }}
            className="rounded-full w-12 h-12 bg-void/80 backdrop-blur-sm border border-neon-purple/30 hover:border-neon-purple hover:bg-neon-purple/20 transition-all"
            variant="ghost"
            size="icon"
            aria-label="Previous Modlist"
          >
            <ChevronLeft className="h-6 w-6 text-neon-purple" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <Button
            onClick={(e) => {
              e.preventDefault();
              paginate(1);
            }}
            className="rounded-full w-12 h-12 bg-void/80 backdrop-blur-sm border border-neon-purple/30 hover:border-neon-purple hover:bg-neon-purple/20 transition-all"
            variant="ghost"
            size="icon"
            aria-label="Next Modlist"
          >
            <ChevronRight className="h-6 w-6 text-neon-purple" />
          </Button>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {finalModlists.slice(0, 10).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-neon-purple w-6'
                  : 'bg-text-muted/50 hover:bg-text-muted'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          {finalModlists.length > 10 && (
            <span className="text-xs text-text-muted">+{finalModlists.length - 10}</span>
          )}
        </div>
      </div>
    </div>
  );
}
