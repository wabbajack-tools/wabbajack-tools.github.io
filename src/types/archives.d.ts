import { Game } from './game';

//from https://github.com/wabbajack-tools/wabbajack/blob/master/Wabbajack.Lib/Data.cs

export interface IArchive {
  Hash: string;
  Meta: string | null;
  Name: string;
  Size: number;
  State: IAbstractDownloadState;
}

export type MetaStateType =
  | 'LoversLabDownloader, Wabbajack.Lib'
  | 'NexusDownloader, Wabbajack.Lib';

export type StateType =
  | 'HttpDownloader, Wabbajack.Lib'
  | 'WabbajackCDNDownloader+State, Wabbajack.Lib'
  | 'MegaDownloader, Wabbajack.Lib'
  | 'GameFileSourceDownloader, Wabbajack.Lib'
  | 'ModDBDownloader, Wabbajack.Lib'
  | 'MediaFireDownloader+State, Wabbajack.Lib'
  | 'GoogleDriveDownloader, Wabbajack.Lib'
  | MetaStateType;

//from https://github.com/wabbajack-tools/wabbajack/blob/master/Wabbajack.Lib/Downloaders/AbstractDownloadState.cs

export interface IAbstractDownloadState {
  $type: StateType;
}

export interface IURLState extends IAbstractDownloadState {
  Url: string | undefined | null;
  URL: string | undefined | null;
}

export interface IMetaState extends IURLState {
  Name: string | undefined | null;
  Author: string | undefined;
  Version: string | undefined;
  ImageURL: string | undefined;
  IsNSFW: boolean | undefined;
  Description: string | undefined;
}

export interface IAbstractIPS4DownloaderState extends IMetaState {
  FullURL: string;
  IsAttachment: boolean;
  FileID: string;
  FileName: string;
}

export interface IBethesdaNetDownloaderState extends IAbstractDownloadState {
  GameName: string;
  ContentId: string;
}

export interface IGameFileSourceDownloaderState extends IAbstractDownloadState {
  Game: Game;
  GameFile: string;
  Hash: string;
  GameVersion: string;
}

export interface IGoogleDriveDownloaderState extends IAbstractDownloadState {
  Id: string;
}

export interface IHTTPDownloaderState extends IURLState {}

export interface IManualDownloaderState extends IURLState {}

export interface IMediaFireDownloaderState extends IURLState {}

export interface IModDBDownloaderState extends IURLState {}

export interface INexusDownloaderState extends IMetaState {
  GameName: Game;
  ModID: number;
  FileID: number;
}

export interface IWabbajackCDNDownloaderState extends IURLState {}

export interface IDeadlyStreamDownloaderState
  extends IAbstractIPS4DownloaderState {}

export interface ILoversLabDownloaderState
  extends IAbstractIPS4DownloaderState {}

export interface ITESAllDownloaderState extends IAbstractIPS4DownloaderState {}

export interface ITESAllianceDownloaderState
  extends IAbstractIPS4DownloaderState {}

export interface IVectorPlexusDownloaderState
  extends IAbstractIPS4DownloaderState {}

//from https://github.com/wabbajack-tools/wabbajack/blob/master/Wabbajack.Server/DTOs/ArchiveStatus.cs

export enum ArchiveStatus {
  Valid = 0,
  IsValid = 1,
  Updating = 2,
  Updated = 3,
  Mirrored = 4,
}
