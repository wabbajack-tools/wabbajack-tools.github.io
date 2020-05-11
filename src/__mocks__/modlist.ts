import {
  DownloadMeta,
  ModlistDetailedStatus,
  ModlistDetailedStatusItem,
  ModlistMetaData,
  ModlistStatus,
} from '../types/modlist';

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
  checked: '1589198021200',
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
  checked: '1589198021200',
  failed: 0,
  passed: 3,
  updating: 0,
  link: 'lotus',
  report: 'lotus',
  has_failures: false,
};
