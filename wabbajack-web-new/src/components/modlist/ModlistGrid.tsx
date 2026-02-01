import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import { ModlistCard } from './ModlistCard';
import type { ModlistMetadata } from '@/types';

interface ModlistGridProps {
  modlists: ModlistMetadata[];
}

export function ModlistGrid({ modlists }: ModlistGridProps) {
  return (
    <motion.div
      className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 items-start"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {modlists.map((modlist) => (
        <ModlistCard
          key={modlist.namespacedName || `${modlist.repositoryName}/${modlist.links.machineURL}`}
          modlist={modlist}
        />
      ))}
    </motion.div>
  );
}
