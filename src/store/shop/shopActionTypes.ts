// third-party
import { HYDRATE } from 'next-redux-wrapper';
// application
import { AppAction } from '../types';
import { IFilterValues, IListOptions } from '../../interfaces/list';
import { SHOP_NAMESPACE, ShopState } from './shopTypes';
import { IProductResponse, IProductsList } from '../../interfaces/product';

export const SHOP_HYDRATE = HYDRATE;
export const SHOP_INIT = 'SHOP_INIT';
export const SHOP_FETCH_CATEGORY_SUCCESS = 'SHOP_FETCH_CATEGORY_SUCCESS';
export const SHOP_FETCH_PRODUCTS_LIST_START = 'SHOP_FETCH_PRODUCTS_LIST_START';
export const SHOP_FETCH_PRODUCTS_LIST_SUCCESS = 'SHOP_FETCH_PRODUCTS_LIST_SUCCESS';
export const SHOP_SET_OPTION_VALUE = 'SHOP_SET_OPTION_VALUE';
export const SHOP_SET_FILTER_VALUE = 'SHOP_SET_FILTER_VALUE';
export const SHOP_RESET_FILTERS = 'SHOP_RESET_FILTERS';
export const SHOP_FETCH_PRODUCTS_START = 'SHOP_FETCH_PRODUCTS_START';
export const SHOP_FETCH_PRODUCTS_SUCCESS = 'SHOP_FETCH_PRODUCTS_SUCCESS';
export interface ShopHydrateAction {
    type: typeof SHOP_HYDRATE;
    payload: {
        [SHOP_NAMESPACE]: ShopState;
    };
}

export interface ShopInitAction {
    type: typeof SHOP_INIT;
    options: IListOptions;
    filters: IFilterValues;
}

export interface ShopFetchProductsListStartAction {
    type: typeof SHOP_FETCH_PRODUCTS_LIST_START;
}

export interface ShopFetchProductsListSuccessAction {
    type: typeof SHOP_FETCH_PRODUCTS_LIST_SUCCESS;
    productsList: IProductResponse;
}
export interface ShopSetOptionValueAction {
    type: typeof SHOP_SET_OPTION_VALUE;
    option: string;
    value: string;
}

export interface ShopSetFilterValueAction {
    type: typeof SHOP_SET_FILTER_VALUE;
    filter: string;
    value: string | null;
}

export interface ShopResetFiltersAction {
    type: typeof SHOP_RESET_FILTERS;
}

export type ShopAction =
    ShopHydrateAction |
    ShopInitAction |
    ShopFetchProductsListStartAction |
    ShopFetchProductsListSuccessAction |
    ShopSetOptionValueAction |
    ShopSetFilterValueAction |
    ShopResetFiltersAction;

export type ShopThunkAction<T = void> = AppAction<ShopAction, T>;
