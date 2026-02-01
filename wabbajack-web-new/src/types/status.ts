export type ListStatus = 'Valid' | 'Failed' | 'ForcedDown';

export interface ArchiveState {
  $type: string;
  Name?: string;
  [key: string]: unknown;
}

export interface Archive {
  Name: string;
  Size: number;
  Hash: string;
  State: ArchiveState;
}

export interface ValidatedArchive {
  Original: Archive;
  Status: 'Valid' | 'InValid' | 'Updating';
  PatchedFrom?: Archive;
}

export interface ValidatedModlist {
  Name: string;
  MachineURL: string;
  Status: ListStatus;
  Archives: ValidatedArchive[];
}

export interface ModlistStatusSummary {
  Name: string;
  MachineURL: string;
  Passed: number;
  Failed: number;
  HasFailures: boolean;
  SmallImage?: string;
  LargeImage?: string;
}
