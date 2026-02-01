import { fetchJson, fetchText, buildApiUrl } from './client';
import type { ModlistMetadata, ModlistSummary, Repositories } from '@/types';

export async function fetchRepositories(): Promise<Repositories> {
  return fetchJson<Repositories>(buildApiUrl('/repositories.json'));
}

export async function fetchModlistsFromRepo(repoUrl: string): Promise<ModlistMetadata[]> {
  const data = await fetchJson<ModlistMetadata | ModlistMetadata[]>(repoUrl);
  // Some repos return a single object, others return an array
  return Array.isArray(data) ? data : [data];
}

export async function fetchAllModlists(): Promise<ModlistMetadata[]> {
  const repositories = await fetchRepositories();

  const modlistPromises = Object.entries(repositories).map(async ([repoName, repoUrl]) => {
    try {
      const modlists = await fetchModlistsFromRepo(repoUrl);
      // Add repository name to each modlist
      return modlists.map(m => ({
        ...m,
        repositoryName: repoName,
        namespacedName: `${repoName}/${m.links.machineURL}`,
      }));
    } catch (error) {
      console.warn(`Failed to fetch modlists from ${repoName}:`, error);
      return [];
    }
  });

  const results = await Promise.all(modlistPromises);
  return results.flat();
}

export async function fetchStatusSummaries(): Promise<ModlistSummary[]> {
  // Status summaries are fetched from a different endpoint
  // Based on the code, they seem to come from the wabbajack client API
  // For now, we'll construct from the modlists data
  const modlists = await fetchAllModlists();

  return modlists.map(m => ({
    Name: m.title,
    MachineURL: m.namespacedName || `${m.repositoryName}/${m.links.machineURL}`,
    Passed: 0,
    Failed: 0,
    HasFailures: false,
    SmallImage: m.links.image,
    LargeImage: m.links.image,
  }));
}

export async function fetchDetailedStatus(repo: string, machineUrl: string) {
  const url = buildApiUrl(`/${repo}/status/${machineUrl}.json`);
  return fetchJson(url);
}

export async function fetchReadme(url: string): Promise<string> {
  return fetchText(url);
}
