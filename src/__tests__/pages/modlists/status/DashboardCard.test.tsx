import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../../../../test-utils';
import { FakeFailingModlistStatus } from '../../../../__mocks__/modlist';

import DashboardCard from '../../../../pages/modlists/status/DashboardCard';

describe('Test DashboardCard component', () => {
  let wrapper: ShallowWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('Renders without crashing (Failing Status)', () => {
    wrapper = shallow(<DashboardCard status={FakeFailingModlistStatus} />);
    wrapperTest(expect, wrapper);
  });

  it('Renders without crashing (Succeeding Status)', () => {
    wrapper = shallow(<DashboardCard status={FakeFailingModlistStatus} />);
    wrapperTest(expect, wrapper);
  });
});
