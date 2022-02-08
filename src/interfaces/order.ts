import { IAddress } from './address';
import { ICoupon } from './coupon';

export interface IOrderItemOption {
    label: string;
    value: string;
}

export interface IOrderItem {
    id: number;
    slug: string;
    name: string;
    image: string;
    options?: IOrderItemOption[];
    price: number;
    quantity: number;
    total: number;
}

export interface IOrderAdditionalLine {
    label: string;
    total: number;
}

export interface IOrder {
    id: number;
    date: string;
    status: string;
    items: IOrderItem[];
    additionalLines: IOrderAdditionalLine[];
    quantity: number;
    subtotal: number;
    total: number;
    paymentMethod: string;
    shippingAddress: IAddress;
    billingAddress: IAddress;
}

export interface IOrderSummary {
    cancelledDate: string;
    couponInfo: ICoupon;
    deliveryDate: string;
    deliveryPrice: number;
    id: number;
    isCancelled: true;
    orderDate: string;
    statusId: number;
    totalPrice: number
}
