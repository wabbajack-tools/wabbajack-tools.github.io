import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../../../../test-utils';
import {
  FakeFailingModlistStatus,
  FakeSucceedingModlistStatus,
} from '../../../../__mocks__/modlist';

import Dashboard from '../../../../pages/modlists/status/Dashboard';

describe('Test Dashboard page', () => {
  let wrapper: ShallowWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('Renders without crashing', () => {
    wrapper = shallow(
      <Dashboard
        statusList={[FakeFailingModlistStatus, FakeSucceedingModlistStatus]}
      />
    );
    wrapperTest(expect, wrapper);
  });
});
