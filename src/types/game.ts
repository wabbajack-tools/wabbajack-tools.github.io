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

// Game icons the desktop app shows, from IconSource in Wabbajack.DTOs/Game/GameRegistry.cs
const gameIcons: Record<string, string> = {
  baldursgate3: 'https://cdn2.steamgriddb.com/icon/cdb3fcd3d3fde62fe3b549a90793467e.png',
  cyberpunk2077: 'https://cdn2.steamgriddb.com/icon/2d45da15db966ba887cf4e573989fcc8/32/32x32.png',
  darkestdungeon: 'https://cdn2.steamgriddb.com/icon/b1d2128cee734a257c5e0d5c73bbdd1b.png',
  dishonored: 'https://cdn2.steamgriddb.com/icon/6fcd734d28ae00944f8f7c68a219bbc5/32/32x32.png',
  dragonage2: 'https://cdn2.steamgriddb.com/icon/a6a946f7265ed7f28a6425ee76621c3a/32/32x32.png',
  dragonageinquisition: 'https://cdn2.steamgriddb.com/icon/b98004311446c60521a8831075423c20.png',
  dragonageorigins: 'https://cdn2.steamgriddb.com/icon/b55d7ce2adb9449fc4dae6115cbbe30f/32/32x32.png',
  dragonsdogma: 'https://cdn2.steamgriddb.com/icon/a830839bbb4a4022a84ff2b8af5c46e0.png',
  dragonsdogma2: 'https://cdn2.steamgriddb.com/icon/201c0f76a64e14fdfe74bdff9eb099f0/32/32x32.png',
  enderal: 'https://cdn2.steamgriddb.com/icon/6505e8a0c0e1a90d8da8879e49a437f0.png',
  enderalspecialedition: 'https://cdn2.steamgriddb.com/icon/104c6f99020b85465ae361a92d09a8d1.png',
  fallout3: 'https://cdn2.steamgriddb.com/icon/ac7ed855f313b05391de74046180fb34.png',
  fallout4: 'https://cdn2.steamgriddb.com/icon/578d9dd532e0be0cdd050b5bec4967a1.png',
  fallout4london: 'https://cdn2.steamgriddb.com/icon/2cb3742470f550f41aea34a0702e4d63.png',
  fallout4vr: 'https://cdn2.steamgriddb.com/icon/9058c666789874c718d1976270cee814.png',
  fallout76: 'https://cdn2.steamgriddb.com/icon/b7196f5fd0fce35ccadc7001fd067588/32/32x32.png',
  falloutnewvegas: 'https://cdn2.steamgriddb.com/icon/c706723a17a2b2acec4f9ebc9f572e31.png',
  finalfantasy7remake: 'https://cdn2.steamgriddb.com/icon/d9b47f916e531ac9ef2b0887ca72d698.png',
  karrynsprison: 'https://cdn2.steamgriddb.com/icon/37286bc401299e97a564f6b42792eb6d.png',
  kerbalspaceprogram: 'https://cdn2.steamgriddb.com/icon/2ee4162f4a89db5fa43b3b08900ee370.png',
  kingdomcomedeliverance: 'https://cdn2.steamgriddb.com/icon/1bdde90ebfdef547440410e79b1877bf.png',
  kingdomcomedeliverance2: 'https://cdn2.steamgriddb.com/icon/87d655b334d24764e1dd1b377f505922/32/32x32.png',
  kotor2: 'https://cdn2.steamgriddb.com/icon/2d00f43f07911355d4151f13925ff292/24/32x32.png',
  mechwarrior5mercenaries: 'https://cdn2.steamgriddb.com/icon/c59bb6bab3096620efe78bdeb031f027/8/32x32.png',
  morrowind: 'https://cdn2.steamgriddb.com/icon/661c1c090ff5831a647202397c61d73c/24/32x32.png',
  mountandblade2bannerlord: 'https://cdn2.steamgriddb.com/icon/811cf46d61c9ae564bf7fa4b5abc639b.png',
  nierautomata: 'https://cdn2.steamgriddb.com/icon/e8fd4a8a5bab2b3785d794ab51fef55c/32/32x32.png',
  nomanssky: 'https://cdn2.steamgriddb.com/icon/970e789e0a92eab99bcabf36dfa6050c/32/32x32.png',
  oblivion: 'https://cdn2.steamgriddb.com/icon/e403262769f74b83009bffb6e3c0a3b7/32/32x32.png',
  oblivionremastered: 'https://cdn2.steamgriddb.com/icon/0ee98f8910782a3277576e5839372116.png',
  sevendaystodie: 'https://cdn2.steamgriddb.com/icon/2b1f462a660e29c47acdcc25cb14d321.png',
  sims4: 'https://cdn2.steamgriddb.com/icon/9fc664916bce863561527f06a96f5ff3/32/32x32.png',
  skyrim: 'https://cdn2.steamgriddb.com/icon/58ee2794cc87707943624dc8db2ff5a0/8/32x32.png',
  skyrimspecialedition: 'https://cdn2.steamgriddb.com/icon/e1b90346c92331860b1391257a106bb1/32/32x32.png',
  skyrimvr: 'https://cdn2.steamgriddb.com/icon/75b3f26dde5a6c2a415464b05bd46fbc.png',
  stardewvalley: 'https://cdn2.steamgriddb.com/icon/f6c4718557e1197ecdbe1b7ff52975d2.png',
  starfield: 'https://cdn2.steamgriddb.com/icon/1a495bc86abe171f690e27192ea6c367.png',
  terraria: 'https://cdn2.steamgriddb.com/icon/e658047c67a80c47b5ba982ab520b59a.png',
  valheim: 'https://cdn2.steamgriddb.com/icon/dd055f53a45702fe05e449c30ac80df9/32/32x32.png',
  vtmb: 'https://cdn2.steamgriddb.com/icon/d4ab2732ed8ac6a4b2d9734cf4c851d2/32/32x32.png',
  warhammer40kdarktide: 'https://cdn2.steamgriddb.com/icon/da81831bd5b381d45aa1fae29aeb242f.png',
  witcher: 'https://cdn2.steamgriddb.com/icon/fd72ecaa23aa0a514a53c6a16eabb9c6.png',
  witcher3: 'https://cdn2.steamgriddb.com/icon/2af9b1a840b4ecd522fe1cda88c8385e/32/32x32.png',
};

export function getGameIcon(gameId: string): string | undefined {
  return gameIcons[gameId.toLowerCase()];
}
