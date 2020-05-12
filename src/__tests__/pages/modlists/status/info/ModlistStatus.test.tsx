import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { createMemoryHistory } from 'history';

import { wrapperTest, TestProvider } from '../../../../../test-utils';
import {
  FakeModlistMetaData,
  FakeSucceedingModlistDetailedStatus,
  FakeFailingModlistDetailedStatus,
} from '../../../../../__mocks__/modlist';
import { FakeAxiosError } from '../../../../../__mocks__/axiosState';

import { ModlistStatus } from '../../../../../pages/modlists/status/info/ModlistStatus';
import { DataError, Error, Loading } from '../../../../../components/Fetching';

describe('Test Status page', () => {
  let wrapper: ShallowWrapper;
  const params = {
    match: {
      isExact: false,
      url: '',
      path: '',
      params: { url: '' },
    },
    history: createMemoryHistory(),
    location: { hash: '', pathname: '', search: '', state: '' },
  };
  afterAll(() => {
    wrapper.unmount();
  });

  it('Renders with default state (failing)', () => {
    wrapper = shallow(
      <ModlistStatus
        {...params}
        isLoading={false}
        modlists={[FakeModlistMetaData]}
        status={FakeFailingModlistDetailedStatus}
        requestDetailedStatus={() => () => {}}
      />,
      { wrappingComponent: TestProvider }
    );
    wrapperTest(expect, wrapper);
  });

  it('Renders with default state (succeeding)', () => {
    wrapper = shallow(
      <ModlistStatus
        {...params}
        isLoading={false}
        modlists={[FakeModlistMetaData]}
        status={FakeSucceedingModlistDetailedStatus}
        requestDetailedStatus={() => () => {}}
      />,
      { wrappingComponent: TestProvider }
    );
    wrapperTest(expect, wrapper);
  });

  it('State: loading expecting a Loading component', () => {
    wrapper = shallow(
      <ModlistStatus
        {...params}
        isLoading={true}
        modlists={[]}
        requestDetailedStatus={() => () => {}}
      />,
      { wrappingComponent: TestProvider }
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(Loading).length).toBe(1);
  });

  it('State: not loading, modlists has a length of 0, expecting a DataError component', () => {
    wrapper = shallow(
      <ModlistStatus
        {...params}
        isLoading={false}
        modlists={[]}
        requestDetailedStatus={() => () => {}}
      />,
      { wrappingComponent: TestProvider }
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(DataError).length).toBe(1);
  });

  it('State: not loading, status is undefined and we have an error, expecting an Error component', () => {
    wrapper = shallow(
      <ModlistStatus
        {...params}
        isLoading={false}
        modlists={[FakeModlistMetaData]}
        error={FakeAxiosError}
        requestDetailedStatus={() => () => {}}
      />,
      { wrappingComponent: TestProvider }
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(Error).length).toBe(1);
  });

  it('State: not loading, status is undefined, expecting an DataError component', () => {
    wrapper = shallow(
      <ModlistStatus
        {...params}
        isLoading={false}
        modlists={[FakeModlistMetaData]}
        requestDetailedStatus={() => () => {}}
      />,
      { wrappingComponent: TestProvider }
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(DataError).length).toBe(1);
  });
});
