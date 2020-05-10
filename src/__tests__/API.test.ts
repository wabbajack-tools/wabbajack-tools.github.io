import { axiosTest } from '../test-utils';

import {
  ModlistMetaData,
  ModlistStatus,
  ModlistDetailedStatus,
} from '../types/modlist';

import { DiscordInvite } from '../types/discord';

describe('Test APIs', () => {
  it('Test modlists.json from GitHub', (done) => {
    axiosTest<Promise<ModlistMetaData[]>>(
      done,
      expect,
      'https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/modlists.json'
    );
  });

  it('Test if status list from build server is alive', (done) => {
    axiosTest<Promise<ModlistStatus[]>>(
      done,
      expect,
      'https://build.wabbajack.org/lists/status.json'
    );
  });

  it('Test if detailed status from build server is alive', (done) => {
    expect(process.env.REACT_APP_TEST_MODLIST).not.toBeUndefined();
    axiosTest<Promise<ModlistDetailedStatus>>(
      done,
      expect,
      `https://build.wabbajack.org/lists/status/${process.env.REACT_APP_TEST_MODLIST}.json`
    );
  });

  it('Test if Discord invite link is alive', (done) => {
    expect(process.env.REACT_APP_DISCORD_LINK).not.toBeUndefined();
    const link = process.env.REACT_APP_DISCORD_LINK?.replace(
      'https://discord.gg/',
      'https://discordapp.com/api/invite/'
    );

    expect(link).not.toBeUndefined();
    axiosTest<Promise<DiscordInvite>>(done, expect, link);
  });
});
