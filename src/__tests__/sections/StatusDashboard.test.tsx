import * as React from 'react';
import { shallow } from 'enzyme';
import { StatusDashboard } from '../../sections/StatusDashboard';
import { StatusCard } from '../../sections/StatusDashboard/StatusCard';
import { AppThunkAction } from '../../store';

import { KnownAction } from '../../store/ModlistStatusStore';

import { statusModlist, failingModlist } from '../../__mocks__/modlist';
import { axiosError } from '../../__mocks__/axiosTypes';

const requestStatusList = (): AppThunkAction<KnownAction> => () => {};

describe('Test StatusDashboard section', () => {
  it('StatusDashboard renders without crashing', () => {
    const wrapper = shallow(
      <StatusDashboard
        isLoading={false}
        error={undefined}
        requestStatusList={requestStatusList}
        statusList={[statusModlist, failingModlist]}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('StatusDashboard: loading', () => {
    const wrapper = shallow(
      <StatusDashboard
        isLoading={true}
        error={undefined}
        requestStatusList={requestStatusList}
        statusList={undefined}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('StatusDashboard: error', () => {
    const wrapper = shallow(
      <StatusDashboard
        isLoading={false}
        error={axiosError}
        requestStatusList={requestStatusList}
        statusList={undefined}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('StatusCard renders without crashing (success)', () => {
    const wrapper = shallow(<StatusCard status={statusModlist} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('StatusCard renders without crashing (failing)', () => {
    const wrapper = shallow(<StatusCard status={failingModlist} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });
});
