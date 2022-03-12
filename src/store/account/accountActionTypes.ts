import { HYDRATE } from 'next-redux-wrapper';

import { AccountState, IAccount } from './accountTypes';
import { AppAction } from '../types';
import { ACCOUNT_NAMESPACE } from './accountReducer';

export const ACCOUNT_HYDRATE = HYDRATE;
export const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';
export const REGISTER_ACCOUNT = 'REGISTER_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const LOGOUT_ACCOUNT = 'LOGOUT_ACCOUNT';
export interface AccountHydrateAction {
    type: typeof ACCOUNT_HYDRATE;
    payload: {
        [ACCOUNT_NAMESPACE]: AccountState;
    };
}

export interface BaseAccountData {
    data: IAccount;
}

export interface LoginAccountAction extends BaseAccountData {
    type: typeof LOGIN_ACCOUNT;
}
export interface RegisterAccountAction extends BaseAccountData {
    type: typeof REGISTER_ACCOUNT;
}
export interface UpdateAccountAction extends BaseAccountData {
    type: typeof UPDATE_ACCOUNT;
}

export interface RemoveAccountAction {
    type: typeof REMOVE_ACCOUNT;
}
export interface LogoutAccountAction {
    type: typeof LOGOUT_ACCOUNT;
}
export type AccountAction =
    AccountHydrateAction |
    LoginAccountAction |
    RegisterAccountAction |
    UpdateAccountAction |
    RemoveAccountAction |
    LogoutAccountAction;

export type AccountThunkAction<T = void> = AppAction<AccountAction, T>;
