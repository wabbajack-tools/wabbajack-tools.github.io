import { observable } from 'mobx';

import AxiosStore from './axios-store';

import { IDetailedStatus } from '../types/modlists';

export default class ModlistsDetailedStatusStore extends AxiosStore {
  @observable
  detailedStatusMap: Map<string, IDetailedStatus>;

  constructor() {
    super();
    this.detailedStatusMap = new Map<string, IDetailedStatus>();
  }

  shouldFetch(machineURL: string) {
    const isLoading = this.isLoading.get(machineURL) === true;
    const didLoad = this.didLoad.get(machineURL) === true;
    return !isLoading && !didLoad;
  }

  fetchDetailedStatus(machineURL: string) {
    this.fetchStuff<IDetailedStatus>(
      machineURL,
      `https://build.wabbajack.org/lists/status/${machineURL}.json`,
      (data) => {
        this.detailedStatusMap.set(machineURL, data);
      }
    );
  }
}
