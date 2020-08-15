import * as React from 'react';

import {
  ThemeStore,
  ModlistsStore,
  ModlistsInfoStore,
  ModlistsStatusStore,
  DetailedStatusStore,
} from '../stores';

export const storesContext = React.createContext({
  themeStore: new ThemeStore(),
  modlistsStore: new ModlistsStore(),
  modlistsInfoStore: new ModlistsInfoStore(),
  modlistsStatusStore: new ModlistsStatusStore(),
  detailedStatusStore: new DetailedStatusStore(),
});
