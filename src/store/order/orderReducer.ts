// application
import { ORDER_NAMESPACE, OrderState } from './orderTypes';
import {
    ORDER_INIT,
    USER_ORDERS_FETCH_START,
    OrderAction,
    ORDER_HYDRATE,
    USER_ORDERS_FETCH_SUCCESS,
    ORDER_PRODUCT_FETCH_START,
    ORDER_PRODUCTS_FETCH_SUCCESS,
    CANCEL_ORDER_SUCCESS,
} from './orderActionTypes';
import { orderStatus } from '../../components/account/AccountPageOrders';

const initialState: OrderState = {
    init: false,
    orderIsLoading: false,
    orders: [],
    productOrder: [],
    productOrderIsLoading: false,
};

function orderReducer(state = initialState, action: OrderAction): OrderState {
    switch (action.type) {
    // case ORDER_HYDRATE:
    //     return action.payload[ORDER_NAMESPACE];
    case ORDER_INIT:
        return {
            ...state,
            init: true,
        };
    case USER_ORDERS_FETCH_START:
        return { ...state, orderIsLoading: true };
    case USER_ORDERS_FETCH_SUCCESS:
        return {
            ...state,
            orderIsLoading: false,
            orders: [...action.data],
        };
    case ORDER_PRODUCT_FETCH_START:
        return { ...state, productOrderIsLoading: true };
    case ORDER_PRODUCTS_FETCH_SUCCESS:
        return {
            ...state,
            productOrderIsLoading: false,
            productOrder: [...action.data],
        };
    case CANCEL_ORDER_SUCCESS:
        const newOrders = state.orders.filter((order) => order.id !== action.data.id);
        newOrders.push(action.data);
        return {
            ...state,
            orderIsLoading: false,
            orders: [...newOrders],
        };
    default:
        return state;
    }
}

export default orderReducer;
