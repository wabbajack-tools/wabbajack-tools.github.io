import storeHelper from './storeHelper';
import ModlistsStore from '../../src/stores/modlists-store';

describe('[Store] Modlists', () => {
  const store = new ModlistsStore();

  it('fetches Modlists correctly', async () => {
    const checkModlists = async () =>
      await storeHelper(
        () => store.modlists,
        (data) => data !== undefined
      );
    const checkDidLoad = async () =>
      await storeHelper(
        () => store.didLoad.get('modlists'),
        (didLoadModlists) => didLoadModlists === true
      );

    store.fetchModlists();
    const modlists = await checkModlists();
    const didLoad = await checkDidLoad();
    expect(modlists).not.toBeUndefined();
    expect(didLoad).toBeTruthy();
  });
});
