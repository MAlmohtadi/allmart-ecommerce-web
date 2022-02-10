// third-party
import { HYDRATE } from 'next-redux-wrapper';
// application
import { AppAction } from '../types';
import { ORDER_NAMESPACE, OrderState } from './orderTypes';
import { IOrderProduct, IOrderSummary } from '../../interfaces/order';
import { IProduct } from '../../interfaces/product-old';

export const ORDER_HYDRATE = HYDRATE;
export const ORDER_INIT = 'ORDER_INIT';
export const USER_ORDERS_FETCH_SUCCESS = 'USER_ORDERS_FETCH_SUCCESS';
export const USER_ORDERS_FETCH_START = 'USER_ORDERS_FETCH_START';
export const ORDER_PRODUCTS_FETCH_SUCCESS = 'ORDER_PRODUCTS_FETCH_SUCCESS';
export const ORDER_PRODUCT_FETCH_START = 'ORDER_PRODUCT_FETCH_START';
export const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS';
export interface OrderHydrateAction {
    type: typeof ORDER_HYDRATE;
    payload: {
        [ORDER_NAMESPACE]: OrderState;
    };
}

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

export interface OrderProductsFetchSuccessAction {
    type: typeof ORDER_PRODUCTS_FETCH_SUCCESS;
    data: IOrderProduct[];
}

export interface CancelOrderSuccessAction {
    type: typeof CANCEL_ORDER_SUCCESS;
    data: IOrderSummary;
}
export type OrderAction =
    OrderHydrateAction |
    OrderInitAction |
    UserOrderFetchStartAction |
    UserOrdersFetchSuccessAction|
    OrderProductFetchStartAction|
    CancelOrderSuccessAction|
    OrderProductsFetchSuccessAction;

export type OrderThunkAction<T = void> = AppAction<OrderAction, T>;
