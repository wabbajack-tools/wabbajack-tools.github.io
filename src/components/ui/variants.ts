import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
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

export const buttonVariants = cva(
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
