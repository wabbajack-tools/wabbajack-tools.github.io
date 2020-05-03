import getGameName from '../../utils/games';

describe('Test getGameName', () => {
  const names = [
    '',
    undefined,
    'skyrim',
    'oblivion',
    'skyrimspecialedition',
    'fallout4',
    'skyrimvr',
    'fallout3',
    'falloutnewvegas',
    'morrowind',
  ];
  const results = [
    'UNKNOWN',
    'UNKNOWN',
    'Skyrim',
    'Oblivion',
    'Skyrim Special Edition',
    'Fallout 4',
    'Skyrim VR',
    'Fallout 3',
    'Fallout New Vegas',
    'Morrowind',
  ];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    it(`return correct name for ${name}`, () => {
      const result = getGameName(name);
      const expectedResult = results[i];
      expect(result).toBe(expectedResult);
    });
  }
});
