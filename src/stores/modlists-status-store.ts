import { observable } from 'mobx';

import AxiosStore from './axios-store';

import { IModlistSummary } from '../types/modlists';

export default class ModlistsStatusStore extends AxiosStore {
  @observable
  statusList: IModlistSummary[] | undefined;

  shouldFetch() {
    const isLoading = this.isLoading.get('status') === true;
    const didLoad = this.didLoad.get('status') === true;
    return !isLoading && !didLoad;
  }

  fetchStatus() {
    this.fetchStuff<IModlistSummary[]>(
      'status',
      'https://build.wabbajack.org/lists/status.json',
      (data) => {
        this.statusList = data;
      }
    );
  }
}
