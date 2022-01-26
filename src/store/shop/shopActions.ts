import shopApi from '../../api/shop';
import { IFilterValues, IListOptions, IProductOptions } from '../../interfaces/list';
import { IProductResponse } from '../../interfaces/product';
import { SHOP_NAMESPACE } from './shopTypes';
import {
    SHOP_FETCH_PRODUCTS_LIST_START,
    SHOP_FETCH_PRODUCTS_LIST_SUCCESS,
    SHOP_INIT,
    SHOP_RESET_FILTERS,
    SHOP_SET_FILTER_VALUE,
    SHOP_SET_OPTION_VALUE,
    ShopFetchProductsListStartAction,
    ShopFetchProductsListSuccessAction,
    ShopInitAction,
    ShopResetFiltersAction,
    ShopSetFilterValueAction,
    ShopSetOptionValueAction,
    ShopThunkAction,
} from './shopActionTypes';
import { SALE_NAMESPACE } from '../sale/saleReducer';

let cancelPreviousProductsListRequest = () => { };

export function shopInit(
    options: IProductOptions = {},
    filters: IFilterValues = {},
): ShopInitAction {
    return {
        type: SHOP_INIT,
        options,
        filters,
    };
}

export function shopFetchProductsListStart(): ShopFetchProductsListStartAction {
    return {
        type: SHOP_FETCH_PRODUCTS_LIST_START,
    };
}

export function shopFetchProductsListSuccess(productsList: IProductResponse): ShopFetchProductsListSuccessAction {
    return {
        type: SHOP_FETCH_PRODUCTS_LIST_SUCCESS,
        productsList,
    };
}

export function shopResetFilters(): ShopResetFiltersAction {
    return {
        type: SHOP_RESET_FILTERS,
    };
}

export function shopSetOptionValue(option: string, value: string): ShopSetOptionValueAction {
    return {
        type: SHOP_SET_OPTION_VALUE,
        option,
        value,
    };
}

export function shopSetFilterValue(filter: string, value: string | null): ShopSetFilterValueAction {
    return {
        type: SHOP_SET_FILTER_VALUE,
        filter,
        value,
    };
}

export function shopFetchProductsListThunk(): ShopThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        let canceled = false;

        cancelPreviousProductsListRequest();
        cancelPreviousProductsListRequest = () => { canceled = true; };

        dispatch(shopFetchProductsListStart());

        const shopState = getState()[SHOP_NAMESPACE];
        const saleState = getState()[SALE_NAMESPACE];
        const { options } = shopState;
        options.sort = typeof options.sort === 'string' ? options.sort : '';
        options.nextPageNumber = options.page || 1;
        options.pageSize = options.limit || 12;
        options.isWholeSale = saleState.isWholeSale;
        const productsList = await shopApi.getProductsList(options);

        if (canceled) {
            return;
        }

        dispatch(shopFetchProductsListSuccess(productsList));
    };
}

export function shopSetOptionValueThunk(option: string, value: string): ShopThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(shopSetOptionValue(option, value));
        await dispatch(shopFetchProductsListThunk());
    };
}

export function shopSetFilterValueThunk(filter: string, value: string | null): ShopThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(shopSetFilterValue(filter, value));
        await dispatch(shopFetchProductsListThunk());
    };
}

export function shopResetFiltersThunk(): ShopThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(shopResetFilters());
        await dispatch(shopFetchProductsListThunk());
    };
}

export function shopInitThunk(
    options: IListOptions & IProductOptions = {},
    filters: IFilterValues = {},
): ShopThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(shopInit(options, filters));

        await Promise.all([
            dispatch(shopFetchProductsListThunk()),
        ]);
    };
}
