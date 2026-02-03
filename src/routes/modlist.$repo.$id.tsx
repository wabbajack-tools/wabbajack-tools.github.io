import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, User, Tag, Gamepad2, ExternalLink, Search } from 'lucide-react';
import { useModlist, useReadme } from '@/hooks/useModlists';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { pageTransition } from '@/lib/animations';
import { canRenderReadme, isValidDiscordUrl } from '@/lib/utils';
import { getGameDisplayName } from '@/types/game';
import { FALLBACK_MODLIST_IMAGE } from '@/lib/constants';

export const Route = createFileRoute('/modlist/$repo/$id')({
  component: ModlistInfoPage,
});

function ModlistInfoPage() {
  const { repo, id } = Route.useParams();
  const { data: modlist, isLoading: isLoadingModlist, error: modlistError } = useModlist(repo, id);

  const readmeUrl = modlist?.links.readme;
  const canRender = canRenderReadme(readmeUrl);

  const { data: readme, isLoading: isLoadingReadme, error: readmeError } = useReadme(
    canRender ? readmeUrl : undefined
  );

  // If we can't render the README, redirect to external
  useEffect(() => {
    if (modlist && !canRender && readmeUrl) {
      window.location.href = readmeUrl;
    }
  }, [modlist, canRender, readmeUrl]);

  if (modlist && !canRender && readmeUrl) {
    return null;
  }

  if (modlistError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message="Unable to load Modlists from GitHub!" />
      </div>
    );
  }

  if (isLoadingModlist) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <LoadingSpinner message="Loading Modlist" />
      </div>
    );
  }

  if (!modlist) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message={`Found no matching Modlist "${repo}/${id}"`} />
      </div>
    );
  }

  return (
    <motion.div
      className="flex-grow"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <title>{modlist.title} | Wabbajack</title>

      {/* Hero image */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img
          src={modlist.links.image || FALLBACK_MODLIST_IMAGE}
          alt={`Image of the Modlist ${modlist.title}`}
          className="w-full h-full object-cover"
          loading="eager"
          crossOrigin="anonymous"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_MODLIST_IMAGE;
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/30 via-transparent to-void/30" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Button
            variant="secondary"
            size="sm"
            asChild
            className="backdrop-blur-sm"
          >
            <Link to="/gallery">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-16">
        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-surface/80 backdrop-blur-xl border border-neon-purple/20 p-6 md:p-8 shadow-[0_0_60px_rgba(168,85,247,0.15)]"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
                {modlist.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-text-secondary">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-neon-purple" />
                  <span>{modlist.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-neon-purple" />
                  <span>v{modlist.version}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4 text-neon-purple" />
                  <span>{getGameDisplayName(modlist.game)}</span>
                </div>
              </div>

              {modlist.description && (
                <p className="mt-4 text-text-secondary">
                  {modlist.description}
                </p>
              )}

              {/* Tags */}
              {modlist.tags && modlist.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {[...new Set(modlist.tags)].map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 min-w-[160px]">
              <Button variant="default" size="sm" asChild>
                <Link
                  to="/search/$repo/$id"
                  params={{ repo: modlist.repositoryName, id: modlist.links.machineURL }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Archive Search
                </Link>
              </Button>

              {isValidDiscordUrl(modlist.links.discordURL) && (
                <Button variant="secondary" size="sm" asChild>
                  <a
                    href={modlist.links.discordURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Discord
                  </a>
                </Button>
              )}

              {modlist.links.websiteURL && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={modlist.links.websiteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* README content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-2xl bg-surface/60 backdrop-blur-sm border border-neon-purple/10 p-6 md:p-8"
        >
          {isLoadingReadme && <LoadingSpinner message="Loading README..." />}

          {readmeError && (
            <ErrorDisplay message="Unable to load README" />
          )}

          {readme && (
            <div className="prose prose-invert prose-purple max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ ...props }) => (
                    <a
                      {...props}
                      className="text-neon-purple hover:text-neon-pink transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                  h1: ({ ...props }) => (
                    <h1 {...props} className="text-text-primary font-display border-b border-neon-purple/20 pb-2" />
                  ),
                  h2: ({ ...props }) => (
                    <h2 {...props} className="text-text-primary font-display border-b border-neon-purple/10 pb-2" />
                  ),
                  h3: ({ ...props }) => (
                    <h3 {...props} className="text-text-primary font-display" />
                  ),
                  p: ({ ...props }) => (
                    <p {...props} className="text-text-secondary" />
                  ),
                  li: ({ ...props }) => (
                    <li {...props} className="text-text-secondary" />
                  ),
                  code: ({ className, ...props }) => (
                    <code
                      {...props}
                      className={`${className || ''} bg-void/50 px-1.5 py-0.5 rounded text-neon-cyan`}
                    />
                  ),
                  pre: ({ ...props }) => (
                    <pre {...props} className="bg-void/50 border border-neon-purple/20 rounded-lg overflow-x-auto" />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote {...props} className="border-l-4 border-neon-purple/50 pl-4 italic text-text-muted" />
                  ),
                  img: ({ ...props }) => (
                    <img {...props} className="rounded-lg max-w-full" />
                  ),
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto">
                      <table {...props} className="w-full" />
                    </div>
                  ),
                  th: ({ ...props }) => (
                    <th {...props} className="text-left p-2 border-b border-neon-purple/20 text-text-primary" />
                  ),
                  td: ({ ...props }) => (
                    <td {...props} className="p-2 border-b border-neon-purple/10 text-text-secondary" />
                  ),
                }}
              >
                {readme}
              </ReactMarkdown>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
