import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ message, className, onRetry }: ErrorDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'flex flex-col items-center justify-center p-8 rounded-2xl',
        'bg-surface/60 backdrop-blur-sm border border-red-500/30',
        className
      )}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />

        <motion.div
          className="relative p-4 rounded-full bg-red-500/10 border border-red-500/30"
          animate={{
            boxShadow: [
              '0 0 20px rgba(239, 68, 68, 0.2)',
              '0 0 40px rgba(239, 68, 68, 0.3)',
              '0 0 20px rgba(239, 68, 68, 0.2)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </motion.div>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-red-400">
        Something went wrong
      </h3>

      <p className="mt-2 text-text-secondary text-center max-w-md">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
