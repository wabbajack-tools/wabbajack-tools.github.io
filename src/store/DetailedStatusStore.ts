import axios from 'axios';

import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ModlistDetailedStatus } from 'types/modlist';
import { AxiosState, AxiosError } from 'types/axios';

export interface ModlistStatusState extends AxiosState {
  status?: ModlistDetailedStatus | undefined;
}

export interface FetchStatusRequest {
  type: 'FETCH_STATUS_REQUEST';
  link: string;
}

export interface FetchStatusSuccess {
  type: 'FETCH_STATUS_SUCCESS';
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
      !appState.modlistStatus.status
    ) {
      axios
        .get(`https://build.wabbajack.org/lists/status/${link}.json`)
        .then((response) => response.data as Promise<ModlistDetailedStatus>)
        .then((data) => {
          dispatch({ type: 'FETCH_STATUS_SUCCESS', status: data });
        })
        .catch((error) => {
          const axiosError = error as AxiosError;
          dispatch({ type: 'FETCH_STATUS_FAILURE', error: axiosError });
        });
      dispatch({ type: 'FETCH_STATUS_REQUEST', link: link });
    }
  },
};

const unloadedState: ModlistStatusState = { isLoading: false };

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
        status: state.status,
      };
    case 'FETCH_STATUS_SUCCESS':
      return {
        isLoading: false,
        status: action.status,
      };
    case 'FETCH_STATUS_FAILURE':
      return {
        isLoading: false,
        error: action.error,
      };
  }
  return state;
};
