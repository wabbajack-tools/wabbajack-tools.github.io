import type { Archive, ArchiveState } from './status';

export interface NexusArchiveState extends ArchiveState {
  $type: 'NexusDownloader, Wabbajack.Lib';
  Name: string;
  Author?: string;
  Description?: string;
  ModID?: number;
  FileID?: number;
  GameName?: string;
}

export function isNexusArchive(state: ArchiveState): state is NexusArchiveState {
  return state.$type === 'NexusDownloader, Wabbajack.Lib';
}

export interface ModlistInfo {
  name: string;
  machineURL: string;
  repo: string;
  nsfw?: boolean;
}

export interface GlobalArchiveResult {
  archive: Archive;
  modlists: ModlistInfo[];
}

export interface SearchLoadingState {
  totalModlists: number;
  loadedModlists: number;
  loadedArchives: number;
  isComplete: boolean;
}

export interface ModlistSummaryWithLink {
  name: string;
  machineURL: string;
  link: string;
  passed: number;
  failed: number;
  nsfw?: boolean;
}
