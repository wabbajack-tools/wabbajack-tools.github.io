import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useModlists } from '@/hooks/useModlists';
import { StatusGrid } from '@/components/status/StatusGrid';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { pageTransition } from '@/lib/animations';

export const Route = createFileRoute('/status')({
  component: StatusPage,
});

function StatusPage() {
  const { data: modlists, isLoading, error } = useModlists();

  const stats = useMemo(() => {
    if (!modlists) return { failing: 0, passing: 0, skipped: 0 };

    return {
      failing: modlists.filter((m) => m.validationSummary?.HasFailures).length,
      passing: modlists.filter(
        (m) => !m.validationSummary?.HasFailures && !m.force_down
      ).length,
      skipped: modlists.filter((m) => m.force_down).length,
    };
  }, [modlists]);

  const statCards = [
    {
      label: 'Passing',
      value: stats.passing,
      icon: CheckCircle2,
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    },
    {
      label: 'Failing',
      value: stats.failing,
      icon: XCircle,
      color: 'red',
      gradient: 'from-red-500 to-red-600',
      glow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]',
    },
    {
      label: 'Skipped',
      value: stats.skipped,
      icon: AlertCircle,
      color: 'yellow',
      gradient: 'from-yellow-500 to-yellow-600',
      glow: 'shadow-[0_0_30px_rgba(234,179,8,0.3)]',
    },
  ];

  return (
    <motion.div
      className="flex-grow"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Activity className="h-8 w-8 text-neon-purple" />
            <h1 className="font-display font-bold text-4xl md:text-5xl gradient-text">
              Status Dashboard
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Monitor the validation status of all modlists in real-time
          </motion.p>
        </div>
      </section>

      {/* Stats cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-xl p-6 bg-surface/60 backdrop-blur-sm border border-${stat.color}-500/30 ${stat.glow}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-muted uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className={`text-4xl font-display font-bold mt-1 text-${stat.color}-400`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                    <Icon className={`h-8 w-8 text-${stat.color}-400`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && <ErrorDisplay message="Unable to load Modlists from GitHub!" />}

        {isLoading && <LoadingSpinner message="Loading Modlists..." />}

        {!isLoading && !error && modlists && (
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              All Modlists
            </h2>
            <StatusGrid modlists={modlists} />
          </div>
        )}
      </section>
    </motion.div>
  );
}
