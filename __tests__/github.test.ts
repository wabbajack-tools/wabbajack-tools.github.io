import { Gulpfile } from '../gulpfile';

describe('[API] GitHub', () => {
  it('gets GitHub Download Link correctly', async () => {
    const gulpFile = new Gulpfile();
    const res = await gulpFile.getGitHubDownloadLink();
    expect(res.startsWith('Found URL:')).toBeTruthy();
  });
});
