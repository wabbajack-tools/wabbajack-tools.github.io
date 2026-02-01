import { useQuery } from '@tanstack/react-query';
import { fetchAllModlists, fetchReadme } from '@/api/modlists';
import { queryKeys } from '@/api/queryKeys';
import type { ModlistMetadata } from '@/types';

export function useModlists() {
  return useQuery({
    queryKey: queryKeys.modlists,
    queryFn: fetchAllModlists,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFeaturedModlists() {
  const { data, ...rest } = useModlists();

  const featuredModlists = data?.filter(
    (m) => m.official && !m.force_down && !m.nsfw
  );

  return {
    data: featuredModlists,
    ...rest,
  };
}

export function useModlist(repo: string, machineUrl: string) {
  const { data: modlists, ...rest } = useModlists();

  const modlist = modlists?.find(
    (m) =>
      m.repositoryName === repo &&
      m.links.machineURL.toLowerCase() === machineUrl.toLowerCase()
  );

  return {
    data: modlist,
    ...rest,
  };
}

export function useReadme(url: string | undefined) {
  return useQuery({
    queryKey: queryKeys.readme(url || ''),
    queryFn: () => fetchReadme(url!),
    enabled: !!url,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useModlistsByGame(modlists: ModlistMetadata[] | undefined) {
  if (!modlists) return {};

  return modlists.reduce<Record<string, ModlistMetadata[]>>((acc, modlist) => {
    const game = modlist.game;
    if (!acc[game]) {
      acc[game] = [];
    }
    acc[game].push(modlist);
    return acc;
  }, {});
}
