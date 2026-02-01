import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-wabbajack-cards-background-hover',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
