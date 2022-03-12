import {

    AccountState,
} from './accountTypes';
import {
    AccountAction,
    LOGIN_ACCOUNT,
    REMOVE_ACCOUNT,
    UPDATE_ACCOUNT,
    REGISTER_ACCOUNT,
    LOGOUT_ACCOUNT,
} from './accountActionTypes';
import { withClientState } from '../client';

const initialState: AccountState = {
    isLoggedIn: false,
    id: 0,
    appleId: '',
    email: '',
    facebookId: '',
    name: '',
    phone: '',
    secondaryPhone: '',
};

export const ACCOUNT_NAMESPACE = 'account';

function accountBaseReducer(state = initialState, action: AccountAction): AccountState {
    switch (action.type) {
    case LOGIN_ACCOUNT:
    case REGISTER_ACCOUNT:
    case UPDATE_ACCOUNT:
        return { ...state, ...action.data, isLoggedIn: true };

    case REMOVE_ACCOUNT:
    case LOGOUT_ACCOUNT:
        return { ...state, ...initialState };

    default:
        return state;
    }
}

const accountReducer = withClientState(accountBaseReducer, ACCOUNT_NAMESPACE);

export default accountReducer;
