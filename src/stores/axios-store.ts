import { observable, flow } from 'mobx';

import axios, { AxiosError } from 'axios';

export default class AxiosStore {
  @observable
  axiosError?: AxiosError | undefined;

  @observable
  isLoading: Map<string, boolean>;

  @observable
  didLoad: Map<string, boolean>;

  protected fetchStuff = flow(function* <T>(
    this: AxiosStore,
    key: string,
    link: string,
    cb: (data: T) => void
  ) {
    this.axiosError = undefined;
    this.isLoading.set(key, true);
    yield axios
      .get(link)
      .then((res) => res.data as Promise<T>)
      .then((data) => cb(data))
      .catch((error) => {
        const axiosError = error as AxiosError;
        this.axiosError = axiosError;
      })
      .finally(() => {
        this.isLoading.set(key, false);
        this.didLoad.set(key, true);
      });
  });

  constructor() {
    this.didLoad = new Map<string, boolean>();
    this.isLoading = new Map<string, boolean>();
  }
}
