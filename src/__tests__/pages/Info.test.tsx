import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { wrapperTest, TestProvider } from '../../test-utils';
import Info from '../../pages/info';
import GeneralInfoPage from '../../pages/info/general';
import ModAuthorsInfoPage from '../../pages/info/modauthors';

describe('Test Info page', () => {
  let wrapper: ShallowWrapper;
  afterAll(() => {
    wrapper.unmount();
  });

  it('Renders without crashing', () => {
    wrapper = shallow(<Info />, { wrappingComponent: TestProvider });
    wrapperTest(expect, wrapper);
  });

  it('General section renders without crashing', () => {
    wrapper = shallow(<GeneralInfoPage />);
    wrapperTest(expect, wrapper);
  });

  it('ModAuthors section renders without crashing', () => {
    wrapper = shallow(<ModAuthorsInfoPage />);
    wrapperTest(expect, wrapper);
  });
});
