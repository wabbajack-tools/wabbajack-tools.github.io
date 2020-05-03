import axios from 'axios';

import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { AxiosState, AxiosError } from '../utils/axios';

export interface ModlistInfoState extends AxiosState {
  info?: string | undefined;
}

export interface FetchModlistInfoRequest {
  type: 'FETCH_MODLISTINFO_REQUEST';
  link: string;
}

export interface FetchModlistInfoSuccess {
  type: 'FETCH_MODLISTINFO_SUCCESS';
  readme: string;
}

export interface FetchModlistInfoFailure {
  type: 'FETCH_MODLISTINFO_FAILURE';
  error: AxiosError;
}

export type KnownAction =
  | FetchModlistInfoRequest
  | FetchModlistInfoSuccess
  | FetchModlistInfoFailure;

export const actionCreator = {
  requestModlistInfo: (link: string): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (
      appState &&
      appState.modlistInfo &&
      !appState.modlistInfo.info &&
      !appState.modlistInfo.error
    ) {
      axios
        .get(link)
        .then((response) => response.data as Promise<string>)
        .then((data) => {
          dispatch({ type: 'FETCH_MODLISTINFO_SUCCESS', readme: data });
        })
        .catch((error) => {
          const axiosError = error as AxiosError;
          dispatch({
            type: 'FETCH_MODLISTINFO_FAILURE',
            error: axiosError,
          });
        });

      dispatch({ type: 'FETCH_MODLISTINFO_REQUEST', link: link });
    }
  },
};

const unloadedState: ModlistInfoState = {
  isLoading: false,
};

export const reducer: Reducer<ModlistInfoState> = (
  state: ModlistInfoState | undefined,
  incomingAction: Action
): ModlistInfoState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'FETCH_MODLISTINFO_REQUEST':
      return {
        isLoading: true,
      };
    case 'FETCH_MODLISTINFO_SUCCESS':
      return {
        isLoading: false,
        info: action.readme,
      };
    case 'FETCH_MODLISTINFO_FAILURE':
      return {
        isLoading: false,
        error: action.error,
      };
  }

  return state;
};
