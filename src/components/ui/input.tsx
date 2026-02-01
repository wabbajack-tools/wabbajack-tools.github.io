import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg bg-void/50 px-4 py-2 text-sm text-text-primary',
          'border border-neon-purple/20 placeholder:text-text-muted',
          'transition-all duration-200',
          'focus:outline-none focus:border-neon-purple/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
