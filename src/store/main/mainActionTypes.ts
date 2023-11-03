// third-party
import { HYDRATE } from 'next-redux-wrapper';
// application
import { AppAction } from '../types';
import { MAIN_NAMESPACE, MainState } from './mainTypes';
import { IHomePageInfo } from '../../interfaces/main';

export const MAIN_HYDRATE = HYDRATE;
export const MAIN_INIT = 'MAIN_INIT';
export const MAIN_FETCH_SUCCESS = 'MAIN_FETCH_SUCCESS';
export const MAIN_FETCH_START = 'MAIN_FETCH_START';

export interface MainHydrateAction {
    type: typeof MAIN_HYDRATE;
    payload: {
        [MAIN_NAMESPACE]: MainState;
    };
}

export interface MainInitAction {
    type: typeof MAIN_INIT;
}

export interface MainFetchStartAction {
    type: typeof MAIN_FETCH_START;
}

export interface MainFetchSuccessAction {
    type: typeof MAIN_FETCH_SUCCESS;
    data: IHomePageInfo;
}

export type MainAction =
    MainHydrateAction |
    MainInitAction |
    MainFetchStartAction |
    MainFetchSuccessAction;

export type MainThunkAction<T = void> = AppAction<MainAction, T>;
