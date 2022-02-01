// application
import { AppAction } from '../types';
import { IProduct } from '../../interfaces/product';

export const WISHLIST_INIT = 'WISHLIST_INIT';
export const WISHLIST_ADD_ITEM = 'WISHLIST_ADD_ITEM';
export const WISHLIST_FETCH_PRODUCTS_SUCCESS = 'WISHLIST_FETCH_PRODUCTS_SUCCESS';
export const WISHLIST_FETCH_PRODUCTS_START = 'WISHLIST_FETCH_PRODUCTS_START';
export const WISHLIST_REMOVE_ITEM = 'WISHLIST_REMOVE_ITEM';

export interface WishlistInitAction {
    type: typeof WISHLIST_INIT;
}
export interface WishlistFetchStartAction {
    type: typeof WISHLIST_FETCH_PRODUCTS_START;
}
export interface WishlistAddItemAction {
    type: typeof WISHLIST_ADD_ITEM;
    product: IProduct;
}

export interface WishlistRemoveItemAction {
    type: typeof WISHLIST_REMOVE_ITEM;
    productId: number;
}

export interface WishlistProductListAction {
    type: typeof WISHLIST_FETCH_PRODUCTS_SUCCESS;
    products: IProduct[];
}
export type WishlistAction =
    WishlistInitAction |
    WishlistAddItemAction |
    WishlistProductListAction|
    WishlistFetchStartAction|
    WishlistRemoveItemAction;

export type WishlistThunkAction<T = void> = AppAction<WishlistAction, T>;
