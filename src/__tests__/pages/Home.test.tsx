import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../../test-utils';
import Home from '../../pages/home';

describe('Test Info page', () => {
  let wrapper: ShallowWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('Renders without crashing', () => {
    wrapper = shallow(<Home />);
    wrapperTest(expect, wrapper);
  });
});
