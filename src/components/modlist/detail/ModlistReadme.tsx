import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Icon } from '@/components/common/Icon';

interface ModlistReadmeProps {
  readme: string | undefined;
  isLoading: boolean;
  failed: boolean;
  readmeUrl: string | undefined;
}

export function ModlistReadme({ readme, isLoading, failed, readmeUrl }: ModlistReadmeProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3" aria-busy="true">
        <div className="h-7 w-[45%] rounded-[4px] bg-surface" />
        <div className="h-3.5 w-full rounded-[4px] bg-ground-raised" />
        <div className="h-3.5 w-[94%] rounded-[4px] bg-ground-raised" />
        <div className="h-3.5 w-[70%] rounded-[4px] bg-ground-raised" />
        <div className="mt-1 text-fg-66">Loading the readme from GitHub…</div>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="flex items-start gap-3 rounded-lg bg-error p-5 text-on-error">
        <Icon name="warning" className="size-[22px]" />
        <div className="flex flex-col gap-1.5">
          <strong className="text-[16px]">The readme couldn't load</strong>
          <span className="text-[14px] leading-[21px]">
            The author's readme file didn't respond.{' '}
            {readmeUrl ? (
              <>
                You can still read it on{' '}
                <a href={readmeUrl} target="_blank" rel="noopener noreferrer" className="text-on-error underline">
                  GitHub
                </a>
                , or try again later.
              </>
            ) : (
              'Try again later.'
            )}
          </span>
        </div>
      </div>
    );
  }

  if (!readme) return null;

  return (
    <article className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, title, children }) => (
            <a href={href} title={title} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {readme}
      </ReactMarkdown>
    </article>
  );
}
