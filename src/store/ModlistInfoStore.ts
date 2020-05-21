import axios from 'axios';

import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { AxiosState, AxiosError } from 'types/axios';

export interface ModlistInfoState extends AxiosState {
  infoMap: Map<string, string>;
}

export interface FetchModlistInfoRequest {
  type: 'FETCH_MODLISTINFO_REQUEST';
  machineURL: string;
  link: string;
}

export interface FetchModlistInfoSuccess {
  type: 'FETCH_MODLISTINFO_SUCCESS';
  machineURL: string;
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
  requestModlistInfo: (
    link: string,
    machineURL: string
  ): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (
      appState &&
      appState.modlistInfo &&
      appState.modlistInfo.infoMap &&
      !appState.modlistInfo.infoMap.has(machineURL) &&
      appState.modlistInfo.error?.extraData !== machineURL
    ) {
      axios
        .get(link)
        .then((response) => response.data as Promise<string>)
        .then((data) => {
          dispatch({
            type: 'FETCH_MODLISTINFO_SUCCESS',
            readme: data,
            machineURL: machineURL,
          });
        })
        .catch((error) => {
          const axiosError = error as AxiosError;
          axiosError.extraData = machineURL;
          dispatch({
            type: 'FETCH_MODLISTINFO_FAILURE',
            error: axiosError,
          });
        });

      dispatch({
        type: 'FETCH_MODLISTINFO_REQUEST',
        link: link,
        machineURL: machineURL,
      });
    }
  },
};

const unloadedState: ModlistInfoState = {
  isLoading: false,
  infoMap: new Map<string, string>(),
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
        infoMap: state.infoMap,
      };
    case 'FETCH_MODLISTINFO_SUCCESS':
      state.infoMap.set(action.machineURL, action.readme);
      return {
        isLoading: false,
        infoMap: state.infoMap,
      };
    case 'FETCH_MODLISTINFO_FAILURE':
      return {
        isLoading: false,
        error: action.error,
        infoMap: state.infoMap,
      };
  }

  return state;
};
