import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../../test-utils';
import Header, { HideOnScroll } from '../../components/Header';

import { IconButton, Drawer } from '@material-ui/core';

describe('Test Header component', () => {
  let wrapper: ShallowWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('Header renders without crashing', () => {
    wrapper = shallow(<Header />);
    wrapperTest(expect, wrapper);
  });

  it('Drawer opens correctly', () => {
    let drawer = wrapper.find(Drawer).first();
    expect(drawer.prop('open')).toBe(false);

    const iconButton = wrapper.find(IconButton).first();
    iconButton.simulate('click');

    drawer = wrapper.find(Drawer).first();
    expect(drawer.prop('open')).toBe(true);

    const drawerDiv = wrapper.find('#drawer-div');
    drawerDiv.simulate('keydown', { key: 'Tab' });

    drawer = wrapper.find(Drawer).first();
    expect(drawer.prop('open')).toBe(true);

    drawerDiv.simulate('keydown', { key: 'Shift' });

    drawer = wrapper.find(Drawer).first();
    expect(drawer.prop('open')).toBe(true);

    drawerDiv.simulate('keydown', { key: 'Enter' });

    drawer = wrapper.find(Drawer).first();
    expect(drawer.prop('open')).toBe(false);
  });

  it('HideOnScroll renders without crashing', () => {
    wrapper = shallow(<HideOnScroll />);
    wrapperTest(expect, wrapper);
  });
});
