import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ModlistInfo } from '../../sections/ModlistInfo';
import { AppThunkAction } from '../../store';

import { KnownAction } from '../../store/ModlistInfoStore';
import { KnownAction as ModlistsKnownAction } from '../../store/ModlistsStore';
import { TestingProvider } from '../../utils/jestProvider';

import { axiosError } from '../../__mocks__/axiosTypes';
import { modlist } from '../../__mocks__/modlist';

const requestModlists = (): AppThunkAction<ModlistsKnownAction> => () => {};
const requestModlistInfo = (): AppThunkAction<KnownAction> => () => {};

describe('Test ModlistInfo section', () => {
  it('ModlistInfo: normal', () => {
    const wrapper = mount(
      <ModlistInfo
        isLoadingModlists={false}
        isLoadingModlistInfo={false}
        match={{ params: { url: 'tso' }, isExact: false, path: '', url: '' }}
        errorModlists={undefined}
        errorModlistInfo={undefined}
        modlists={[modlist]}
        readme={''}
        requestModlists={requestModlists}
        requestModlistInfo={requestModlistInfo}
        history={undefined}
        location={undefined}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('ModlistInfo: loading modlists', () => {
    const wrapper = mount(
      <ModlistInfo
        isLoadingModlists={true}
        isLoadingModlistInfo={false}
        match={{ params: { url: 'tso' }, isExact: false, path: '', url: '' }}
        errorModlists={undefined}
        errorModlistInfo={undefined}
        modlists={[]}
        readme={undefined}
        requestModlists={requestModlists}
        requestModlistInfo={requestModlistInfo}
        history={undefined}
        location={undefined}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('ModlistInfo: loading modlist info', () => {
    const wrapper = mount(
      <ModlistInfo
        isLoadingModlists={false}
        isLoadingModlistInfo={true}
        match={{ params: { url: 'tso' }, isExact: false, path: '', url: '' }}
        errorModlists={undefined}
        errorModlistInfo={undefined}
        modlists={[]}
        readme={undefined}
        requestModlists={requestModlists}
        requestModlistInfo={requestModlistInfo}
        history={undefined}
        location={undefined}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('ModlistInfo: modlists error', () => {
    const wrapper = mount(
      <ModlistInfo
        isLoadingModlists={false}
        isLoadingModlistInfo={false}
        match={{ params: { url: 'tso' }, isExact: false, path: '', url: '' }}
        errorModlists={axiosError}
        errorModlistInfo={undefined}
        modlists={[]}
        readme={undefined}
        requestModlists={requestModlists}
        requestModlistInfo={requestModlistInfo}
        history={undefined}
        location={undefined}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('ModlistInfo: modlist info error', () => {
    const wrapper = mount(
      <ModlistInfo
        isLoadingModlists={false}
        isLoadingModlistInfo={false}
        match={{ params: { url: 'tso' }, isExact: false, path: '', url: '' }}
        errorModlists={undefined}
        errorModlistInfo={axiosError}
        modlists={[]}
        readme={undefined}
        requestModlists={requestModlists}
        requestModlistInfo={requestModlistInfo}
        history={undefined}
        location={undefined}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('ModlistInfo: no error but readme is undefined', () => {
    const wrapper = mount(
      <ModlistInfo
        isLoadingModlists={false}
        isLoadingModlistInfo={false}
        match={{ params: { url: 'tso' }, isExact: false, path: '', url: '' }}
        errorModlists={undefined}
        errorModlistInfo={undefined}
        modlists={[modlist]}
        readme={undefined}
        requestModlists={requestModlists}
        requestModlistInfo={requestModlistInfo}
        history={undefined}
        location={undefined}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });
});
