import * as React from 'react';
import { shallow } from 'enzyme';
import StartSection, { CustomCard } from '../../sections/StartSection';

describe('Test StartSection', () => {
  it('StartSection renders without crashing', () => {
    const wrapper = shallow(<StartSection />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });

  it('CustomCard renders without crashing', () => {
    const wrapper = shallow(
      <CustomCard title="" media="" body="" link="" linkText="" />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });

  it('CustomCard renders without crashing (openNew)', () => {
    const wrapper = shallow(
      <CustomCard
        title=""
        media=""
        body=""
        link=""
        linkText=""
        openNew={true}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });
});
