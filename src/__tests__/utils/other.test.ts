import { getDateString } from '../../utils/other';

describe('Test other function', () => {
  it('converts dates to the correct string format', () => {
    const date = new Date('August 19, 2001');
    const expectedString = '19/08/2001, 00:00:00';
    //https://www.w3schools.com/jsref/jsref_tolocalestring.asp
    const dateString = getDateString(date, 'en-GB');
    expect(dateString).toBe(expectedString);
  });
});
