import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { wrapperTest, TestProvider } from '../../test-utils';
import MaterialLink from '../../components/MaterialLink';

import { Link, Button } from '@material-ui/core';

describe('Test MaterialLink component', () => {
  let wrapper: ReactWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('MaterialLink as button renders without crashing', () => {
    wrapper = mount(
      <MaterialLink href="/test" disableScroll>
        Button
      </MaterialLink>,
      {
        wrappingComponent: TestProvider,
      }
    );
    wrapperTest(expect, wrapper);
  });

  it('MaterialLink onClick for buttons works as intended', () => {
    wrapper.find(Button).first().simulate('click');
  });

  it('MaterialLink as link renders without crashing', () => {
    wrapper = mount(
      <MaterialLink href="/test" isLink>
        Link
      </MaterialLink>,
      {
        wrappingComponent: TestProvider,
      }
    );
    wrapperTest(expect, wrapper);
  });

  it('MaterialLink onClick for links works as intended', () => {
    wrapper.find(Link).first().simulate('click');
  });
});
