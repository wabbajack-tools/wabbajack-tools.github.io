import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../test-utils';
import App from '../App';

describe('Test App component', () => {
  let wrapper: ShallowWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('Renders without crashing', () => {
    wrapper = shallow(<App />);
    wrapperTest(expect, wrapper);
  });
});
