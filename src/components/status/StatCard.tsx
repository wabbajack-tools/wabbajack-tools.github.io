import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import type { ValidationState } from './validation';

const config = {
  passing: {
    label: 'Passing',
    box: 'border-solid border-surface',
    icon: <Icon name="checkmark_circle" filled className="size-8 shrink-0 text-success" />,
  },
  failing: {
    label: 'Failing',
    box: 'border-solid border-error bg-error text-on-error',
    icon: <Icon name="dismiss" filled className="size-8 shrink-0 text-on-error" />,
  },
  skipped: {
    label: 'Skipped',
    box: 'border-dashed border-surface text-fg-66',
    icon: <Icon name="subtract" className="size-8 shrink-0 text-fg-66" />,
  },
} as const;

interface StatCardProps {
  state: ValidationState;
  value: number;
}

/** A big dashboard count: Passing / Failing / Skipped. */
export function StatCard({ state, value }: StatCardProps) {
  const { label, box, icon } = config[state];
  return (
    <div className={cn('flex items-center gap-3.5 rounded-2xl border-[3px] px-[18px] py-4', box)}>
      {icon}
      <div>
        <div className="text-[40px] leading-[1.1] font-semibold">{value.toLocaleString()}</div>
        <div className="text-[15px]">{label}</div>
      </div>
    </div>
  );
}
