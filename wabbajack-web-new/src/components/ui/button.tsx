import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-neon-purple to-neon-pink text-white shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98]',
        secondary:
          'bg-surface-light/80 text-text-primary border border-neon-purple/20 hover:border-neon-purple/50 hover:bg-surface-light hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]',
        ghost:
          'text-text-secondary hover:text-neon-purple hover:bg-neon-purple/10',
        outline:
          'border border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]',
        link:
          'text-neon-cyan underline-offset-4 hover:underline hover:text-neon-cyan/80',
        glow:
          'bg-transparent border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5),0_0_60px_rgba(168,85,247,0.3)]',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-10 text-lg',
        xl: 'h-16 px-12 text-xl',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
