// third-party
import { toast } from 'react-toastify';
// application
import { IProduct } from '../../interfaces/product';
import {
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
    WishlistAddItemAction,
    WishlistRemoveItemAction,
    WishlistThunkAction,
} from './wishlistActionTypes';

export function wishlistAddItemSuccess(product: IProduct): WishlistAddItemAction {
    toast.success(`Product "${product.name}" added to wish list!`, { theme: 'colored' });

    return {
        type: WISHLIST_ADD_ITEM,
        product,
    };
}

export function wishlistRemoveItemSuccess(productId: number): WishlistRemoveItemAction {
    return {
        type: WISHLIST_REMOVE_ITEM,
        productId,
    };
}

export function wishlistAddItem(product: IProduct): WishlistThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(wishlistAddItemSuccess(product));
                resolve();
            }, 500);
        })
    );
}

export function wishlistRemoveItem(productId: number): WishlistThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(wishlistRemoveItemSuccess(productId));
                resolve();
            }, 500);
        })
    );
}
