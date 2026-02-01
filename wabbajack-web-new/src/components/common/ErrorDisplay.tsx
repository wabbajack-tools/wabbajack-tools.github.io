import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  message: string;
  className?: string;
}

export function ErrorDisplay({ message, className }: ErrorDisplayProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center p-8 text-wabbajack-red',
        className
      )}
    >
      <AlertCircle className="h-6 w-6 mr-2" />
      <span className="text-lg">{message}</span>
    </div>
  );
}
