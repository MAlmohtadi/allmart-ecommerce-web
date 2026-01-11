// application
import { HomeState } from './homeTypes';
import { HYDRATE } from 'next-redux-wrapper';
import {
    HomeAction,
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
    translations: null,
    languages: null,
};

function homeReducer(state = initialState, action: HomeAction): HomeState {
    if(action.type == HOME_FETCH_SUCCESS) {
    console.log("action", {data: {...action.data}});
    }
    switch (action.type) {
    case HYDRATE:
        // Merge server-side state only if values exist
        return {
            ...state,
            ...action.payload.home,
        };
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
            categories: [...action.data?.categories],
            banners: [...action.data?.banners],
            adminSettingsResponse: { ...action.data?.adminSettingsResponse },
            languages: [ ...action.data?.languages ],
            translations: { ...action.data?.translations },
        };
    case 'CLEAR_HOME_DATA':
        return {
            ...initialState,
            init: state.init, // Keep init flag
        };
    default:
        return state;
    }
}

export default homeReducer;
