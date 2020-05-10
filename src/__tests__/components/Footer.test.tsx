import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../../test-utils';
import Footer, { FooterItem } from '../../components/Footer';

describe('Test Footer component', () => {
  let wrapper: ShallowWrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it('Footer renders without crashing', () => {
    wrapper = shallow(<Footer />);
    wrapperTest(expect, wrapper);
  });

  it('FooterItem renders without crashing', () => {
    wrapper = shallow(
      <FooterItem name="Wabbajack" link="https://www.wabbajack.org" />
    );
    wrapperTest(expect, wrapper);
  });
});
