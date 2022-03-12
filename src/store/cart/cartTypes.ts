import { ICoupon } from '../../interfaces/coupon';
import { IProduct } from '../../interfaces/product';

export interface CartItemOption {
    optionId: number;
    optionTitle: string;
    valueId: number;
    valueTitle: string;
}

export interface CartItem {
    id: number
    product: IProduct;
    options: CartItemOption[];
    price: number;
    quantity: number;
    total: number;
    eligibleForDiscount: boolean;
}

export type CartTotalType = 'shipping' | 'tax' | 'discount';

export interface CartTotal {
    type: CartTotalType;
    title: string;
    price: number;
}

export interface Cart {
    items: CartItem[];
    quantity: number;
    subtotal: number;
    totals: CartTotal[];
    total: number;
    shippingPrice: number;
    coupon?: ICoupon
}

export interface CartState extends Cart {
    lastItemId: number;
}
