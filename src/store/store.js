import createStore from 'redux-zero';

const initialStore = {
  modlists: [],
  selectedGame: '',
  readme: '',
  status: [],
  modlistStatus: []
};

const store = createStore(initialStore);

export default store;
