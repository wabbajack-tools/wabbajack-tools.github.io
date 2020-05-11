import { AxiosError, AxiosRequest, AxiosResponse } from '../types/axios';

export const FakeAxiosRequest: AxiosRequest = {
  response: '',
  responseText: '',
  responseURL: 'https://build.wabbajack.org/lists/status.json',
  status: 404,
  statusText: 'Not Found',
};

export const FakeAxiosResponse: AxiosResponse = {
  data: '',
  status: 404,
  statusText: 'Not Found',
};

export const FakeAxiosError: AxiosError = {
  message: 'Request failed with status code 404',
  request: FakeAxiosRequest,
  response: FakeAxiosResponse,
};
