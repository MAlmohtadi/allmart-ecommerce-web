import mainApi from "../../api/main";
import {
    MAIN_FETCH_START,
    MAIN_FETCH_SUCCESS,
    MainFetchSuccessAction,
    MainFetchStartAction,
    MainInitAction,
    MAIN_INIT,
    MainThunkAction,
} from "./mainActionTypes";
import { IHomePageInfo } from "../../interfaces/main";
import { LOCALE_NAMESPACE } from "../locale/localeReducer";


let cancelPreviousRequest = () => {};

export function mainInit(): MainInitAction {
    return {
        type: MAIN_INIT,
    };
}

export function mainFetchStart(): MainFetchStartAction {
    return {
        type: MAIN_FETCH_START,
    };
}

export function mainFetchSuccess(data: IHomePageInfo): MainFetchSuccessAction {
    return {
        type: MAIN_FETCH_SUCCESS,
        data
    };
}

export function mainFetchThunk(): MainThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        let canceled = false;
        cancelPreviousRequest();
        cancelPreviousRequest = () => {
            canceled = true;
        };

        dispatch(mainFetchStart());

        const local = getState()[LOCALE_NAMESPACE];
        const { current } = local;
        const mainDate = await mainApi.getHomePageInfo({
            // locale:current
            langId: current === "en" ? 2 : 1,
        });

        if (canceled) {
            return;
        }

        dispatch(mainFetchSuccess(mainDate));
    };
}

export function mainInitThunk(): MainThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(mainInit());
        await Promise.all([dispatch(mainFetchThunk())]);
    };
}
