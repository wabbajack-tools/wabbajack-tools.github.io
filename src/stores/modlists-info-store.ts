import { observable } from 'mobx';

import AxiosStore from './axios-store';

export default class ModlistsInfoStore extends AxiosStore {
  @observable
  readmeMap: Map<string, string>;

  constructor() {
    super();
    this.readmeMap = new Map<string, string>();
  }

  shouldFetch(machineURL: string) {
    const isLoading = this.isLoading.get(machineURL) === true;
    const didLoad = this.didLoad.get(machineURL) === true;
    return !isLoading && !didLoad;
  }

  fetchReadme(machineURL: string, link: string) {
    this.fetchStuff<string>(machineURL, link, (data) => {
      this.readmeMap.set(machineURL, data);
    });
  }
}
