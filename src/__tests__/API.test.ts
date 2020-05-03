import { axiosTest } from '../utils/jest';
import { AxiosError } from '../utils/axios';
import axios from 'axios';

import {
  ModlistMetaData,
  ModlistStatus,
  ModlistDetailedStatus,
} from '../utils/modlist';

describe('Test APIs', () => {
  it('test modlists.json from GitHub', (done) => {
    axiosTest<Promise<ModlistMetaData[]>>(
      done,
      expect,
      'https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/modlists.json'
    );
  });
  it('test status list from build server', (done) => {
    axiosTest<Promise<ModlistStatus[]>>(
      done,
      expect,
      'https://build.wabbajack.org/lists/status.json'
    );
  });

  it('test detailed status from build server', (done) => {
    axiosTest<Promise<ModlistDetailedStatus>>(
      done,
      expect,
      'https://build.wabbajack.org/lists/status/tso.json'
    );
  });

  it('test discord invite link', (done) => {
    //https://discordapp.com/api/invite/id
    expect(process.env.REACT_APP_DISCORD_LINK).not.toBeUndefined();
    const link = process.env.REACT_APP_DISCORD_LINK?.replace(
      'https://discord.gg/',
      'https://discordapp.com/api/invite/'
    );
    expect(link).not.toBeUndefined();
    if (link === undefined) return;

    axios
      .get(link)
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((error) => {
        const axiosError = error as AxiosError;
        expect(axiosError.response.status).toBe(200);
        done();
      });
  });
});
