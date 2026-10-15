import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  message: string;
  /** Heading of the panel. */
  title?: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  message,
  title = 'Something went wrong',
  className,
  onRetry,
}: ErrorDisplayProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-start gap-3 rounded-lg bg-error px-6 py-12 text-on-error',
        className
      )}
    >
      <Icon name="warning" className="size-7" />
      <h3 className="text-[24px] leading-[1.23] font-semibold">{title}</h3>
      <p className="m-0 max-w-[560px] text-[14px] leading-[21px]">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="h-8 cursor-pointer rounded bg-on-error px-3 text-error hover:opacity-90"
        >
          Try again
        </button>
      )}
    </div>
  );
}
