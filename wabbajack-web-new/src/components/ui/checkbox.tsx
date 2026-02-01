import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CheckedState = boolean | 'indeterminate';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 rounded-md border-2 transition-all duration-200',
      'border-neon-purple/50 bg-void/50',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-neon-purple data-[state=checked]:to-neon-pink data-[state=checked]:border-transparent data-[state=checked]:shadow-[0_0_10px_rgba(168,85,247,0.4)]',
      'data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-neon-purple data-[state=indeterminate]:to-neon-pink data-[state=indeterminate]:border-transparent',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-white')}
    >
      {props.checked === 'indeterminate' ? (
        <Minus className="h-3.5 w-3.5" strokeWidth={3} />
      ) : (
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
