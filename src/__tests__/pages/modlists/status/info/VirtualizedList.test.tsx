import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest } from '../../../../../test-utils';
import { FakeSucceedingModlistDetailedStatus } from '../../../../../__mocks__/modlist';

import VirtualizedList from '../../../../../pages/modlists/status/info/VirtualizedList';

describe('Test Status page', () => {
  let wrapper: ShallowWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('Renders with default state', () => {
    wrapper = shallow(
      <VirtualizedList list={FakeSucceedingModlistDetailedStatus.Archives} />
    );
    wrapperTest(expect, wrapper);
  });
});
