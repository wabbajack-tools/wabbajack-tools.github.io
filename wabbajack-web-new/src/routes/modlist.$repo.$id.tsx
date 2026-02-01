import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useModlist, useReadme } from '@/hooks/useModlists';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { pageTransition } from '@/lib/animations';
import { canRenderReadme } from '@/lib/utils';
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
  if (modlist && !canRender && readmeUrl) {
    window.location.href = readmeUrl;
    return null;
  }

  if (modlistError) {
    return <ErrorDisplay message="Unable to load Modlists from GitHub!" />;
  }

  if (isLoadingModlist) {
    return <LoadingSpinner message="Loading Modlist" />;
  }

  if (!modlist) {
    return <ErrorDisplay message={`Found no matching Modlist "${repo}/${id}"`} />;
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

      <div className="pt-6 px-2 max-w-6xl mx-auto bg-wabbajack-cards-background-base">
        <img
          src={modlist.links.image || FALLBACK_MODLIST_IMAGE}
          alt={`Image of the Modlist ${modlist.title}`}
          className="max-w-full mx-auto"
          loading="eager"
          crossOrigin="anonymous"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_MODLIST_IMAGE;
          }}
        />

        <p className="p-4">
          Created by {modlist.author}, current Version: {modlist.version}
        </p>

        {isLoadingReadme && <LoadingSpinner message="Loading README..." />}

        {readmeError && (
          <ErrorDisplay message="Unable to load README" />
        )}

        {readme && (
          <div className="markdown-body p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}
