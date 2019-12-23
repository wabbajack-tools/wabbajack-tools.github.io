import createStore from 'redux-zero';

const initialStore = { modlists: [], selectedGame: '' };

const store = createStore(initialStore);

export default store;
