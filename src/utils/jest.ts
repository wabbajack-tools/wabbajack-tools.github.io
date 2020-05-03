import axios from 'axios';
import { AxiosError } from './axios';

export const axiosTest = <T>(
  done: jest.DoneCallback,
  expect: jest.Expect,
  link: string
) => {
  axios
    .get(link)
    .then((response) => response.data as T)
    .then((data) => {
      expect(data).not.toBeUndefined();
      done();
    })
    .catch((error) => {
      const axiosError = error as AxiosError;
      console.log(`Error: ${axiosError.message}`);
      expect(axiosError).toBeUndefined();
      done();
    });
};
