import { observable } from 'mobx';

import AxiosStore from './axios-store';
import { IModlistMetadata } from '../types/modlists';

export default class ModlistsStore extends AxiosStore {
  constructor() {
    super();
  }

  @observable
  modlists: IModlistMetadata[] | undefined;

  shouldFetch() {
    const isLoading = this.isLoading.get('modlists') === true;
    const didLoad = this.didLoad.get('modlists') === true;
    return !isLoading && !didLoad;
  }

  fetchModlists() {
    this.fetchStuff<IModlistMetadata[]>(
      'modlists',
      'https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/modlists.json',
      (data) => {
        this.modlists = data;
      }
    );
  }
}
