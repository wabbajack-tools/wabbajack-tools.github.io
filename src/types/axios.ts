import * as React from 'react';

/**
 * Utility class for PureComponents
 */
export abstract class ReactAxiosComponent<
  P = {},
  S = {},
  SS = any
> extends React.PureComponent<P, S, SS> {
  public componentDidMount() {
    this.ensureDataFetched();
  }

  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  /**
   * Use this function to request data using the action from redux
   * mapped to props
   */
  abstract ensureDataFetched(): void;

  /**
   * Display an error in the render function.
   */
  abstract showError(): JSX.Element | undefined;

  /**
   * Display a loading modal in the render function.
   */
  abstract showLoading(): JSX.Element | undefined;

  /**
   * Display the content after the data was loaded and there
   * are no errors.
   */
  abstract showContent(): JSX.Element | undefined;
}

/**
 * State for sub-stores that use axios in actions
 */
export interface AxiosState {
  isLoading: boolean;
  error?: AxiosError;
}

export interface AxiosError {
  message: string;
  response: AxiosResponse;
  request: AxiosRequest;
}

export interface AxiosRequest {
  response: string;
  responseText: string;
  responseURL: string;
  status: number;
  statusText: string;
}

export interface AxiosResponse {
  data: string;
  status: number;
  statusText: string;
}
