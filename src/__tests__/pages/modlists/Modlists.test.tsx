import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../../../test-utils';
import { FakeModlistMetaData } from '../../../__mocks__/modlist';
import { FakeAxiosError } from '../../../__mocks__/axiosState';

import { ModlistsPage } from '../../../pages/modlists/';
import { DataError, Error } from '../../../components/Fetching';

describe('Test Modlists page', () => {
  let wrapper: ShallowWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('Renders with default State', () => {
    wrapper = shallow(
      <ModlistsPage
        isLoading={false}
        requestModlists={() => () => {}}
        modlists={[FakeModlistMetaData]}
      />
    );
    wrapperTest(expect, wrapper);
  });

  it('State: loading', () => {
    wrapper = shallow(
      <ModlistsPage isLoading={true} requestModlists={() => () => {}} />
    );
    wrapperTest(expect, wrapper);
  });

  it('State: not loading, modlists is undefined, expecting a DataError component', () => {
    wrapper = shallow(
      <ModlistsPage isLoading={false} requestModlists={() => () => {}} />
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(DataError).length).toBe(1);
  });

  it('State: not loading, modlists has a length of 0, expecting a DataError component', () => {
    wrapper = shallow(
      <ModlistsPage
        isLoading={false}
        requestModlists={() => () => {}}
        modlists={[]}
      />
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(DataError).length).toBe(1);
  });

  it('State: not loading, modlists is undefined and we have an error, expecting an Error component', () => {
    wrapper = shallow(
      <ModlistsPage
        isLoading={false}
        requestModlists={() => () => {}}
        error={FakeAxiosError}
      />
    );
    wrapperTest(expect, wrapper);
    expect(wrapper.find(Error).length).toBe(1);
  });
});
