import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Search, ArrowLeft, FileArchive } from 'lucide-react';
import { useDetailedStatus } from '@/hooks/useModlistStatus';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { pageTransition } from '@/lib/animations';
import { formatBytes, cn } from '@/lib/utils';
import type { Archive, ValidatedArchive } from '@/types';

export const Route = createFileRoute('/search/$repo/$id')({
  component: ArchiveSearchPage,
});

type SortBy = 'archiveName' | 'metaName' | 'size';

function getMetaName(archive: Archive, returnEmpty = false): string {
  const state = archive.State;
  const name = state?.Name;
  if (name) return name;
  return returnEmpty ? '' : archive.Name;
}

function ArchiveSearchPage() {
  const { repo, id } = Route.useParams();
  const { data: status, isLoading, error } = useDetailedStatus(repo, id);

  const [searchString, setSearchString] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('archiveName');
  const [sortAscending, setSortAscending] = useState(true);

  const archives = useMemo(() => {
    if (!status?.Archives) return [];

    return status.Archives.map((va: ValidatedArchive) => va.Original)
      .filter((archive: Archive) => {
        if (!searchString.trim()) return true;
        const search = searchString.toLowerCase();
        return (
          archive.Name.toLowerCase().includes(search) ||
          getMetaName(archive).toLowerCase().includes(search)
        );
      })
      .sort((a: Archive, b: Archive) => {
        let comparison = 0;
        switch (sortBy) {
          case 'archiveName':
            comparison = a.Name.localeCompare(b.Name);
            break;
          case 'metaName':
            comparison = getMetaName(a, true).localeCompare(getMetaName(b, true));
            break;
          case 'size':
            comparison = a.Size - b.Size;
            break;
        }
        return sortAscending ? comparison : -comparison;
      });
  }, [status, searchString, sortBy, sortAscending]);

  const handleSortClick = (newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      setSortAscending(!sortAscending);
    } else {
      setSortBy(newSortBy);
      setSortAscending(true);
    }
  };

  const SortIcon = ({ column }: { column: SortBy }) => {
    if (sortBy !== column) return null;
    return sortAscending ? (
      <ArrowUp className="inline h-4 w-4 ml-1 text-neon-purple" />
    ) : (
      <ArrowDown className="inline h-4 w-4 ml-1 text-neon-purple" />
    );
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message={`Error loading status report for ${repo}/${id}`} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <LoadingSpinner message="Loading status report..." />
      </div>
    );
  }

  if (status?.Status === 'ForcedDown') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message="Modlist has been forced down. Status report is not available." />
      </div>
    );
  }

  if (!status) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorDisplay message={`Error finding status report for ${repo}/${id}`} />
      </div>
    );
  }

  return (
    <motion.div
      className="flex-grow"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <title>Archive Search | Wabbajack</title>

      {/* Hero section */}
      <section className="relative py-12 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6"
          >
            <Link to="/gallery">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <FileArchive className="h-8 w-8 text-neon-purple" />
            <h1 className="font-display font-bold text-3xl md:text-4xl gradient-text">
              Archive Search
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary"
          >
            {status.Name}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-text-muted mt-2"
          >
            Search through all {archives.length} files this modlist downloads
          </motion.p>
        </div>
      </section>

      {/* Search and Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-surface/60 backdrop-blur-sm border border-neon-purple/20 overflow-hidden"
        >
          {/* Search bar */}
          <div className="p-4 border-b border-neon-purple/10">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
              <Input
                type="search"
                placeholder="Search by name..."
                maxLength={100}
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableCaption className="py-4">
                Use Archive Search to look through all files a Modlist downloads.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => handleSortClick('archiveName')}
                    className={cn('cursor-pointer hover:text-neon-purple transition-colors')}
                  >
                    Archive Name <SortIcon column="archiveName" />
                  </TableHead>
                  <TableHead
                    onClick={() => handleSortClick('metaName')}
                    className={cn('cursor-pointer hover:text-neon-purple transition-colors')}
                  >
                    Name <SortIcon column="metaName" />
                  </TableHead>
                  <TableHead
                    onClick={() => handleSortClick('size')}
                    className={cn('cursor-pointer hover:text-neon-purple transition-colors text-right')}
                  >
                    Size <SortIcon column="size" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archives.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-text-muted">
                      No archives found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  archives.map((archive: Archive) => {
                    const metaName = getMetaName(archive);
                    const showMetaName = !archive.Name.toLowerCase().includes(metaName.toLowerCase());

                    return (
                      <TableRow key={archive.Hash || archive.Name}>
                        {showMetaName ? (
                          <>
                            <TableCell className="font-mono text-sm">{archive.Name}</TableCell>
                            <TableCell>{metaName}</TableCell>
                          </>
                        ) : (
                          <TableCell colSpan={2} className="font-mono text-sm">
                            {archive.Name}
                          </TableCell>
                        )}
                        <TableCell className="text-right whitespace-nowrap tabular-nums">
                          {formatBytes(archive.Size)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
