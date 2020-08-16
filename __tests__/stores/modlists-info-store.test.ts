import storeHelper from './storeHelper';
import ModlistsInfoStore from '../../src/stores/modlists-info-store';

describe('[Store] Modlists Info', () => {
  const testModlist = 'living_skyrim';
  const testReadme =
    'https://raw.githubusercontent.com/ForgottenGlory/Living-Skyrim-2/master/README.md';

  let store = new ModlistsInfoStore();
  beforeEach(() => {
    store = new ModlistsInfoStore();
  });

  it(`fetches living_skyrim Readme correctly`, async () => {
    const checkReadme = async () =>
      await storeHelper(
        () => store.readmeMap.get(testModlist),
        (readme) => readme !== undefined
      );
    const checkDidLoad = async () =>
      await storeHelper(
        () => store.didLoad.get(testModlist),
        (didLoadReadme) => didLoadReadme === true
      );

    store.fetchReadme(testModlist, testReadme);
    const readme = await checkReadme();
    const didLoad = await checkDidLoad();

    expect(readme).not.toBeUndefined();
    expect(didLoad).toBeTruthy();
  });

  it('failes to fetch non-existing Readme', async () => {
    const checkError = async () =>
      await storeHelper(
        () => store.axiosError,
        (error) => error !== undefined
      );

    store.fetchReadme('none', 'none');
    const error = await checkError();
    expect(error).not.toBeUndefined();
  });
});
