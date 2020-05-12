import {
  DownloadMeta,
  ModlistDetailedStatus,
  ModlistDetailedStatusItem,
  ModlistMetaData,
  ModlistStatus,
} from '../types/modlist';
import { FakeArchive, FakeNexusArchive, FakeLoversLabArchive } from './archive';

export const FakeDownloadMeta: DownloadMeta = {
  Hash: 'Q/qk29tJmZQ=',
  Size: 881803555,
  NumberOfArchives: 630,
  SizeOfArchives: 66165781760,
  NumberOfInstalledFiles: 116956,
  SizeOfInstalledFiles: 140486105627,
};

export const FakeModlistMetaData: ModlistMetaData = {
  title: 'Lotus',
  description: 'Nice modlist',
  author: 'erri120',
  game: 'skyrimspecialedition',
  version: '0.3.0',
  nsfw: true,
  tags: ['Official'],
  links: {
    image:
      'https://raw.githubusercontent.com/erri120/lotus/master/extra/logo-alt.png',
    machineURL: 'lotus',
    readme: 'https://raw.githubusercontent.com/erri120/lotus/master/README.md',
    download:
      'https://github.com/erri120/lotus/releases/download/v0.3/Lotus.zip',
  },
  download_metadata: FakeDownloadMeta,
};

export const FakeFailingModlistStatus: ModlistStatus = {
  name: 'Lotus',
  machineURL: 'lotus',
  checked: '12/20/2012',
  failed: 1,
  passed: 2,
  updating: 0,
  link: 'lotus',
  report: 'lotus',
  has_failures: true,
};

export const FakeSucceedingModlistStatus: ModlistStatus = {
  name: 'Lotus',
  machineURL: 'lotus',
  checked: '12/20/2012',
  failed: 0,
  passed: 3,
  updating: 0,
  link: 'lotus',
  report: 'lotus',
  has_failures: false,
};

export const FakeFailingModlistDetailedStatus: ModlistDetailedStatus = {
  $type: '',
  Name: 'Lotus',
  Checked: '12/20/2012',
  HasFailures: true,
  DownloadMetaData: FakeDownloadMeta,
  Archives: [
    { IsFailing: true, Archive: FakeArchive },
    { IsFailing: true, Archive: FakeNexusArchive },
    { IsFailing: false, Archive: FakeLoversLabArchive },
  ],
};

export const FakeSucceedingModlistDetailedStatus: ModlistDetailedStatus = {
  $type: '',
  Name: 'Lotus',
  Checked: '12/20/2012',
  HasFailures: false,
  DownloadMetaData: FakeDownloadMeta,
  Archives: [
    { IsFailing: false, Archive: FakeArchive },
    { IsFailing: false, Archive: FakeNexusArchive },
    { IsFailing: false, Archive: FakeLoversLabArchive },
  ],
};
