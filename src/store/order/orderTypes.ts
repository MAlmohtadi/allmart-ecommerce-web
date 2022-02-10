// application
import { IOrderProduct, IOrderSummary } from '../../interfaces/order';
import { IProduct } from '../../interfaces/product';

export const ORDER_NAMESPACE = 'order';

export interface OrderState {
    init: boolean;
    orderIsLoading: boolean;
    orders: IOrderSummary[] | [];
    productOrder: IOrderProduct[];
    productOrderIsLoading: boolean;
}
