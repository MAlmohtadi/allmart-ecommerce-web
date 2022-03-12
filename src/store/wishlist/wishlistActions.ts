// third-party
import { toast } from 'react-toastify';
import shopApi from '../../api/shop';
// application
import { IProduct } from '../../interfaces/product';
import { ACCOUNT_NAMESPACE } from '../account/accountReducer';
import { SALE_NAMESPACE } from '../sale/saleReducer';

import {
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
    WishlistAddItemAction,
    WishlistRemoveItemAction,
    WishlistThunkAction,
    WISHLIST_INIT,
    WishlistAction,
    WISHLIST_FETCH_PRODUCTS_SUCCESS,
    WISHLIST_FETCH_PRODUCTS_START,
} from './wishlistActionTypes';

let cancelPreviousProductsListRequest = () => { };
export function wishlistAddItemSuccess(product: IProduct): WishlistAddItemAction {
    toast.success(`تم اضافة "${product.name}" للمفضلة!`, { theme: 'colored' });
    return {
        type: WISHLIST_ADD_ITEM,
        product,
    };
}

export function wishlistRemoveItemSuccess(productId: number): WishlistRemoveItemAction {
    toast.success('تم الازالة من المفضلة !', { theme: 'colored' });
    return {
        type: WISHLIST_REMOVE_ITEM,
        productId,
    };
}

export function wishlistAddItem(product: IProduct): WishlistThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return async (dispatch, getState) => {
        const saleState = getState()[SALE_NAMESPACE];
        const account = getState()[ACCOUNT_NAMESPACE];
        const response = await shopApi.addToWishlist({
            isWholeSale: saleState.isWholeSale,
            userId: account.id,
            productId: product.id,
        });
        if (response) {
            dispatch(wishlistAddItemSuccess(product));
        }
    };
}

export function wishlistRemoveItem(productId: number): WishlistThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return async (dispatch, getState) => {
        const saleState = getState()[SALE_NAMESPACE];
        const account = getState()[ACCOUNT_NAMESPACE];
        const response = await shopApi.removeFromWishlist({
            isWholeSale: saleState.isWholeSale,
            userId: account.id,
            productId,
        });
        if (response) {
            dispatch(wishlistRemoveItemSuccess(productId));
        }
    };
}

export function wishlistInit(): WishlistAction {
    return {
        type: WISHLIST_INIT,
    };
}
export function wishlistFetchSuccess(products: IProduct[]): WishlistAction {
    return {
        type: WISHLIST_FETCH_PRODUCTS_SUCCESS,
        products,
    };
}
export function wishlistFetchStart(): WishlistAction {
    return {
        type: WISHLIST_FETCH_PRODUCTS_START,
    };
}

export function wishlistFetchProductsThunk(): WishlistThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return async (dispatch, getState) => {
        let canceled = false;

        cancelPreviousProductsListRequest();
        cancelPreviousProductsListRequest = () => { canceled = true; };

        dispatch(wishlistFetchStart());
        const saleState = getState()[SALE_NAMESPACE];
        const account = getState()[ACCOUNT_NAMESPACE];
        const response = await shopApi.getWishListProducts({
            isWholeSale: saleState.isWholeSale,
            userId: account.id,
        });
        if (canceled) {
            return;
        }
        dispatch(wishlistFetchSuccess(response));
    };
}
export function wishlistInitThunk(): WishlistThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(wishlistInit());

        await Promise.all([
            dispatch(wishlistFetchProductsThunk()),
        ]);
    };
}
