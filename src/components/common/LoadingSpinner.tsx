import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export function LoadingSpinner({ message = 'Loading...', className }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      className={cn('flex flex-col items-center justify-center gap-3 p-12', className)}
    >
      <span
        aria-hidden="true"
        className="size-8 animate-spin rounded-full border-[3px] border-surface border-t-primary"
      />
      <p className="text-[13px] text-fg-66">{message}</p>
    </div>
  );
}
