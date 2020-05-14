import axios from 'axios';

import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ModlistDetailedStatus } from 'types/modlist';
import { AxiosState, AxiosError } from 'types/axios';

export interface ModlistStatusState extends AxiosState {
  statusMap?: Map<string, ModlistDetailedStatus> | undefined;
}

export interface FetchStatusRequest {
  type: 'FETCH_STATUS_REQUEST';
  link: string;
}

export interface FetchStatusSuccess {
  type: 'FETCH_STATUS_SUCCESS';
  link: string;
  status: ModlistDetailedStatus;
}

export interface FetchStatusFailure {
  type: 'FETCH_STATUS_FAILURE';
  error: AxiosError;
}

export type KnownAction =
  | FetchStatusRequest
  | FetchStatusSuccess
  | FetchStatusFailure;

export const actionCreator = {
  requestDetailedStatus: (link: string): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (
      appState.modlistStatus &&
      !appState.modlistStatus.error &&
      appState.modlistStatus.statusMap &&
      !appState.modlistStatus.statusMap.has(link)
    ) {
      axios
        .get(`https://build.wabbajack.org/lists/status/${link}.json`)
        .then((response) => response.data as Promise<ModlistDetailedStatus>)
        .then((data) => {
          dispatch({ type: 'FETCH_STATUS_SUCCESS', status: data, link: link });
        })
        .catch((error) => {
          const axiosError = error as AxiosError;
          dispatch({ type: 'FETCH_STATUS_FAILURE', error: axiosError });
        });
      dispatch({ type: 'FETCH_STATUS_REQUEST', link: link });
    }
  },
};

const unloadedState: ModlistStatusState = {
  isLoading: false,
  statusMap: new Map(),
};

export const reducer: Reducer<ModlistStatusState> = (
  state: ModlistStatusState | undefined,
  incomingAction: Action
): ModlistStatusState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'FETCH_STATUS_REQUEST':
      return {
        isLoading: true,
        statusMap: state.statusMap,
      };
    case 'FETCH_STATUS_SUCCESS':
      state.statusMap?.set(action.link, action.status);
      return {
        isLoading: false,
        statusMap: state.statusMap,
      };
    case 'FETCH_STATUS_FAILURE':
      return {
        isLoading: false,
        error: action.error,
      };
  }
  return state;
};
