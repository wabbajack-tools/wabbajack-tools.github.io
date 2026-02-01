export type GameId =
  | 'skyrimspecialedition'
  | 'skyrimvr'
  | 'skyrim'
  | 'fallout4'
  | 'fallout4vr'
  | 'fallout76'
  | 'falloutnewvegas'
  | 'fallout3'
  | 'oblivion'
  | 'morrowind'
  | 'enderalspecialedition'
  | 'enderal'
  | 'witcher3'
  | 'stardewvalley'
  | 'darkestdungeon'
  | 'cyberpunk2077'
  | 'nomanssky'
  | 'dragonsdogma2'
  | 'baldursgate3'
  | 'starfield'
  | string;

export const gameDisplayNames: Record<string, string> = {
  skyrimspecialedition: 'Skyrim Special Edition',
  skyrimvr: 'Skyrim VR',
  skyrim: 'Skyrim',
  fallout4: 'Fallout 4',
  fallout4vr: 'Fallout 4 VR',
  fallout76: 'Fallout 76',
  falloutnewvegas: 'Fallout New Vegas',
  fallout3: 'Fallout 3',
  oblivion: 'Oblivion',
  morrowind: 'Morrowind',
  enderalspecialedition: 'Enderal Special Edition',
  enderal: 'Enderal',
  witcher3: 'The Witcher 3',
  stardewvalley: 'Stardew Valley',
  darkestdungeon: 'Darkest Dungeon',
  cyberpunk2077: 'Cyberpunk 2077',
  nomanssky: "No Man's Sky",
  dragonsdogma2: "Dragon's Dogma 2",
  baldursgate3: "Baldur's Gate 3",
  starfield: 'Starfield',
};

export function getGameDisplayName(gameId: string): string {
  return gameDisplayNames[gameId.toLowerCase()] || gameId;
}
