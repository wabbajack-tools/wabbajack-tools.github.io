export const queryKeys = {
  repositories: ['repositories'] as const,
  modlists: ['modlists'] as const,
  modlistsByRepo: (repoName: string) => ['modlists', repoName] as const,
  statusSummaries: ['statusSummaries'] as const,
  detailedStatus: (repo: string, machineUrl: string) =>
    ['detailedStatus', repo, machineUrl] as const,
  readme: (url: string) => ['readme', url] as const,
  modlistSummariesWithLinks: ['modlistSummariesWithLinks'] as const,
  modlistStatus: (link: string) => ['modlistStatus', link] as const,
};
