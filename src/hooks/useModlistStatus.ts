import { useQuery } from '@tanstack/react-query';
import { fetchDetailedStatus } from '@/api/modlists';
import { queryKeys } from '@/api/queryKeys';
import type { ValidatedModlist } from '@/types';

export function useDetailedStatus(repo: string, machineUrl: string) {
  return useQuery({
    queryKey: queryKeys.detailedStatus(repo, machineUrl),
    queryFn: () => fetchDetailedStatus(repo, machineUrl) as Promise<ValidatedModlist>,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
