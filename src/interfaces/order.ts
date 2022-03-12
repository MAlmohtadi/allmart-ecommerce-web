import { ICoupon } from './coupon';

export interface IOrderProduct {
    isCancelled: boolean,
    orderId?: number,
    productId?: number,
    quantity: number,
    id: number;
    imageUrl: string;
    isFavorite: boolean;
    isOffer: boolean;
    isStockAvailable: boolean;
    maxQuantity: number;
    name: string;
    offerPrice: number;
    offerQuantity: number;
    offerType: number;
    price: number;
    quantityMultiplier: number;
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
