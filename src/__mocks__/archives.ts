import {
  Archive,
  HTTPDownloaderState,
  NexusDownloaderState,
} from '../utils/types';
import { randomString } from '../utils/other';

export const FakeArchiveList = (count: number) => {
  const result = new Array<Archive>();
  result.push({
    $type: 'Archive, Wabbajack.Lib',
    Hash: '03x7awFBOQc=',
    Name: 'Deadly Wenches SE-599-1-2-5SE.7z',
    Size: 553969,
    State: FakeNexusState,
  });
  for (let i = 0; i < count; i++) {
    result.push({
      $type: randomString(4),
      Hash: randomString(8),
      Name: randomString(10),
      Size: Math.floor(Math.random() * 123456789),
      State: FakeState,
    });
  }
  return result;
};

export const FakeState: HTTPDownloaderState = {
  $type: 'HttpDownloader, Wabbajack.Lib',
  Headers: [],
  //PrimaryKeyString: '',
  Url:
    'https://github.com/wabbajack-tools/mod-lists/releases/download/1.0.0/Wabbajack.Theme.for.MO2.7z',
};

export const FakeNexusState: NexusDownloaderState = {
  $type: 'NexusDownloader, Wabbajack.Lib',
  Name: 'Deadly Wenches',
  Author: 'Kozuke Hajime',
  Version: '1.2.5.0SE',
  ImageURL:
    'https://staticdelivery.nexusmods.com/mods/1704/images/599-0-1483628369.jpg',
  IsNSFW: false,
  Description:
    'Adds to female/unisex leveled lists more available female NPCs for variety in different factions (bandits,vampires,guards,soldiers,stendarr,forsworn). They have custom spells,perks, ai and combat classes so Its compatible with everything using a wrye bash bashed patch.',
  GameName: 'SkyrimSpecialEdition',
  ModID: 599,
  FileID: 42713,
};

export const FakeArchive: Archive = {
  $type: 'Archive, Wabbajack.Lib',
  Name: 'Wabbajack.Theme.for.MO2.7z',
  Hash: '8llXNCgKEiM=',
  Size: 36244,
  State: FakeState,
};
