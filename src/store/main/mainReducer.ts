// @ts-nocheck
// application
import { MainState } from './mainTypes';
import {
    MainAction,
    MAIN_INIT,
    MAIN_FETCH_START,
    MAIN_FETCH_SUCCESS,
} from './mainActionTypes';

const initialState: MainState = {
    init: false,
    isLoading: false,
    categories: [],
    banners: [], 
    languages: [],
    aboutUs: null,
    menuList: [],
    footer: null,
    translations: null
};

function mainReducer(state = initialState, action: MainAction): MainState {
    switch (action.type) {
    case MAIN_INIT:
        return {
            ...state,
            init: true,
        };
    case MAIN_FETCH_START:
        return { ...state, isLoading: true };
    case MAIN_FETCH_SUCCESS:
        return {
            ...state,
            isLoading: false,
            categories: [...action.data.categories],
            banners: [...action.data.banners],
            languages: [...action.data.languages],
            menuList: [...action.data.menuList],
            aboutUs: {...action.data.aboutUs},
            footer: {...action.data.footer},
            translations: {...action.data.translations}
        };
    default:
        return state;
    }
}

export default mainReducer;
