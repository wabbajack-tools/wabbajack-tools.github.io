import { Game } from '../types/game';

export const getGameName = (game: Game) => {
  let gameName = 'UNKNOWN';
  switch (game) {
    case 'darkestdungeon':
      gameName = 'Darkest Dungeon';
      break;
    case 'enderal':
      gameName = 'Enderal';
      break;
    case 'fallout3':
      gameName = 'Fallout 3';
      break;
    case 'fallout4':
      gameName = 'Fallout 4';
      break;
    case 'fallout4vr':
      gameName = 'Fallout 4 VR';
      break;
    case 'falloutnewvegas':
      gameName = 'Fallout New Vegas';
      break;
    case 'morrowind':
      gameName = 'Morrowind';
      break;
    case 'oblivion':
      gameName = 'Oblivion';
      break;
    case 'skyrim':
      gameName = 'Skyrim';
      break;
    case 'skyrimspecialedition':
      gameName = 'Skyrim Special Edition';
      break;
    case 'skyrimvr':
      gameName = 'Skyrim VR';
      break;
    case 'stardewvalley':
      gameName = 'Stardew Valley';
      break;
    case 'witcher3':
      gameName = 'Witcher 3';
      break;
    case 'dragonageorigins':
      gameName = 'Dragon Age: Origins';
      break;
    case 'nomanssky':
      gameName = "No Man's Sky";
      break;
    default:
      gameName = 'UNKNOWN';
      break;
  }
  return gameName;
};

export const getNexusGameName = (game: string) => {
  let gameName = game.toLowerCase();
  switch (gameName) {
    case 'falloutnewvegas':
      gameName = 'newvegas';
      break;
    case 'dragonageorigins':
      gameName = 'dragonage';
      break;
  }
  return gameName;
};
