import {
  getDateString,
  getGitHubLinkFromRaw,
  toFileSizeString,
  randomString
} from '../../utils/other';

describe('Test utility functions', () => {
  it('Converts dates to the correct string format', () => {
    const date = new Date('August 19, 2001');
    const expectedString = '19/08/2001, 00:00:00';
    //https://www.w3schools.com/jsref/jsref_tolocalestring.asp
    const dateString = getDateString(date, 'en-GB');
    expect(dateString).toBe(expectedString);
  });

  it('Creates a correct GitHub link', () => {
    let input =
      'https://raw.githubusercontent.com/erri120/lotus/master/README.md';
    let result = 'https://github.com/erri120/lotus/blob/master/';
    expect(getGitHubLinkFromRaw(input)).toBe(result);

    input = randomString(100);
    result = undefined;
    expect(getGitHubLinkFromRaw(input)).toBe(result);
  });

  it('Converts number of bytes to a correct file size string', () => {
    let input = 123456789;
    let result = '118MB';
    expect(toFileSizeString(input)).toBe(result);

    input = 0;
    result = '0B';
    expect(toFileSizeString(input)).toBe(result);
  });
});
