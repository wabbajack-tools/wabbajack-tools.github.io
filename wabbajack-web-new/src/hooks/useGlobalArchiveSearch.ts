import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { fetchModlistSummariesWithLinks, fetchStatusFromLink } from '@/api/modlists';
import { queryKeys } from '@/api/queryKeys';
import type { Archive } from '@/types';
import type {
  SearchLoadingState,
  GlobalArchiveResult,
  ModlistInfo,
} from '@/types/search';

const BATCH_SIZE = 15;

interface ArchiveWithModlist {
  archive: Archive;
  modlist: ModlistInfo;
}

export function useGlobalArchiveSearch() {
  const [currentBatch, setCurrentBatch] = useState(0);

  // First, fetch the list of all modlists with their status links
  const {
    data: summaries,
    isLoading: isLoadingSummaries,
    error: summariesError,
  } = useQuery({
    queryKey: queryKeys.modlistSummariesWithLinks,
    queryFn: fetchModlistSummariesWithLinks,
    staleTime: 5 * 60 * 1000,
  });

  // Sort summaries by archive count (passed + failed) descending for priority loading
  const sortedSummaries = useMemo(() => {
    if (!summaries) return [];
    return [...summaries].sort((a, b) => (b.passed + b.failed) - (a.passed + a.failed));
  }, [summaries]);

  // Calculate which summaries to fetch in current batch
  const summariesToFetch = useMemo(() => {
    const endIndex = (currentBatch + 1) * BATCH_SIZE;
    return sortedSummaries.slice(0, endIndex);
  }, [sortedSummaries, currentBatch]);

  // Use useQueries for parallel fetching of status files
  const statusQueries = useQueries({
    queries: summariesToFetch.map((summary) => ({
      queryKey: queryKeys.modlistStatus(summary.link),
      queryFn: () => fetchStatusFromLink(summary.link),
      staleTime: 5 * 60 * 1000,
      retry: 1,
      enabled: !!summary.link,
    })),
  });

  // Check if current batch is complete
  const currentBatchComplete = useMemo(() => {
    if (summariesToFetch.length === 0) return false;
    return statusQueries.every((q) => !q.isLoading);
  }, [statusQueries, summariesToFetch.length]);

  // Advance to next batch when current is complete
  useEffect(() => {
    if (currentBatchComplete && summariesToFetch.length < sortedSummaries.length) {
      const timer = setTimeout(() => {
        setCurrentBatch((prev) => prev + 1);
      }, 100); // Small delay to prevent UI thrashing
      return () => clearTimeout(timer);
    }
  }, [currentBatchComplete, summariesToFetch.length, sortedSummaries.length]);

  // Build aggregate archive data from all loaded status files
  const { allArchives, loadingState } = useMemo(() => {
    const archives: ArchiveWithModlist[] = [];
    let loadedCount = 0;
    let archiveCount = 0;

    statusQueries.forEach((query, index) => {
      if (query.data) {
        loadedCount++;
        const summary = summariesToFetch[index];

        // Extract repo from machineURL (format: "repo/modlist")
        const repo = summary.machineURL.split('/')[0] || 'unknown';
        const machineURL = summary.machineURL.split('/')[1] || summary.machineURL;

        const modlistInfo: ModlistInfo = {
          name: summary.name,
          machineURL,
          repo,
          nsfw: summary.nsfw,
        };

        query.data.Archives.forEach((validatedArchive) => {
          archives.push({
            archive: validatedArchive.Original,
            modlist: modlistInfo,
          });
          archiveCount++;
        });
      }
    });

    const state: SearchLoadingState = {
      totalModlists: sortedSummaries.length,
      loadedModlists: loadedCount,
      loadedArchives: archiveCount,
      isComplete: loadedCount === sortedSummaries.length && sortedSummaries.length > 0,
    };

    return { allArchives: archives, loadingState: state };
  }, [statusQueries, summariesToFetch, sortedSummaries.length]);

  // Function to reset and reload
  const reset = useCallback(() => {
    setCurrentBatch(0);
  }, []);

  return {
    allArchives,
    loadingState,
    isLoadingSummaries,
    error: summariesError,
    reset,
  };
}

const RESULT_LIMIT = 500;

function getSearchableText(archive: Archive): string {
  return [
    archive.Name || '',
    archive.State?.Name || '',
    (archive.State as { Author?: string })?.Author || '',
    (archive.State as { Description?: string })?.Description || '',
  ]
    .join(' ')
    .toLowerCase();
}

function archiveMatchesTerms(archive: Archive, terms: string[]): boolean {
  const searchableText = getSearchableText(archive);
  return terms.every((term) => searchableText.includes(term));
}

export function useFilteredArchives(
  allArchives: ArchiveWithModlist[],
  query: string,
  showNsfw: boolean
) {
  return useMemo(() => {
    if (!query.trim()) {
      return { results: [], isMultiSearch: false, searchTerms: [] as string[] };
    }

    // Check for comma-separated multi-search
    const commaTerms = query.split(',').map((t) => t.trim()).filter(Boolean);
    const isMultiSearch = commaTerms.length > 1;

    if (isMultiSearch) {
      // Multi-archive search: find modlists containing archives matching ALL terms
      return {
        results: [],
        isMultiSearch: true,
        searchTerms: commaTerms,
      };
    }

    // Single search: original behavior
    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    const hashToResult = new Map<string, GlobalArchiveResult>();
    let matchCount = 0;

    for (const { archive, modlist } of allArchives) {
      if (matchCount >= RESULT_LIMIT) break;
      if (!showNsfw && modlist.nsfw) continue;

      const matches = archiveMatchesTerms(archive, searchTerms);

      if (matches) {
        const existing = hashToResult.get(archive.Hash);
        if (existing) {
          if (!existing.modlists.some((m) => m.machineURL === modlist.machineURL && m.repo === modlist.repo)) {
            existing.modlists.push(modlist);
          }
        } else {
          hashToResult.set(archive.Hash, {
            archive,
            modlists: [modlist],
          });
          matchCount++;
        }
      }
    }

    return {
      results: Array.from(hashToResult.values()).sort(
        (a, b) => b.modlists.length - a.modlists.length
      ),
      isMultiSearch: false,
      searchTerms: [],
    };
  }, [allArchives, query, showNsfw]);
}

export interface ModlistWithMatchedArchives {
  modlist: ModlistInfo;
  matchedArchives: Map<string, Archive[]>; // term -> matching archives
}

export function useMultiArchiveSearch(
  allArchives: ArchiveWithModlist[],
  searchTerms: string[],
  showNsfw: boolean
): ModlistWithMatchedArchives[] {
  return useMemo(() => {
    if (searchTerms.length < 2) return [];

    // Build a map of modlist key -> { modlist info, archives by term }
    const modlistMap = new Map<string, {
      modlist: ModlistInfo;
      archivesByTerm: Map<string, Archive[]>;
    }>();

    // For each archive, check which terms it matches
    for (const { archive, modlist } of allArchives) {
      if (!showNsfw && modlist.nsfw) continue;

      const modlistKey = `${modlist.repo}/${modlist.machineURL}`;

      for (const term of searchTerms) {
        const termWords = term.toLowerCase().split(/\s+/);
        if (archiveMatchesTerms(archive, termWords)) {
          let entry = modlistMap.get(modlistKey);
          if (!entry) {
            entry = {
              modlist,
              archivesByTerm: new Map(),
            };
            modlistMap.set(modlistKey, entry);
          }

          const existing = entry.archivesByTerm.get(term) || [];
          // Dedupe by hash within the term
          if (!existing.some((a) => a.Hash === archive.Hash)) {
            existing.push(archive);
            entry.archivesByTerm.set(term, existing);
          }
        }
      }
    }

    // Filter to modlists that have matches for ALL terms
    const results: ModlistWithMatchedArchives[] = [];
    for (const entry of modlistMap.values()) {
      if (entry.archivesByTerm.size === searchTerms.length) {
        results.push({
          modlist: entry.modlist,
          matchedArchives: entry.archivesByTerm,
        });
      }
    }

    // Sort by total matched archives descending
    return results.sort((a, b) => {
      const aTotal = Array.from(a.matchedArchives.values()).reduce((sum, arr) => sum + arr.length, 0);
      const bTotal = Array.from(b.matchedArchives.values()).reduce((sum, arr) => sum + arr.length, 0);
      return bTotal - aTotal;
    });
  }, [allArchives, searchTerms, showNsfw]);
}
