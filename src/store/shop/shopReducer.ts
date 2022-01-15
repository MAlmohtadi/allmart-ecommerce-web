// application
import { IFilterValues } from '../../interfaces/list';
import { SHOP_NAMESPACE, ShopState } from './shopTypes';
import {
    SHOP_FETCH_CATEGORY_SUCCESS,
    SHOP_FETCH_PRODUCTS_LIST_START,
    SHOP_FETCH_PRODUCTS_LIST_SUCCESS,
    SHOP_HYDRATE,
    SHOP_INIT,
    SHOP_RESET_FILTERS,
    SHOP_SET_FILTER_VALUE,
    SHOP_SET_OPTION_VALUE,
    ShopAction,
    ShopSetFilterValueAction,
} from './shopActionTypes';

const initialState: ShopState = {
    init: false,
    categorySlug: null,
    categoryIsLoading: true,
    category: null,
    productsListIsLoading: true,
    productsList: null,
    options: {},
    filters: {},
};

function shopReducerSetFilterValue(state: ShopState, action: ShopSetFilterValueAction): ShopState {
    const currentFilters = { ...state.filters };
    let filters: IFilterValues;

    if (action.value !== null) {
        filters = { ...currentFilters, [action.filter]: action.value };
    } else {
        delete currentFilters[action.filter];

        filters = { ...currentFilters };
    }

    return {
        ...state,
        options: { ...state.options, page: 1 },
        filters,
    };
}

function shopReducer(state = initialState, action: ShopAction): ShopState {
    switch (action.type) {
    case SHOP_HYDRATE:
        return action.payload[SHOP_NAMESPACE];
    case SHOP_INIT:
        return {
            ...initialState,
            categorySlug: action.categorySlug,
            options: action.options,
            filters: action.filters,
        };
    case SHOP_FETCH_CATEGORY_SUCCESS:
        return {
            ...state,
            init: true,
            categoryIsLoading: false,
            category: action.category,
        };
    case SHOP_FETCH_PRODUCTS_LIST_START:
        return { ...state, productsListIsLoading: true };
    case SHOP_FETCH_PRODUCTS_LIST_SUCCESS:
        return {
            ...state,
            productsListIsLoading: false,
            productsList: action.productsList,
        };
    case SHOP_SET_OPTION_VALUE:
        return {
            ...state,
            options: { ...state.options, page: 1, [action.option]: action.value },
        };
    case SHOP_SET_FILTER_VALUE: return shopReducerSetFilterValue(state, action);
    case SHOP_RESET_FILTERS:
        return { ...state, options: { ...state.options, page: 1 }, filters: {} };
    default:
        return state;
    }
}

export default shopReducer;
