import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ModlistGallery } from '../../sections/Gallery';
import { GalleryCard } from '../../sections/Gallery/GalleryCard';
import { AppThunkAction } from '../../store';

import { KnownAction } from '../../store/ModlistsStore';
import { TestingProvider } from '../../utils/jestProvider';

import { modlist } from '../../__mocks__/modlist';
import { axiosError } from '../../__mocks__/axiosTypes';

const requestModlists = (): AppThunkAction<KnownAction> => () => {};

describe('Test Gallery section', () => {
  it('Gallery renders without crashing', () => {
    const wrapper = shallow(
      <ModlistGallery
        isLoading={true}
        error={axiosError}
        modlists={[]}
        requestModlists={requestModlists}
      />
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('Gallery renders without crashing', () => {
    const wrapper = shallow(
      <ModlistGallery
        isLoading={false}
        modlists={[modlist]}
        requestModlists={requestModlists}
      />
    );
    wrapper.setState({ selectedGame: 'skyrim' });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });

  it('GalleryCard renders without crashing', () => {
    const wrapper = mount(<GalleryCard modlist={modlist} />, {
      wrappingComponent: TestingProvider,
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(false);

    wrapper.unmount();
  });
});
