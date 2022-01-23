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
    SHOP_FETCH_PRODUCTS_START,
    SHOP_FETCH_PRODUCTS_SUCCESS,
} from './shopActionTypes';

const initialState: ShopState = {
    init: false,
    categorySlug: null,
    categoryIsLoading: true,
    category: null,
    productsListIsLoading: true,
    productsList: null,
    options: {
        pageSize: 12,
        nextPageNumber: 1,
        sort: 'asc',
    },
    filters: {},
    productsIsLoading: true,
    products: [],
    nextPageNumber: 1,
    productsRemainingCount: 0,
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
            options: { ...state.options, ...action.options },
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
    case SHOP_FETCH_PRODUCTS_START:
        return { ...state, productsIsLoading: true };
    case SHOP_FETCH_PRODUCTS_SUCCESS:
        return {
            ...state,
            productsIsLoading: false,
            ...action.data,
        };
    case SHOP_SET_OPTION_VALUE:
        return {
            ...state,
            options: { ...state.options, page: 1, [action.option]: action.value },
        };
    case SHOP_SET_FILTER_VALUE: return shopReducerSetFilterValue(state, action);
    case SHOP_RESET_FILTERS:
        return {
            ...state,
            options: {
                ...state.options,
                page: 1,
                pageSize: 12,
                nextPageNumber: 1,
                sort: 'asc',
            },
            filters: {},
        };
    default:
        return state;
    }
}

export default shopReducer;
