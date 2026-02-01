import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cardHover, fadeInUp } from '@/lib/animations';
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
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div variants={cardHover}>
        <Card className="h-full flex flex-col overflow-hidden">
          <img
            src={modlist.validationSummary?.SmallImage || modlist.links.image || FALLBACK_MODLIST_IMAGE}
            alt={`Image of the Modlist ${modlist.title}`}
            loading="lazy"
            crossOrigin="anonymous"
            className="w-full aspect-video object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_MODLIST_IMAGE;
            }}
          />

          <CardContent className="p-4 flex-grow flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <h2 className="font-title font-semibold text-2xl">
                {modlist.title}
              </h2>
              {modlist.official && (
                <Badge variant="default" className="text-xs h-4">
                  Featured List
                </Badge>
              )}
            </div>

            <h3 className="font-subtitle font-light text-lg">
              Created by {modlist.author}
            </h3>

            <p className="mt-1 font-normal text-base">{modlist.description}</p>

            <div className="mt-auto pt-4">
              <p className="font-medium">
                Game: {getGameDisplayName(modlist.game)}
              </p>

              {modlist.tags && modlist.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="font-medium">Tags:</span>
                  {[...new Set(modlist.tags)].map((tag) => (
                    <Badge key={tag} variant="default" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-nowrap justify-between">
                <div>
                  <Button variant="secondary" size="sm" asChild>
                    <Link
                      to="/search/$repo/$id"
                      params={{ repo: modlist.repositoryName, id: modlist.links.machineURL }}
                    >
                      Archive Search
                    </Link>
                  </Button>
                </div>

                <div className="flex gap-1">
                  {isValidDiscordUrl(modlist.links.discordURL) && (
                    <Button variant="secondary" size="sm" asChild>
                      <a
                        href={modlist.links.discordURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Discord
                      </a>
                    </Button>
                  )}

                  <Button variant="secondary" size="sm" asChild>
                    {isExternalLink ? (
                      <a
                        href={modlist.links.readme}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Details
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
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
