// third-party
import { HYDRATE } from 'next-redux-wrapper';
// application
import { AppAction } from '../types';
import { IOrderProduct, IOrderSummary } from '../../interfaces/order';
import { CartItemQuantity } from '../cart/cartActionTypes';

export const ORDER_HYDRATE = HYDRATE;
export const ORDER_INIT = 'ORDER_INIT';
export const USER_ORDERS_FETCH_SUCCESS = 'USER_ORDERS_FETCH_SUCCESS';
export const USER_ORDERS_FETCH_START = 'USER_ORDERS_FETCH_START';
export const ORDER_PRODUCTS_FETCH_SUCCESS = 'ORDER_PRODUCTS_FETCH_SUCCESS';
export const ORDER_PRODUCT_FETCH_START = 'ORDER_PRODUCT_FETCH_START';
export const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS';
export const ORDER_UPDATE_QUANTITIES = 'ORDER_UPDATE_QUANTITIES';
export const ORDER_REMOVE_ITEM = 'ORDER_REMOVE_ITEM';
export const ORDER_SUBMIT_UPDATE_SUCCESS = 'ORDER_SUBMIT_UPDATE_SUCCESS';
export const ORDER_UPDATE_PRODUCTS_START = 'ORDER_UPDATE_PRODUCTS_START';

export interface OrderInitAction {
    type: typeof ORDER_INIT;
}

export interface UserOrderFetchStartAction {
    type: typeof USER_ORDERS_FETCH_START;
}

export interface UserOrdersFetchSuccessAction {
    type: typeof USER_ORDERS_FETCH_SUCCESS;
    data: IOrderSummary[];
}
export interface OrderProductFetchStartAction {
    type: typeof ORDER_PRODUCT_FETCH_START;
}
export interface OrderUpdateProductsStartAction {
    type: typeof ORDER_UPDATE_PRODUCTS_START;
}

export interface OrderProductsFetchSuccessAction {
    type: typeof ORDER_PRODUCTS_FETCH_SUCCESS;
    payload: {
        orderId: number;
        orderProducts: IOrderProduct[];
    }
}
export interface OrderProductsUpdateSuccessAction {
    type: typeof ORDER_SUBMIT_UPDATE_SUCCESS;
    payload: {
        orderId: number;
        orderProducts: IOrderProduct[];
    }
}

export interface CancelOrderSuccessAction {
    type: typeof CANCEL_ORDER_SUCCESS;
    data: IOrderSummary;
}
export interface OrderUpdateQuantitiesAction {
    type: typeof ORDER_UPDATE_QUANTITIES;
    quantities: CartItemQuantity[];
}
export interface OrderRemoveItemAction {
    type: typeof ORDER_REMOVE_ITEM;
    itemId: number;
}
export type OrderAction =
    OrderInitAction |
    UserOrderFetchStartAction |
    UserOrdersFetchSuccessAction|
    OrderProductFetchStartAction|
    CancelOrderSuccessAction|
    OrderUpdateQuantitiesAction|
    OrderRemoveItemAction|
    OrderProductsUpdateSuccessAction|
    OrderUpdateProductsStartAction|
    OrderProductsFetchSuccessAction;

export type OrderThunkAction<T = void> = AppAction<OrderAction, T>;
