import axios from 'axios';

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
      .then(readme => ({ ...state, readme }))
});

export default actions;
