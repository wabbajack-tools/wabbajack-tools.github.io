import { AxiosError } from '../utils/axios';

export const axiosError: AxiosError = {
  message: '',
  request: {
    response: '',
    responseText: '',
    responseURL: '',
    status: 200,
    statusText: '',
  },
  response: {
    data: '',
    status: 200,
    statusText: '',
  },
};
