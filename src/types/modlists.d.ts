import { Game } from './game';
import { IArchive, ArchiveStatus } from './archives';

export interface IModlist {
  Name: string;
  Version: string;
  Author: string;
  Description: string;
  GameType: Game;
  GameName: Game;
  ModManager: number;
  ModManagerName: string;
  DownloadSize: number;
  InstallSize: number;
  IsNSFW: boolean;
  Archives: IArchive[];
  //Directives:
}

//adapted from https://github.com/wabbajack-tools/wabbajack/blob/master/Wabbajack.Lib/ModListRegistry/ModListMetadata.cs

export interface IModlistMetadata {
  title: string;
  description: string;
  version: string;
  author: string;
  game: Game;
  official: boolean;
  tags: string[];
  nsfw: boolean;
  links: {
    image: string;
    readme: string;
    download: string;
    machineURL: string;
  };
  download_metadata: IDownloadMetadata;
}

export interface IDownloadMetadata {
  Hash: string;
  Size: number;
  NumberOfArchives: number;
  SizeOfArchives: number;
  NumberOfInstalledFiles: number;
  SizeOfInstalledFiles: number;
}

export interface IModlistSummary {
  name: string;
  machineURL: string;
  checked: string;
  failed: number;
  passed: number;
  updating: number;
  mirrored: number;
  link: string;
  report: string;
  has_failures: boolean;
}

//from https://github.com/wabbajack-tools/wabbajack/blob/master/Wabbajack.Server/DTOs/DetailedStatus.cs

export interface IDetailedStatus {
  Name: string;
  Checked: string;
  Archives: IDetailedStatusItem[];
  DownloadMetaData: IDownloadMetadata;
  HasFailures: boolean;
  MachineName: string;
}

interface IDetailedStatusItem {
  IsFailing: boolean;
  Archive: IArchive;
  Name: string;
  Url: string;
  ArchiveStatus: ArchiveStatus;
}
