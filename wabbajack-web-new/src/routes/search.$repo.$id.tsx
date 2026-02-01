import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useDetailedStatus } from '@/hooks/useModlistStatus';
import { Input } from '@/components/ui/input';
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
      <ArrowUp className="inline h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="inline h-4 w-4 ml-1" />
    );
  };

  if (error) {
    return <ErrorDisplay message={`Error loading status report for ${repo}/${id}`} />;
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading status report..." />;
  }

  if (status?.Status === 'ForcedDown') {
    return (
      <ErrorDisplay message="Modlist has been forced down. Status report is not available." />
    );
  }

  if (!status) {
    return <ErrorDisplay message={`Error finding status report for ${repo}/${id}`} />;
  }

  return (
    <motion.div
      className="m-8 flex-grow"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <title>Archive Search | Wabbajack</title>

      <h1 className="font-semibold my-1 text-3xl text-center">
        Archive Search: {status.Name}
      </h1>

      <div className="w-full overflow-hidden">
        <div className="p-4 min-w-full overflow-x-auto bg-wabbajack-cards-background-base rounded-md">
          <Table>
            <TableCaption>
              Use Archive Search to look through all files a Modlist downloads.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-wabbajack-background-dark">
                <TableHead colSpan={3} className="text-right px-3">
                  <label htmlFor="search-archive" className="mr-2">
                    Search by Name:
                  </label>
                  <Input
                    id="search-archive"
                    type="search"
                    maxLength={100}
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    className="inline-block w-64 text-black bg-white"
                  />
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead
                  onClick={() => handleSortClick('archiveName')}
                  className={cn('cursor-pointer hover:underline')}
                >
                  Archive Name <SortIcon column="archiveName" />
                </TableHead>
                <TableHead
                  onClick={() => handleSortClick('metaName')}
                  className={cn('cursor-pointer hover:underline')}
                >
                  Name <SortIcon column="metaName" />
                </TableHead>
                <TableHead
                  onClick={() => handleSortClick('size')}
                  className={cn('cursor-pointer hover:underline')}
                >
                  Size <SortIcon column="size" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archives.map((archive: Archive) => {
                const metaName = getMetaName(archive);
                const showMetaName = !archive.Name.toLowerCase().includes(metaName.toLowerCase());

                return (
                  <TableRow key={archive.Hash || archive.Name} className="bg-wabbajack-background-dark">
                    {showMetaName ? (
                      <>
                        <TableCell className="font-light">{archive.Name}</TableCell>
                        <TableCell className="font-light">{metaName}</TableCell>
                      </>
                    ) : (
                      <TableCell colSpan={2} className="font-light">
                        {archive.Name}
                      </TableCell>
                    )}
                    <TableCell className="font-light whitespace-nowrap">
                      {formatBytes(archive.Size)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}
