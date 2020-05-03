import { ModlistMetaData, ModlistStatus, ModlistDetailedStatus, DownloadMeta } from '../utils/modlist';

export const downloadMeta: DownloadMeta = {
  Hash: '',
  NumberOfArchives: 100,
  NumberOfInstalledFiles: 100,
  Size: 100,
  SizeOfArchives: 100,
  SizeOfInstalledFiles: 100,
};

export const detailedStatus: ModlistDetailedStatus = {
  $type: '',
  Archives: [],
  Checked: '2020-05-03T11:24:02.0494837Z',
  DownloadMetaData: downloadMeta,
  HasFailures: false,
  Name: '',
};

export const failingStatus: ModlistDetailedStatus = {
  $type: '',
  Archives: [],
  Checked: '2020-05-03T11:24:02.0494837Z',
  DownloadMetaData: downloadMeta,
  HasFailures: true,
  Name: '',
};

export const statusModlist: ModlistStatus = {
  name: '',
  checked: '2020-05-03T11:24:02.0494837Z',
  failed: 0,
  has_failures: false,
  link: '',
  machineURL: '',
  passed: 100,
  report: '',
  updating: 0,
};

export const failingModlist: ModlistStatus = {
  name: '',
  checked: '2020-05-03T11:24:02.0494837Z',
  failed: 100,
  has_failures: true,
  link: '',
  machineURL: '',
  passed: 100,
  report: '',
  updating: 0,
};

export const modlist: ModlistMetaData = {
  author: 'erri120',
  title: 'Testing',
  game: 'skyrim',
  description: 'nice',
  links: {
    download: '',
    image: '',
    machineURL: 'tso',
    readme: '',
  },
  nsfw: true,
  tags: [''],
  version: '1.0.0',
  download_metadata: downloadMeta,
};
