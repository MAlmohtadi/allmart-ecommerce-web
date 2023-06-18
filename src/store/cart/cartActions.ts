// third-party
import { toast } from 'react-toastify';

// application
import { IProduct } from '../../interfaces/product';
import { CartItemOption } from './cartTypes';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_QUANTITIES,
    CartAddItemAction,
    CartItemQuantity,
    CartRemoveItemAction,
    CartThunkAction,
    CartUpdateQuantitiesAction,
    CartUpdateShippingPriceAction,
    CART_UPDATE_SHIPPING_PRICE,
    CART_ADD_COUPON_SUCCESS,
    CartAddCouponAction,
    CartClearAction,
    CART_CLEAR,
} from './cartActionTypes';
import { ICoupon } from '../../interfaces/coupon';
import shopApi from '../../api/shop';
import { ACCOUNT_NAMESPACE } from '../account/accountReducer';

let cancelPreviousRequest = () => { };
export function cartAddItemSuccess(
    product: IProduct,
    options: CartItemOption[] = [],
    quantity = 1,
): CartAddItemAction {
    toast.success(`تم اضافة "${product.name}" للسلة`, { theme: 'colored' });

    return {
        type: CART_ADD_ITEM,
        product,
        options,
        quantity,
    };
}

export function cartRemoveItemSuccess(itemId: number): CartRemoveItemAction {
    return {
        type: CART_REMOVE_ITEM,
        itemId,
    };
}

export function cartUpdateQuantitiesSuccess(quantities: CartItemQuantity[]): CartUpdateQuantitiesAction {
    return {
        type: CART_UPDATE_QUANTITIES,
        quantities,
    };
}

export function cartUpdateShippingPriceSuccess(price: number): CartUpdateShippingPriceAction {
    return {
        type: CART_UPDATE_SHIPPING_PRICE,
        price,
    };
}
export function cartAddCouponSuccess(coupon: ICoupon): CartAddCouponAction {
    return {
        type: CART_ADD_COUPON_SUCCESS,
        coupon,
    };
}
export function cartClearSuccess(): CartClearAction {
    return {
        type: CART_CLEAR,
    };
}
export function cartAddItem(
    product: IProduct,
    options: CartItemOption[] = [], 
    quantity =1,
): CartThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartAddItemSuccess(product, options,  product.countStepValue));
                resolve();
            }, 500);
        })
    );
}

export function cartRemoveItem(itemId: number): CartThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartRemoveItemSuccess(itemId));
                resolve();
            }, 500);
        })
    );
}

export function cartUpdateQuantities(quantities: CartItemQuantity[]): CartThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartUpdateQuantitiesSuccess(quantities));
                resolve();
            }, 500);
        })
    );
}
export function cartUpdateShippingPrice(price: number): CartThunkAction<Promise<void>> {
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartUpdateShippingPriceSuccess(price));
                resolve();
            }, 500);
        })
    );
}

export function cartClear(): CartThunkAction<Promise<void>> {
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartClearSuccess());
                resolve();
            }, 500);
        })
    );
}
export function cartApplyCoupon(code: string): CartThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        let canceled = false;

        cancelPreviousRequest();
        cancelPreviousRequest = () => { canceled = true; };

        // dispatch(wishlistFetchStart());
        const account = getState()[ACCOUNT_NAMESPACE];
        const data = await shopApi.applyCoupon({
            code,
            userId: account.id,
        });

        if (canceled) {
            return;
        }

        if (data.isBussinessError) {
            toast.error(`${data.message}`, { theme: 'colored' });
        } else {
            dispatch(cartAddCouponSuccess(data));
        }
    };
}
