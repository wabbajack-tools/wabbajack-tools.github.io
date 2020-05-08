export interface Archive {
  $type: string;
  Hash: string;
  Meta?: string | undefined;
  Name: string;
  Size: number;
  State: State;
}

export interface State {
  $type: string;
  //PrimaryKeyString: string;
}

export interface MetaState extends State {
  URL?: string | undefined;
  Name?: string | undefined;
  Author?: string | undefined;
  Version?: string | undefined;
  ImageURL?: string | undefined;
  IsNSFW: boolean;
  Description?: string | undefined;
}

export interface HTTPDownloaderState extends State {
  Url: string;
  Headers: string[];
}

export interface MegaDownloaderState extends HTTPDownloaderState {}

export interface GoogleDriveDownloader extends State {
  Id: string;
}

export interface NexusDownloaderState extends MetaState {
  GameName: string;
  ModID: number;
  FileID: number;
}

export interface AbstractIPS4DownloaderState extends MetaState {
  IsAttachment: boolean;
  FileID: number;
  FileName: string;
  FullURL: string;
}

export interface LoversLabDownloaderState extends AbstractIPS4DownloaderState {}

export interface VectorPlexusDownloaderState
  extends AbstractIPS4DownloaderState {}
