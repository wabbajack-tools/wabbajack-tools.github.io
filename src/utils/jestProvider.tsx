import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { fakeStore } from '../__mocks__/fakeStore';

interface TestingProviderProps {
  children?: JSX.Element[] | undefined;
  customStore?: unknown | undefined;
}

export const TestingProvider: React.FC<TestingProviderProps> = (props) => {
  return (
    <Provider store={props.customStore || fakeStore}>
      <MemoryRouter>{props.children}</MemoryRouter>
    </Provider>
  );
};
