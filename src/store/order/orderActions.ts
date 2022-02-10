import shopApi from '../../api/shop';
import {
    USER_ORDERS_FETCH_START,
    USER_ORDERS_FETCH_SUCCESS,
    UserOrdersFetchSuccessAction,
    UserOrderFetchStartAction,
    OrderInitAction,
    ORDER_INIT,
    OrderThunkAction,
    OrderProductFetchStartAction,
    ORDER_PRODUCT_FETCH_START,
    OrderProductsFetchSuccessAction,
    ORDER_PRODUCTS_FETCH_SUCCESS,
    CancelOrderSuccessAction,
    CANCEL_ORDER_SUCCESS,
} from './orderActionTypes';
import { SALE_NAMESPACE } from '../sale/saleReducer';
import { IOrderProduct, IOrderSummary } from '../../interfaces/order';
import { ACCOUNT_NAMESPACE } from '../account/accountReducer';
// import { IHomePageResponse } from '../../interfaces/homepage';

let cancelPreviousRequest = () => { };

export function orderInit(): OrderInitAction {
    return {
        type: ORDER_INIT,
    };
}

export function userOrderFetchStart(): UserOrderFetchStartAction {
    return {
        type: USER_ORDERS_FETCH_START,
    };
}

export function userOrderFetchSuccess(data: IOrderSummary[]): UserOrdersFetchSuccessAction {
    return {
        type: USER_ORDERS_FETCH_SUCCESS,
        data,
    };
}

export function orderProductsFetchStart(): OrderProductFetchStartAction {
    return {
        type: ORDER_PRODUCT_FETCH_START,
    };
}

export function orderProductsFetchSuccess(data: IOrderProduct[]): OrderProductsFetchSuccessAction {
    return {
        type: ORDER_PRODUCTS_FETCH_SUCCESS,
        data,
    };
}

export function cancelOrderSuccess(data: IOrderSummary): CancelOrderSuccessAction {
    return {
        type: CANCEL_ORDER_SUCCESS,
        data,
    };
}

export function userOrdersFetchThunk(isCurrentOrders: boolean,
    isOlderOrders: boolean): OrderThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        let canceled = false;

        cancelPreviousRequest();
        cancelPreviousRequest = () => { canceled = true; };

        dispatch(userOrderFetchStart());

        const saleState = getState()[SALE_NAMESPACE];
        const accountState = getState()[ACCOUNT_NAMESPACE];
        const { isWholeSale } = saleState;
        const { id } = accountState;
        const userOrders = await shopApi.getUserOrders({
            isCurrentOrders,
            isOlderOrders,
            isWholeSale,
            userId: id || 0,
        });

        if (canceled) {
            return;
        }

        dispatch(userOrderFetchSuccess(userOrders));
    };
}

export function orderProductsFetchThunk(orderId: number): OrderThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        let canceled = false;

        cancelPreviousRequest();
        cancelPreviousRequest = () => { canceled = true; };

        dispatch(orderProductsFetchStart());

        const accountState = getState()[ACCOUNT_NAMESPACE];
        const { id } = accountState;
        const orderProducts = await shopApi.getOrderProducts({
            orderId,
            userId: id || 0,
        });

        if (canceled) {
            return;
        }

        dispatch(orderProductsFetchSuccess(orderProducts));
    };
}

export function cancelOrderThunk(orderId: number): OrderThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        let canceled = false;

        cancelPreviousRequest();
        cancelPreviousRequest = () => { canceled = true; };

        dispatch(orderProductsFetchStart());

        const accountState = getState()[ACCOUNT_NAMESPACE];
        const sale = getState()[SALE_NAMESPACE];
        const { id } = accountState;
        const order = await shopApi.cancelOrder({
            isWholeSale: sale.isWholeSale,
            orderId,
            userId: id,
        });

        if (canceled) {
            return;
        }

        dispatch(cancelOrderSuccess(order));
    };
}
export function orderInitThunk(isCurrentOrders: boolean,
    isOlderOrders: boolean): OrderThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(orderInit());
        await Promise.all([
            dispatch(userOrdersFetchThunk(isCurrentOrders,
                isOlderOrders)),
        ]);
    };
}
