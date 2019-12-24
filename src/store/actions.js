import axios from 'axios';

const status = require('./status.json');
const statusPage = require('./Ultimate Skyrim.json');

const actions = () => ({
  loadModlists: state =>
    axios
      .get(
        'https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/modlists.json'
      )
      .then(res => res.data)
      .then(modlists => ({ ...state, modlists })),
  filterGame: (state, game) => ({ ...state, selectedGame: game }),
  fetchReadme: (state, link) =>
    axios
      .get(link)
      .then(res => res.data)
      .then(readme => ({ ...state, readme })),
  loadStatus: state =>
    /* axios
      .get('http://build.wabbajack.org/lists/status.json')
      .then(res => res.data)
      .then(status => ({ ...state, status })), */
    ({ ...state, status }),
  loadModlistStatus: (state, link) =>
    /* axios
      .get(`http://build.wabbajack.org/${link}`)
      .then(res => res.data)
      .then(modlistStatus => ({ ...state, modlistStatus })) */
    ({ ...state, modlistStatus: statusPage })
});
export default actions;
