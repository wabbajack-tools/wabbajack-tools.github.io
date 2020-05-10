import { CommonWrapper } from 'enzyme';
import axios from 'axios';
import { AxiosError } from '../types/axios';

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
      console.log(`Error: ${axiosError.message} for ${link}`);
      expect(axiosError).toBeUndefined();
      //done();
    });
};

export const wrapperTest = (expect: jest.Expect, wrapper: CommonWrapper) => {
  expect(wrapper.exists()).toBe(true);
  expect(wrapper.isEmptyRender()).toBe(false);
};
