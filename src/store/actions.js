import axios from 'axios';

const actions = () => ({
  loadModlists: () =>
    axios
      .get(
        'https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/modlists.json'
      )
      .then(res => res.data)
      .then(modlists => ({ modlists }))
});

export default actions;
