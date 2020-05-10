import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../../test-utils';
import { Loading, DataError, Error } from '../../components/Fetching/';

describe('Test Fetching components', () => {
  let wrapper: ShallowWrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it('Loading renders without crashing', () => {
    wrapper = shallow(<Loading message="Loading" />);
    wrapperTest(expect, wrapper);
  });

  it('DataError renders without crashing', () => {
    wrapper = shallow(<DataError />);
    wrapperTest(expect, wrapper);
  });

  it('Error renders without crashing', () => {
    wrapper = shallow(<Error error />);
    wrapperTest(expect, wrapper);
  });
});
