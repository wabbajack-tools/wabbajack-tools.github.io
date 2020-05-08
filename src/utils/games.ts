/**
 * Converts a machine name of a game to a human readable one
 * @param game machine name of a game
 * @returns human readable name
 */
export const getGameName = (game: string | undefined) => {
  let gameName = 'UNKNOWN';
  if (game === undefined) return gameName;
  switch (game.toLocaleLowerCase()) {
    case 'skyrim':
      gameName = 'Skyrim';
      break;
    case 'oblivion':
      gameName = 'Oblivion';
      break;
    case 'skyrimspecialedition':
      gameName = 'Skyrim Special Edition';
      break;
    case 'fallout4':
      gameName = 'Fallout 4';
      break;
    case 'skyrimvr':
      gameName = 'Skyrim VR';
      break;
    case 'fallout3':
      gameName = 'Fallout 3';
      break;
    case 'falloutnewvegas':
      gameName = 'Fallout New Vegas';
      break;
    case 'morrowind':
      gameName = 'Morrowind';
      break;
    default:
      gameName = 'UNKNOWN';
      break;
  }

  return gameName;
};
