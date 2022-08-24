// application
import { IOrderProduct, IOrderSummary } from '../../interfaces/order';
import { CartState } from '../cart/cartTypes';

export const ORDER_NAMESPACE = 'order';

export interface OrderState extends CartState{
    init: boolean;
    orderIsLoading: boolean;
    orders: IOrderSummary[] | [];
    orderProducts: IOrderProduct[];
    orderProductsIsLoading: boolean;
    selectedOrder?: IOrderSummary;
    branchId:number,
    orderUpdateProductsIsLoading: boolean;
    isOrderProductsUpdated: boolean;
}
