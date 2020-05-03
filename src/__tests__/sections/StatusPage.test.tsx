import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { StatusPage, VirtualizedList } from '../../sections/StatusPage';
import { AppThunkAction } from '../../store';

import { KnownAction } from '../../store/DetailedStatusStore';
import { TestingProvider } from '../../utils/jestProvider';

import { axiosError } from '../../__mocks__/axiosTypes';
import { detailedStatus, failingStatus } from '../../__mocks__/modlist';

const requestDetailedStatus = (): AppThunkAction<KnownAction> => () => {};

describe('Test StatusPage section', () => {
  it('StatusPage: normal', () => {
    const wrapper = mount(
      <StatusPage
        isLoading={false}
        error={undefined}
        status={detailedStatus}
        requestDetailedStatus={requestDetailedStatus}
        history={undefined}
        location={undefined}
        match={{ isExact: false, params: { url: '' }, path: '', url: '' }}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('StatusPage: failing status', () => {
    const wrapper = mount(
      <StatusPage
        isLoading={false}
        error={undefined}
        status={failingStatus}
        requestDetailedStatus={requestDetailedStatus}
        history={undefined}
        location={undefined}
        match={{ isExact: false, params: { url: '' }, path: '', url: '' }}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('StatusPage: loading', () => {
    const wrapper = mount(
      <StatusPage
        isLoading={true}
        error={undefined}
        status={undefined}
        requestDetailedStatus={requestDetailedStatus}
        history={undefined}
        location={undefined}
        match={{ isExact: false, params: { url: '' }, path: '', url: '' }}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('StatusPage: error', () => {
    const wrapper = mount(
      <StatusPage
        isLoading={false}
        error={axiosError}
        status={undefined}
        requestDetailedStatus={requestDetailedStatus}
        history={undefined}
        location={undefined}
        match={{ isExact: false, params: { url: '' }, path: '', url: '' }}
      />,
      {
        wrappingComponent: TestingProvider,
      }
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('StatusPage: status undefined', () => {
    const wrapper = mount(
      <StatusPage
        isLoading={false}
        error={undefined}
        status={undefined}
        requestDetailedStatus={requestDetailedStatus}
        history={undefined}
        location={undefined}
        match={{ isExact: false, params: { url: '' }, path: '', url: '' }}
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
