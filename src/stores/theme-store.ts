import { observable, action } from 'mobx';

import { whiteTheme, darkTheme, createTheme } from '../assets/jss/theme.js';

export default class ThemeStore {
  @observable
  theme = createTheme(darkTheme);

  @observable
  isDark = true;

  @action
  setTheme(dark: boolean) {
    this.isDark = dark;
    this.theme = this.isDark ? createTheme(darkTheme) : createTheme(whiteTheme);
  }

  @action
  toggleTheme() {
    this.setTheme(!this.isDark);
  }
}
