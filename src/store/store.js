import createStore from 'redux-zero';

const initialStore = { modlists: [], selectedGame: '', readme: '' };

const store = createStore(initialStore);

export default store;
