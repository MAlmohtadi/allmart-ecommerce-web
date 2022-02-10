// react
// application
import { useAppAction, useAppSelector } from '../hooks';
import { userOrdersFetchThunk, orderInitThunk, orderProductsFetchThunk, cancelOrderThunk } from './orderActions';
import { OrderState, ORDER_NAMESPACE } from './orderTypes';

export function useOrderSelector<T extends(state: OrderState) => any>(selector: T): ReturnType<T> {
    return useAppSelector((state) => selector(state[ORDER_NAMESPACE]));
}
export const useOrder = () => useOrderSelector((state) => state);

export const useOrderIsLoading = () => useOrderSelector((state) => state.orderIsLoading);

export const useOrderInit = () => useAppAction(orderInitThunk);
export const useOrderFetchData = () => useAppAction(userOrdersFetchThunk);
export const useOrderProductsFetchData = () => useAppAction(orderProductsFetchThunk);
export const useCancelOrder = () => useAppAction(cancelOrderThunk);
