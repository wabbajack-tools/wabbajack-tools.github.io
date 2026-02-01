import type { GameId } from './game';

export interface ModlistLinks {
  image: string;
  readme: string;
  download: string;
  machineURL: string;
  discordURL?: string;
  websiteURL?: string;
}

export interface DownloadMetadata {
  Hash: string;
  Size: number;
  NumberOfArchives: number;
  SizeOfArchives: number;
  NumberOfInstalledFiles: number;
  SizeOfInstalledFiles: number;
  TotalSize: number;
}

export interface ModlistMetadata {
  title: string;
  description: string;
  author: string;
  maintainers?: string[];
  game: GameId;
  official: boolean;
  tags: string[];
  nsfw: boolean;
  utility_list: boolean;
  image_contains_title: boolean;
  force_down: boolean;
  links: ModlistLinks;
  download_metadata?: DownloadMetadata;
  version: string;
  dateCreated: string;
  dateUpdated: string;
  repositoryName: string;
  // Computed fields
  namespacedName?: string;
  validationSummary?: ModlistSummary;
}

export interface ModlistSummary {
  Name: string;
  MachineURL: string;
  Passed: number;
  Failed: number;
  HasFailures: boolean;
  SmallImage?: string;
  LargeImage?: string;
}

export interface Repositories {
  [key: string]: string;
}
