// application
import {
    accountLogin, accountUpdate, accountRemove, accountRegister, accountLogout,
} from './accountActions';
import { useAppAction, useAppSelector } from '../hooks';

export const useAccount = () => useAppSelector((state) => state.account);

export const useAccountLogin = () => useAppAction(accountLogin);

export const useAccountRegister = () => useAppAction(accountRegister);

export const useAccountUpdate = () => useAppAction(accountUpdate);
export const useAccountRemove = () => useAppAction(accountRemove);
export const useAccountLogout = () => useAppAction(accountLogout);
