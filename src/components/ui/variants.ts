import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded px-2 py-[3px] text-[12px] leading-[14px] font-semibold whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-surface-16 text-fg',
        secondary: 'bg-ground-raised text-fg-88',
        outline: 'border border-surface text-fg-66 bg-transparent',
        success: 'bg-success text-ground',
        destructive: 'bg-error text-on-error',
        glow: 'bg-primary text-ground',
        cyan: 'bg-surface text-primary',
        pink: 'bg-hover text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded border border-transparent font-[inherit] text-[13px] cursor-pointer transition-colors duration-[80ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-ground hover:bg-hover hover:text-primary',
        primary:
          'bg-primary text-ground hover:bg-hover hover:text-primary',
        secondary:
          'bg-surface text-fg hover:bg-hover hover:text-primary',
        ghost:
          'bg-transparent text-fg hover:bg-hover hover:text-primary',
        outline:
          'border-surface bg-transparent text-fg hover:bg-hover hover:border-transparent hover:text-primary',
        link:
          'h-auto! px-0! text-primary underline underline-offset-2 hover:text-fg',
        glow:
          'bg-surface text-primary hover:bg-hover',
      },
      size: {
        default: 'h-8 px-3',
        sm: 'h-7 px-2.5 text-[12px]',
        lg: 'h-[49px] px-5 rounded-2xl text-[15px] font-semibold',
        xl: 'h-14 px-6 rounded-2xl text-[16px]',
        icon: 'size-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
