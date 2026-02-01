import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-neon-purple border border-neon-purple/30',
        secondary:
          'bg-surface-light text-text-secondary border border-neon-purple/10',
        outline:
          'border border-neon-purple/50 text-neon-purple bg-transparent',
        success:
          'bg-success/20 text-success border border-success/30',
        destructive:
          'bg-error/20 text-error border border-error/30',
        glow:
          'bg-neon-purple/20 text-neon-purple border border-neon-purple/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]',
        cyan:
          'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30',
        pink:
          'bg-neon-pink/20 text-neon-pink border border-neon-pink/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
