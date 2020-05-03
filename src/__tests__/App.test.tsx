import * as React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

import { TestingProvider } from '../utils/jestProvider';

describe('Test App component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />, { wrappingComponent: TestingProvider });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });
});
