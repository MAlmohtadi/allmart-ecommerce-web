// third-party
import { toast } from 'react-toastify';

import {

    LOGIN_ACCOUNT,
    LoginAccountAction,
    AccountThunkAction,
    UPDATE_ACCOUNT,
    UpdateAccountAction,
    REGISTER_ACCOUNT,
    RegisterAccountAction,
    RemoveAccountAction,
    REMOVE_ACCOUNT,
    LOGOUT_ACCOUNT,
    LogoutAccountAction,
} from './accountActionTypes';
import shopApi, { AccountOptions } from '../../api/shop';
import { IAccount } from './accountTypes';

let cancelPreviousRequest = () => { };

export function loginAccountSuccess(
    data: IAccount,
): LoginAccountAction {
    toast.success('تم تسجيل الدخول بنجاح', { theme: 'colored' });
    return {
        type: LOGIN_ACCOUNT,
        data,
    };
}
export function updateAccountSuccess(
    data: IAccount,
): UpdateAccountAction {
    toast.success('تم تحديث معلوماتك بنجاح', { theme: 'colored' });
    return {
        type: UPDATE_ACCOUNT,
        data,
    };
}
export function registerAccountSuccess(
    data: IAccount,
): RegisterAccountAction {
    toast.success('تم انشاء حسابك بنجاح', { theme: 'colored' });
    return {
        type: REGISTER_ACCOUNT,
        data,
    };
}
export function removeAccountSuccess(): RemoveAccountAction {
    // toast.success(`Product "${product.name}" added to cart!`, { theme: 'colored' });
    return {
        type: REMOVE_ACCOUNT,
    };
}
export function logoutAccountSuccess(): LogoutAccountAction {
    toast.success('تم تسجيل الخروج', { theme: 'colored' });
    return {
        type: LOGOUT_ACCOUNT,
    };
}

export function accountLoginThunk(accountOptions: AccountOptions): AccountThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return async (dispatch) => {
        let canceled = false;

        cancelPreviousRequest();
        cancelPreviousRequest = () => { canceled = true; };
        const data = await shopApi.login(accountOptions);
        if (canceled) {
            return;
        }
        if (data.isBussinessError) {
            toast.error(`${data.message}`, { theme: 'colored' });
        } else {
            await dispatch(loginAccountSuccess(data));
        }
    };
}

export function accountRegister(accountOptions: AccountOptions): AccountThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return async (dispatch) => {
        let canceled = false;

        cancelPreviousRequest();
        cancelPreviousRequest = () => { canceled = true; };
        const data = await shopApi.registerAccoount(accountOptions);
        if (canceled) {
            return;
        }
        if (data.isBussinessError) {
            toast.error(`${data.message}`, { theme: 'colored' });
        } else {
            await dispatch(registerAccountSuccess(data));
        }
    };
}
export function accountUpdate(accountOptions: AccountOptions): AccountThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return async (dispatch) => {
        const data = await shopApi.updateAccoount(accountOptions);
        await dispatch(updateAccountSuccess(data));
    };
}
export function accountRemove(accountOptions: AccountOptions): AccountThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return async (dispatch) => {
        await shopApi.removeAccoount(accountOptions);
        dispatch(removeAccountSuccess());
    };
}

export function accountLogout(): AccountThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return async (dispatch) => {
        await dispatch(logoutAccountSuccess());
    };
}
