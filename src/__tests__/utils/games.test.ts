import { getGameName } from '../../utils/games';

describe('Test getGameName function', () => {
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
    const result = results[i];
    it(`Returns ${result} for ${name}`, () => {
      expect(getGameName(name)).toBe(result);
    });
  }
});
