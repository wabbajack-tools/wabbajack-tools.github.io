import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const storeFake = (state: any) => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const fakeStore = storeFake({}) as any;

const TestProvider: React.FC = (props) => {
  return (
    <Provider store={fakeStore}>
      <MemoryRouter>{props.children}</MemoryRouter>
    </Provider>
  );
};

export default TestProvider;
