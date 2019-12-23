const getGameName = game => {
  let gameName = '';
  if (game === undefined) return gameName;
  switch (game.toLowerCase()) {
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
      gameName = 'Fallout 4';
      break;
    case 'falloutnewvegas':
      gameName = 'Fallout New Vegas';
      break;
    case 'darkestdungeon':
      gameName = 'Darkest Dungeon';
      break;
    case 'divinityoriginalsin2':
      gameName = 'Divinity Original Sin 2';
      break;
    case 'divinityoriginalsin2de':
      gameName = 'Divinity Original Sin 2 Definitive Edition';
      break;
    case 'starbound':
      gameName = 'Starbound';
      break;
    case 'swkotor':
      gameName = 'Star Wars: Knights of the Old Republic';
      break;
    case 'swkotor2':
      gameName = 'Star Wars: Knights of the Old Republic';
      break;
    case 'witcher':
      gameName = 'The Witcher';
      break;
    case 'witcher2':
      gameName = 'The Witcher 2';
      break;
    case 'witcher3':
      gameName = 'The Witcher 3';
      break;
    case 'stardewvalley':
      gameName = 'Stardew Valley';
      break;
    default:
      gameName = 'UNKNOWN';
      break;
  }

  return gameName;
};

export default getGameName;
