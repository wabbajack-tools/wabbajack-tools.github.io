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
      'peer h-5 w-5 shrink-0 rounded border-2 border-gray-400 bg-wabbajack-background-darker focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wabbajack-purple-light disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-wabbajack-purple-dark data-[state=checked]:border-wabbajack-purple-dark data-[state=indeterminate]:bg-wabbajack-purple-dark data-[state=indeterminate]:border-wabbajack-purple-dark',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-white')}
    >
      {props.checked === 'indeterminate' ? (
        <Minus className="h-4 w-4" />
      ) : (
        <Check className="h-4 w-4" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
