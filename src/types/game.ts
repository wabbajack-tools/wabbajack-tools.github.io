// Game IDs derived from Wabbajack.DTOs/Game/Game.cs
export type GameId =
  | 'baldursgate3'
  | 'cyberpunk2077'
  | 'darkestdungeon'
  | 'dishonored'
  | 'dragonage2'
  | 'dragonageinquisition'
  | 'dragonageorigins'
  | 'dragonsdogma'
  | 'dragonsdogma2'
  | 'enderal'
  | 'enderalspecialedition'
  | 'fallout3'
  | 'fallout4'
  | 'fallout4london'
  | 'fallout4vr'
  | 'fallout76'
  | 'falloutnewvegas'
  | 'finalfantasy7remake'
  | 'karrynsprison'
  | 'kerbalspaceprogram'
  | 'kingdomcomedeliverance'
  | 'kingdomcomedeliverance2'
  | 'kotor2'
  | 'mechwarrior5mercenaries'
  | 'moddingtools'
  | 'morrowind'
  | 'mountandblade2bannerlord'
  | 'nomanssky'
  | 'oblivion'
  | 'oblivionremastered'
  | 'sevendaystodie'
  | 'sims4'
  | 'skyrim'
  | 'skyrimspecialedition'
  | 'skyrimvr'
  | 'starfield'
  | 'stardewvalley'
  | 'terraria'
  | 'valheim'
  | 'vtmb'
  | 'warhammer40kdarktide'
  | 'witcher'
  | 'witcher3'
  | string;

// Display names from Wabbajack.DTOs/Game/Game.cs, sorted alphabetically
export const gameDisplayNames: Record<string, string> = {
  sevendaystodie: '7 Days to Die',
  baldursgate3: "Baldur's Gate 3",
  cyberpunk2077: 'Cyberpunk 2077',
  darkestdungeon: 'Darkest Dungeon',
  dishonored: 'Dishonored',
  dragonage2: 'Dragon Age 2',
  dragonageinquisition: 'Dragon Age: Inquisition',
  dragonageorigins: 'Dragon Age: Origins',
  dragonsdogma2: "Dragon's Dogma 2",
  dragonsdogma: "Dragon's Dogma: Dark Arisen",
  enderal: 'Enderal',
  enderalspecialedition: 'Enderal Special Edition',
  fallout3: 'Fallout 3',
  fallout4: 'Fallout 4',
  fallout4vr: 'Fallout 4 VR',
  fallout76: 'Fallout 76',
  falloutnewvegas: 'Fallout New Vegas',
  fallout4london: 'Fallout: London',
  finalfantasy7remake: 'Final Fantasy VII Remake',
  karrynsprison: "Karryn's Prison",
  kerbalspaceprogram: 'Kerbal Space Program',
  kingdomcomedeliverance: 'Kingdom Come: Deliverance',
  kingdomcomedeliverance2: 'Kingdom Come: Deliverance II',
  mechwarrior5mercenaries: 'MechWarrior 5: Mercenaries',
  moddingtools: 'Modding Tools',
  morrowind: 'Morrowind',
  mountandblade2bannerlord: 'Mount & Blade II: Bannerlord',
  nomanssky: "No Man's Sky",
  oblivion: 'Oblivion',
  oblivionremastered: 'Oblivion Remastered',
  skyrim: 'Skyrim Legendary Edition',
  skyrimspecialedition: 'Skyrim Special Edition',
  skyrimvr: 'Skyrim VR',
  kotor2: 'STAR WARS Knights of the Old Republic II',
  starfield: 'Starfield',
  stardewvalley: 'Stardew Valley',
  sims4: 'The Sims 4',
  terraria: 'Terraria',
  valheim: 'Valheim',
  vtmb: 'Vampire: The Masquerade - Bloodlines',
  warhammer40kdarktide: 'Warhammer 40,000: Darktide',
  witcher: 'Witcher: Enhanced Edition',
  witcher3: 'Witcher 3',
};

export function getGameDisplayName(gameId: string): string {
  return gameDisplayNames[gameId.toLowerCase()] || gameId;
}
