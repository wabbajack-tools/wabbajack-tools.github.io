const storeFake = (state: any) => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

export const fakeStore = storeFake({}) as any;
