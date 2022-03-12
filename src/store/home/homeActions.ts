import shopApi from '../../api/shop';
import {

    HOME_FETCH_START,
    HOME_FETCH_SUCCESS,
    HomeFetchSuccessAction,
    HomeFetchStartAction,
    HomeInitAction,
    HOME_INIT,
    HomeThunkAction,
} from './homeActionTypes';
import { SALE_NAMESPACE } from '../sale/saleReducer';
import { IHomePageResponse } from '../../interfaces/homepage';

let cancelPreviousRequest = () => { };

export function homeInit(): HomeInitAction {
    return {
        type: HOME_INIT,
    };
}

export function homeFetchStart(): HomeFetchStartAction {
    return {
        type: HOME_FETCH_START,
    };
}

export function homeFetchSuccess(data: IHomePageResponse): HomeFetchSuccessAction {
    return {
        type: HOME_FETCH_SUCCESS,
        data,
    };
}

export function homeFetchThunk(): HomeThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        let canceled = false;

        cancelPreviousRequest();
        cancelPreviousRequest = () => { canceled = true; };

        dispatch(homeFetchStart());

        const saleState = getState()[SALE_NAMESPACE];
        const { isWholeSale } = saleState;
        const homeDate = await shopApi.getHomePageData({ isWholeSale });

        if (canceled) {
            return;
        }

        dispatch(homeFetchSuccess(homeDate));
    };
}

export function homeInitThunk(): HomeThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(homeInit());
        await Promise.all([
            dispatch(homeFetchThunk()),
        ]);
    };
}
