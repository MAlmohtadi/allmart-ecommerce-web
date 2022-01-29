// third-party
import { HYDRATE } from 'next-redux-wrapper';
// application
import { AppAction } from '../types';
import { HOME_NAMESPACE, HomeState } from './homeTypes';
import { IHomePageResponse } from '../../interfaces/hompage';

export const HOME_HYDRATE = HYDRATE;
export const HOME_INIT = 'HOME_INIT';
export const HOME_FETCH_SUCCESS = 'HOME_FETCH_SUCCESS';
export const HOME_FETCH_START = 'HOME_FETCH_START';

export interface HomeHydrateAction {
    type: typeof HOME_HYDRATE;
    payload: {
        [HOME_NAMESPACE]: HomeState;
    };
}

export interface HomeInitAction {
    type: typeof HOME_INIT;
}

export interface HomeFetchStartAction {
    type: typeof HOME_FETCH_START;
}

export interface HomeFetchSuccessAction {
    type: typeof HOME_FETCH_SUCCESS;
    data: IHomePageResponse;
}

export type HomeAction =
    HomeHydrateAction |
    HomeInitAction |
    HomeFetchStartAction |
    HomeFetchSuccessAction;

export type HomeThunkAction<T = void> = AppAction<HomeAction, T>;
