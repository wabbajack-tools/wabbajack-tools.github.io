import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ModlistMetadata } from '@/types';

interface StatusCardProps {
  modlist: ModlistMetadata;
}

function isForceDown(modlist: ModlistMetadata): boolean {
  return modlist.force_down;
}

function hasFailures(modlist: ModlistMetadata): boolean {
  return modlist.validationSummary?.HasFailures || false;
}

export function StatusCard({ modlist }: StatusCardProps) {
  const failing = hasFailures(modlist);
  const skipped = isForceDown(modlist);

  const statusConfig = failing
    ? {
        borderColor: 'border-red-500/50',
        bgColor: 'bg-red-500/10',
        glowColor: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]',
        icon: XCircle,
        iconColor: 'text-red-400',
        statusText: 'Failing',
        statusBg: 'bg-red-500/20',
      }
    : skipped
    ? {
        borderColor: 'border-yellow-500/30',
        bgColor: 'bg-yellow-500/5',
        glowColor: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]',
        icon: AlertCircle,
        iconColor: 'text-yellow-400',
        statusText: 'Skipped',
        statusBg: 'bg-yellow-500/20',
      }
    : {
        borderColor: 'border-emerald-500/30',
        bgColor: 'bg-emerald-500/5',
        glowColor: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
        icon: CheckCircle2,
        iconColor: 'text-emerald-400',
        statusText: 'Passing',
        statusBg: 'bg-emerald-500/20',
      };

  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to="/status/$repo/$id"
        params={{ repo: modlist.repositoryName, id: modlist.links.machineURL }}
        className="block"
      >
        <div
          className={cn(
            'rounded-xl p-4 border backdrop-blur-sm transition-all duration-300',
            'bg-surface/60',
            statusConfig.borderColor,
            statusConfig.glowColor
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary truncate hover:text-neon-purple transition-colors">
                {modlist.title}
              </h3>

              {skipped ? (
                <p className="text-sm text-text-muted mt-1">
                  Validation skipped
                </p>
              ) : (
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-emerald-400">
                    {modlist.validationSummary?.Passed || 0} passed
                  </span>
                  <span className="text-red-400">
                    {modlist.validationSummary?.Failed || 0} failed
                  </span>
                </div>
              )}
            </div>

            <div
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium',
                statusConfig.statusBg,
                statusConfig.iconColor
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {statusConfig.statusText}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
