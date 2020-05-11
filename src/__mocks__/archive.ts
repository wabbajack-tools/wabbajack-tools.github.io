import {
  Archive,
  State,
  NexusDownloaderState,
  MegaDownloaderState,
  VectorPlexusDownloaderState,
  GoogleDriveDownloaderState,
  HTTPDownloaderState,
  LoversLabDownloaderState,
} from '../types/archive';

export const FakeState: State = {
  $type: 'IDownloader, Wabbajack.Lib',
};

export const FakeHTTPDownloaderState: HTTPDownloaderState = {
  $type: 'HttpDownloader, Wabbajack.Lib',
  Headers: [],
  Url:
    'https://github.com/wabbajack-tools/mod-lists/releases/download/1.0.0/Wabbajack.Theme.for.MO2.7z',
};

export const FakeArchive: Archive = {
  $type: 'Archive, Wabbajack.Lib',
  Name: 'Wabbajack.Theme.for.MO2.7z',
  Hash: '8llXNCgKEiM=',
  Size: 36244,
  State: FakeState,
};

export const FakeNexusDownloaderState: NexusDownloaderState = {
  $type: 'NexusDownloader, Wabbajack.Lib',
  Name: 'Mod Organizer 2',
  Author: 'Tannin - MO2 Team',
  Version: '0.0.0.0',
  ImageURL:
    'https://staticdelivery.nexusmods.com/mods/1704/images/6194/6194-1525726634-1392239594.png',
  IsNSFW: false,
  Description:
    'Mod Organizer (MO) is a tool for managing mod collections of arbitrary size. It is specifically designed for people who like to experiment with mods and thus need an easy and reliable way to install and uninstall them.',
  GameName: 'SkyrimSpecialEdition',
  ModID: 6194,
  FileID: 119741,
};

export const FakeNexusArchive: Archive = {
  $type: 'Archive, Wabbajack.Lib',
  Hash: 'F1ZDzm2NnT4=',
  Name: 'Mod.Organizer-2.2.2.1.7z',
  Size: 78225160,
  State: FakeNexusDownloaderState,
};

export const FakeLoversLabDownloaderState: LoversLabDownloaderState = {
  $type: 'LoversLabDownloader, Wabbajack.Lib',
  FullURL: '/files/file/1795-heels-sound/',
  IsAttachment: false,
  FileID: 669362,
  FileName: '1795-heels-sound',
  URL: 'http://www.loverslab.com/files/file/1795-heels-sound',
  Name: 'Heels Sound 1.5 SSE',
  Author: 'ApoKrytia',
  Version: '1.5 SSE',
  ImageURL:
    'https://static.loverslab.com/screenshots/monthly_12_2015/afd13dc8e8ea34d084c4661cac0753e5-cover.png',
  IsNSFW: true,
};

export const FakeLoversLabArchive: Archive = {
  $type: 'Archive, Wabbajack.Lib',
  Hash: 'NfeHXl03zEg=',
  Name: 'Heels Sound  1.5 SSE.7z',
  Size: 3083592,
  State: FakeLoversLabDownloaderState,
};

export const FakeVectorPlexusDownloaderState: VectorPlexusDownloaderState = {
  $type: 'VectorPlexusDownloader, Wabbajack.Lib',
  FullURL: '/files/file/283-high-poly-head/',
  IsAttachment: false,
  FileID: 6825,
  FileName: '283-high-poly-head',
  URL: 'http://vectorplexus.com/files/file/283-high-poly-head',
  IsNSFW: false,
};

export const FakeVectorPlexusArchive: Archive = {
  $type: 'Archive, Wabbajack.Lib',
  Hash: '0acAWN1qss0=',
  Name: 'High Poly Head v1.2 (SE).zip',
  Size: 129337538,
  State: FakeVectorPlexusDownloaderState,
};

export const FakeGoogleDriveDownloaderState: GoogleDriveDownloaderState = {
  $type: 'GoogleDriveDownloader, Wabbajack.Lib',
  Id: '0B2VgBVA9jE6RTjJiYnRTTE9qRUE',
};

export const FakeGoogleDriveArchive: Archive = {
  $type: 'Archive, Wabbajack.Lib',
  Hash: 'U659DN1scQM=',
  Name: 'TUDM - The Ultimate Dodge Mod v4 x64.rar',
  Size: 6750133,
  State: FakeGoogleDriveDownloaderState,
};

export const FakeMegaDownloaderState: MegaDownloaderState = {
  $type: 'MegaDownloader, Wabbajack.Lib',
  Url: 'https://mega.nz/#!r0Ei1QwB!wqSFfjiHywamVGdERbq_iKKudShZ5Om_7WDbAlwrdvU',
  Headers: [],
};

export const FakeMegaDownloaderArchive: Archive = {
  $type: 'Archive, Wabbajack.Lib',
  Hash: 'h5LJ+CbJSuE=',
  Name: 'Skyrim_Particle_Patch_for_ENB-SSE.zip',
  Size: 28189946,
  State: FakeMegaDownloaderState,
};
