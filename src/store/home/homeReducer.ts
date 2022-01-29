// application
import { HOME_NAMESPACE, HomeState } from './homeTypes';
import {
    HomeAction,
    HOME_HYDRATE,
    HOME_INIT,
    HOME_FETCH_START,
    HOME_FETCH_SUCCESS,
} from './homeActionTypes';

const initialState: HomeState = {
    init: false,
    homeIsLoading: false,
    categories: [],
    banners: [],
    adminSettingsResponse: null,
};

function homeReducer(state = initialState, action: HomeAction): HomeState {
    switch (action.type) {
    case HOME_HYDRATE:
        return action.payload[HOME_NAMESPACE];
    case HOME_INIT:
        return {
            ...state,
            init: true,
        };
    case HOME_FETCH_START:
        return { ...state, homeIsLoading: true };
    case HOME_FETCH_SUCCESS:
        return {
            ...state,
            homeIsLoading: false,
            categories: [...action.data.categories],
            banners: [...action.data.banners],
            adminSettingsResponse: { ...action.data.adminSettingsResponse },
        };
    default:
        return state;
    }
}

export default homeReducer;
