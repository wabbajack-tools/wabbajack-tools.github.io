import { Archive } from './types';

export interface ModlistMetaData {
  title: string;
  description: string;
  author: string;
  game: string;
  version: string;
  nsfw: boolean;
  tags: Array<string>;
  links: {
    image: string;
    machineURL: string;
    readme: string;
    download: string;
  };
  download_metadata: DownloadMeta;
}

export interface DownloadMeta {
  Hash: string;
  Size: number;
  NumberOfArchives: number;
  SizeOfArchives: number;
  NumberOfInstalledFiles: number;
  SizeOfInstalledFiles: number;
}

export interface ModlistStatus {
  name: string;
  machineURL: string;
  checked: string;
  failed: number;
  passed: number;
  updating: number;
  link: string;
  report: string;
  has_failures: boolean;
}

export interface ModlistDetailedStatus {
  $type: string;
  Name: string;
  Checked: string;
  HasFailures: boolean;
  DownloadMetaData: DownloadMeta;
  Archives: ModlistDetailedStatusItem[];
}

export interface ModlistDetailedStatusItem {
  IsFailing: boolean;
  Archive: Archive;
}
