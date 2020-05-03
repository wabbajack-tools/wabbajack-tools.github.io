import * as React from 'react';
import { mount } from 'enzyme';
import Header from '../../components/Header';

import { IconButton, Drawer } from '@material-ui/core';

import { TestingProvider } from '../../utils/jestProvider';

describe('Test Header component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Header />, { wrappingComponent: TestingProvider });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });

  it('drawer opens', () => {
    const wrapper = mount(<Header />, { wrappingComponent: TestingProvider });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

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

    wrapper.unmount();
  });
});
