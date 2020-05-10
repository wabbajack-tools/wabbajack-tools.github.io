import axios from 'axios';

import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ModlistStatus } from 'types/modlist';
import { AxiosState, AxiosError } from 'types/axios';

export interface ModlistStatusState extends AxiosState {
  statusList?: ModlistStatus[] | undefined;
}

export interface FetchStatusListRequest {
  type: 'FETCH_STATUSLIST_REQUEST';
}

export interface FetchStatusListSuccess {
  type: 'FETCH_STATUSLIST_SUCCESS';
  statusList: ModlistStatus[];
}

export interface FetchStatusListFailure {
  type: 'FETCH_STATUSLIST_FAILURE';
  error: AxiosError;
}

export type KnownAction =
  | FetchStatusListRequest
  | FetchStatusListSuccess
  | FetchStatusListFailure;

export const actionCreator = {
  requestStatusList: (): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (
      appState &&
      appState.modlistStatusList &&
      appState.modlistStatusList.statusList &&
      appState.modlistStatusList.statusList.length === 0 &&
      !appState.modlistStatusList.error
    ) {
      axios
        .get('https://build.wabbajack.org/lists/status.json')
        .then((response) => response.data as Promise<ModlistStatus[]>)
        .then((data) => {
          dispatch({ type: 'FETCH_STATUSLIST_SUCCESS', statusList: data });
        })
        .catch((error) => {
          const axiosError = error as AxiosError;
          dispatch({ type: 'FETCH_STATUSLIST_FAILURE', error: axiosError });
        });

      dispatch({ type: 'FETCH_STATUSLIST_REQUEST' });
    }
  },
};

const unloadedState: ModlistStatusState = { isLoading: false, statusList: [] };

export const reducer: Reducer<ModlistStatusState> = (
  state: ModlistStatusState | undefined,
  incomingAction: Action
): ModlistStatusState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'FETCH_STATUSLIST_REQUEST':
      return {
        isLoading: true,
        statusList: state.statusList,
      };
    case 'FETCH_STATUSLIST_SUCCESS':
      return {
        isLoading: false,
        statusList: action.statusList,
      };
    case 'FETCH_STATUSLIST_FAILURE':
      return {
        isLoading: false,
        error: action.error,
      };
  }

  return state;
};
