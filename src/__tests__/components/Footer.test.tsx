import * as React from 'react';
import { shallow } from 'enzyme';
import Footer, { FooterItem } from '../../components/Footer';

describe('Test Footer components', () => {
  it('Footer: renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });

  it('FooterItem: renders without crashing', () => {
    const wrapper = shallow(<FooterItem link="" name="" />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });
});
