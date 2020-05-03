import axios from 'axios';

import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ModlistMetaData } from '../utils/modlist';
import { AxiosState, AxiosError } from '../utils/axios';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ModlistsState extends AxiosState {
  modlists?: ModlistMetaData[] | undefined;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface FetchModlistsRequest {
  type: 'FETCH_MODLISTS_REQUEST';
}

export interface FetchModlistsSuccess {
  type: 'FETCH_MODLISTS_SUCCESS';
  modlists: ModlistMetaData[];
}

export interface FetchModlistsFailure {
  type: 'FETCH_MODLISTS_FAILURE';
  error: AxiosError;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction =
  | FetchModlistsRequest
  | FetchModlistsSuccess
  | FetchModlistsFailure;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreator = {
  requestModlists: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (
      appState &&
      appState.modlists &&
      appState.modlists.modlists &&
      appState.modlists.modlists.length === 0 &&
      !appState.modlists.error
    ) {
      axios
        .get(
          'https://raw.githubusercontent.com/wabbajack-tools/mod-lists/master/modlists.json'
        )
        .then((response) => response.data as Promise<ModlistMetaData[]>)
        .then((data) => {
          dispatch({ type: 'FETCH_MODLISTS_SUCCESS', modlists: data });
        })
        .catch((error) => {
          const axiosError = error as AxiosError;
          dispatch({ type: 'FETCH_MODLISTS_FAILURE', error: axiosError });
        });

      dispatch({ type: 'FETCH_MODLISTS_REQUEST' });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const unloadedState: ModlistsState = { isLoading: false, modlists: [] };

export const reducer: Reducer<ModlistsState> = (
  state: ModlistsState | undefined,
  incomingAction: Action
): ModlistsState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'FETCH_MODLISTS_REQUEST':
      return {
        isLoading: true,
        modlists: state.modlists,
      };
    case 'FETCH_MODLISTS_SUCCESS':
      return {
        isLoading: false,
        modlists: action.modlists,
      };
    case 'FETCH_MODLISTS_FAILURE':
      return {
        isLoading: false,
        error: action.error,
      };
  }

  return state;
};
