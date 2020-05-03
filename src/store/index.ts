import * as Modlists from './ModlistsStore';
import * as ModlistInfo from './ModlistInfoStore';
import * as ModlistStatusList from './ModlistStatusStore';
import * as ModlistStatus from './DetailedStatusStore';

// The top-level state object
export interface ApplicationState {
  modlists: Modlists.ModlistsState | undefined;
  modlistInfo: ModlistInfo.ModlistInfoState | undefined;
  modlistStatusList: ModlistStatusList.ModlistStatusState | undefined;
  modlistStatus: ModlistStatus.ModlistStatusState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  modlists: Modlists.reducer,
  modlistInfo: ModlistInfo.reducer,
  modlistStatusList: ModlistStatusList.reducer,
  modlistStatus: ModlistStatus.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
