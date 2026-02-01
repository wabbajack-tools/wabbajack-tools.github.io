import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { canRenderReadme, isValidDiscordUrl } from '@/lib/utils';
import { getGameDisplayName } from '@/types/game';
import { FALLBACK_MODLIST_IMAGE } from '@/lib/constants';
import type { ModlistMetadata } from '@/types';

interface ModlistCardProps {
  modlist: ModlistMetadata;
}

export function ModlistCard({ modlist }: ModlistCardProps) {
  const isExternalLink = !canRenderReadme(modlist.links.readme);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group h-full"
    >
      <div className="h-full rounded-2xl bg-surface/60 backdrop-blur-sm border border-neon-purple/10 overflow-hidden transition-all duration-300 hover:border-neon-purple/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        {/* Image container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={modlist.validationSummary?.SmallImage || modlist.links.image || FALLBACK_MODLIST_IMAGE}
            alt={`${modlist.title}`}
            loading="lazy"
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_MODLIST_IMAGE;
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />

          {/* Featured badge */}
          {modlist.official && (
            <div className="absolute top-3 right-3">
              <Badge variant="glow" className="text-xs">
                Featured
              </Badge>
            </div>
          )}

          {/* Game badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="text-xs backdrop-blur-sm">
              {getGameDisplayName(modlist.game)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col">
          <h3 className="font-display font-bold text-xl text-text-primary mb-1 line-clamp-1">
            {modlist.title}
          </h3>

          <p className="text-sm text-text-muted mb-3">
            by <span className="text-text-secondary">{modlist.author}</span>
          </p>

          <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-grow">
            {modlist.description}
          </p>

          {/* Tags */}
          {modlist.tags && modlist.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[...new Set(modlist.tags)].slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {modlist.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{modlist.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-neon-purple/10">
            <Button variant="secondary" size="sm" asChild className="flex-1">
              <Link
                to="/search/$repo/$id"
                params={{ repo: modlist.repositoryName, id: modlist.links.machineURL }}
              >
                <Search className="h-3.5 w-3.5 mr-1.5" />
                Archives
              </Link>
            </Button>

            {isValidDiscordUrl(modlist.links.discordURL) && (
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={modlist.links.discordURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            )}

            <Button variant="default" size="sm" asChild className="flex-1">
              {isExternalLink ? (
                <a
                  href={modlist.links.readme}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                  <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                </a>
              ) : (
                <Link
                  to="/modlist/$repo/$id"
                  params={{ repo: modlist.repositoryName, id: modlist.links.machineURL }}
                >
                  Details
                </Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
