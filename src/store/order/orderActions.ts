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
    ORDER_UPDATE_QUANTITIES,
    OrderUpdateQuantitiesAction,
    OrderRemoveItemAction,
    ORDER_REMOVE_ITEM,
    OrderProductsUpdateSuccessAction,
    ORDER_SUBMIT_UPDATE_SUCCESS,
    ORDER_UPDATE_PRODUCTS_START,
    OrderUpdateProductsStartAction,
} from './orderActionTypes';
import { SALE_NAMESPACE } from '../sale/saleReducer';
import { IOrderProduct, IOrderSummary } from '../../interfaces/order';
import { ACCOUNT_NAMESPACE } from '../account/accountReducer';
import { CartItemQuantity } from '../cart/cartActionTypes';
import { ORDER_NAMESPACE } from './orderTypes';
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
export function orderUpdateQuantitiesSuccess(quantities: CartItemQuantity[]): OrderUpdateQuantitiesAction {
    return {
        type: ORDER_UPDATE_QUANTITIES,
        quantities,
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
export function orderUpdateProductsStart(): OrderUpdateProductsStartAction {
    return {
        type: ORDER_UPDATE_PRODUCTS_START,
    };
}

export function orderProductsFetchSuccess(orderId: number,
    orderProducts: IOrderProduct[]): OrderProductsFetchSuccessAction {
    return {
        type: ORDER_PRODUCTS_FETCH_SUCCESS,
        payload: { orderId, orderProducts },
    };
}

export function orderProductsUpdateSuccess(orderId: number,
    orderProducts: IOrderProduct[]): OrderProductsUpdateSuccessAction {
    return {
        type: ORDER_SUBMIT_UPDATE_SUCCESS,
        payload: { orderId, orderProducts },
    };
}
export function cancelOrderSuccess(data: IOrderSummary): CancelOrderSuccessAction {
    return {
        type: CANCEL_ORDER_SUCCESS,
        data,
    };
}

export function orderRemoveItemSuccess(itemId: number): OrderRemoveItemAction {
    return {
        type: ORDER_REMOVE_ITEM,
        itemId,
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

export function orderRemoveItem(itemId: number): OrderThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(orderRemoveItemSuccess(itemId));
                resolve();
            }, 500);
        })
    );
}

export function orderUpdateQuantities(quantities: CartItemQuantity[]): OrderThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(orderUpdateQuantitiesSuccess(quantities));
                resolve();
            }, 500);
        })
    );
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

        dispatch(orderProductsFetchSuccess(orderId, orderProducts));
    };
}

export function orderProductUpdateThunk(): OrderThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        let canceled = false;

        cancelPreviousRequest();
        cancelPreviousRequest = () => { canceled = true; };

        dispatch(orderUpdateProductsStart());

        const accountState = getState()[ACCOUNT_NAMESPACE];
        const orderState = getState()[ORDER_NAMESPACE];
        const sale = getState()[SALE_NAMESPACE];
        const orderedProducts = orderState.items.map((item) => ({
            id: item.product.id,
            productId: item.product.id,
            isOffer: item.product.isOffer,
            offerPrice: item.product.offerPrice,
            offerQuantity: item.product.offerQuantity,
            offerType: item.product.offerType,
            price: item.product.price,
            orderId: orderState.selectedOrder?.id,
            quantity: item.quantity,
        }));
        const discount = orderState.totals.find((item) => item.type === 'discount')?.price;

        const newOrderProducts = await shopApi.updateOrderProducts({
            couponDiscount: discount || 0,
            orderId: orderState.selectedOrder?.id || 0,
            // @ts-ignore
            orderedProducts: [...orderedProducts],
            totalPrice: orderState.total,
            userId: accountState.id || 0,
            isWholeSale: sale.isWholeSale,

        });

        if (canceled) {
            return;
        }

        dispatch(orderProductsUpdateSuccess(orderState.selectedOrder?.id || 0, newOrderProducts));
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
            userId: id || 0,
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
