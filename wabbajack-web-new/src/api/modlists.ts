import { fetchJson, fetchText, buildApiUrl } from './client';
import type { ModlistMetadata, ModlistSummary, Repositories } from '@/types';

// Raw summary format from the API
interface RawModlistSummary {
  name: string;
  machineURL: string;
  failed: number;
  passed: number;
  updating: number;
  mirrored: number;
  modlist_missing: boolean;
  has_failures: boolean;
  link: string;
  report: string;
  small_image: string | null;
  large_image: string | null;
}

export async function fetchRepositories(): Promise<Repositories> {
  return fetchJson<Repositories>(buildApiUrl('/repositories.json'));
}

export async function fetchModlistsFromRepo(repoUrl: string): Promise<ModlistMetadata[]> {
  const data = await fetchJson<ModlistMetadata | ModlistMetadata[]>(repoUrl);
  // Some repos return a single object, others return an array
  return Array.isArray(data) ? data : [data];
}

export async function fetchModlistSummaries(): Promise<Map<string, ModlistSummary>> {
  try {
    const summaries = await fetchJson<RawModlistSummary[]>(
      buildApiUrl('/reports/modListSummary.json')
    );

    const summaryMap = new Map<string, ModlistSummary>();

    for (const summary of summaries) {
      summaryMap.set(summary.machineURL.toLowerCase(), {
        Name: summary.name,
        MachineURL: summary.machineURL,
        Passed: summary.passed,
        Failed: summary.failed,
        HasFailures: summary.has_failures,
        SmallImage: summary.small_image || undefined,
        LargeImage: summary.large_image || undefined,
      });
    }

    return summaryMap;
  } catch (error) {
    console.warn('Failed to fetch modlist summaries:', error);
    return new Map();
  }
}

export async function fetchAllModlists(): Promise<ModlistMetadata[]> {
  // Fetch repositories and summaries in parallel
  const [repositories, summaryMap] = await Promise.all([
    fetchRepositories(),
    fetchModlistSummaries(),
  ]);

  const modlistPromises = Object.entries(repositories).map(async ([repoName, repoUrl]) => {
    try {
      const modlists = await fetchModlistsFromRepo(repoUrl);
      // Add repository name and validation summary to each modlist
      return modlists.map(m => {
        // The summary machineURL includes the repo name, e.g., "wj-featured/living_skyrim"
        const namespacedName = `${repoName}/${m.links.machineURL}`;
        const summary = summaryMap.get(namespacedName.toLowerCase());

        return {
          ...m,
          repositoryName: repoName,
          namespacedName,
          validationSummary: summary,
        };
      });
    } catch (error) {
      console.warn(`Failed to fetch modlists from ${repoName}:`, error);
      return [];
    }
  });

  const results = await Promise.all(modlistPromises);
  return results.flat();
}

export async function fetchDetailedStatus(repo: string, machineUrl: string) {
  const url = buildApiUrl(`/${repo}/status/${machineUrl}.json`);
  return fetchJson(url);
}

export async function fetchReadme(url: string): Promise<string> {
  return fetchText(url);
}
