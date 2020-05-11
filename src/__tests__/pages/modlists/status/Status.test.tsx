import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../../../../test-utils';
import {
  FakeModlistMetaData,
  FakeModlistStatus,
} from '../../../../__mocks__/modlist';
import { FakeAxiosError } from '../../../../__mocks__/axiosState';

import { ModlistsStatusPage } from '../../../../pages/modlists/status';
import { DataError, Error, Loading } from '../../../../components/Fetching';

describe('Test Modlist page', () => {
  let wrapper: ShallowWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('Renders without crashing', () => {
    wrapper = shallow(
      <ModlistsStatusPage
        isLoading={false}
        requestStatusList={() => () => {}}
        modlists={[FakeModlistMetaData]}
        statusList={[FakeModlistStatus]}
      />
    );
    wrapperTest(expect, wrapper);
  });

  it('Behaves correctly after state changes', () => {
    //loading expecting a Loading component
    wrapper = shallow(
      <ModlistsStatusPage
        isLoading={true}
        requestStatusList={() => () => {}}
        modlists={[]}
      />
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(Loading).length).toBe(1);

    //not loading, modlists has a length of 0, expecting a DataError component
    wrapper = shallow(
      <ModlistsStatusPage
        isLoading={false}
        requestStatusList={() => () => {}}
        modlists={[]}
      />
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(DataError).length).toBe(1);

    //not loading, statusList is undefined and we have an error, expecting an Error component
    wrapper = shallow(
      <ModlistsStatusPage
        isLoading={false}
        requestStatusList={() => () => {}}
        modlists={[]}
        error={FakeAxiosError}
      />
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(Error).length).toBe(1);

    //not loading, statusList is undefined, expecting an Error component
    wrapper = shallow(
      <ModlistsStatusPage
        isLoading={false}
        requestStatusList={() => () => {}}
        modlists={[FakeModlistMetaData]}
      />
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(DataError).length).toBe(1);

    //not loading, statusList has a length of 0, expecting an Error component
    wrapper = shallow(
      <ModlistsStatusPage
        isLoading={false}
        requestStatusList={() => () => {}}
        modlists={[FakeModlistMetaData]}
        statusList={[]}
      />
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(DataError).length).toBe(1);
  });
});
