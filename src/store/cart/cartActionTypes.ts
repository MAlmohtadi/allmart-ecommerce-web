import { IProduct } from '../../interfaces/product';
import { CartItemOption } from './cartTypes';
import { AppAction } from '../types';
import { ICoupon } from '../../interfaces/coupon';

export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const CART_UPDATE_QUANTITIES = 'CART_UPDATE_QUANTITIES';
export const CART_UPDATE_SHIPPING_PRICE = 'CART_UPDATE_SHIPPING_PRICE';
export const CART_ADD_COUPON_SUCCESS = 'CART_ADD_COUPON_SUCCESS';
export const CART_CLEAR = 'CART_CLEAR';

export interface CartItemQuantity {
    itemId: number;
    value: number;
}

export interface CartClearAction {
    type: typeof CART_CLEAR;
}

export interface CartAddCouponAction {
    type: typeof CART_ADD_COUPON_SUCCESS;
    coupon: ICoupon;
}

export interface CartAddItemAction {
    type: typeof CART_ADD_ITEM;
    product: IProduct;
    options: CartItemOption[];
    quantity: number;
}

export interface CartRemoveItemAction {
    type: typeof CART_REMOVE_ITEM;
    itemId: number;
}

export interface CartUpdateQuantitiesAction {
    type: typeof CART_UPDATE_QUANTITIES;
    quantities: CartItemQuantity[];
}
export interface CartUpdateShippingPriceAction {
    type: typeof CART_UPDATE_SHIPPING_PRICE;
    price: number;
}
export type CartAction =
    CartAddItemAction |
    CartRemoveItemAction |
    CartUpdateShippingPriceAction |
    CartUpdateQuantitiesAction |
    CartClearAction|
    CartAddCouponAction;

export type CartThunkAction<T = void> = AppAction<CartAction, T>;
