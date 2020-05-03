import * as React from 'react';
import { shallow } from 'enzyme';
import InfoSections from '../../sections/InfoSections';
import General from '../../sections/InfoSections/General';
import ModAuthors from '../../sections/InfoSections/ModAuthors';

describe('Test InfoSections component', () => {
  it('InfoSections: none', () => {
    const wrapper = shallow(
      <InfoSections
        match={{ isExact: false, url: '', path: '', params: { url: '' } }}
        history={undefined}
        location={undefined}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });

  it('InfoSections: modauthors', () => {
    const wrapper = shallow(
      <InfoSections
        match={{
          isExact: false,
          url: '',
          path: '',
          params: { url: 'modauthors' },
        }}
        history={undefined}
        location={undefined}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });

  it('InfoSections: general', () => {
    const wrapper = shallow(
      <InfoSections
        match={{
          isExact: false,
          url: '',
          path: '',
          params: { url: 'general' },
        }}
        history={undefined}
        location={undefined}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });

  it('ModAuthors', () => {
    const wrapper = shallow(<ModAuthors />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });

  it('General', () => {
    const wrapper = shallow(<General />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);
    wrapper.unmount();
  });
});
