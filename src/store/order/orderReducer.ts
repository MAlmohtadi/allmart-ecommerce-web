// application
import { toast } from 'react-toastify';
import { ORDER_NAMESPACE, OrderState } from './orderTypes';
import {
    ORDER_INIT,
    USER_ORDERS_FETCH_START,
    OrderAction,
    USER_ORDERS_FETCH_SUCCESS,
    ORDER_PRODUCT_FETCH_START,
    ORDER_PRODUCTS_FETCH_SUCCESS,
    CANCEL_ORDER_SUCCESS,
    ORDER_UPDATE_QUANTITIES,
    ORDER_REMOVE_ITEM,
    ORDER_UPDATE_PRODUCTS_START,
    ORDER_SUBMIT_UPDATE_SUCCESS,
} from './orderActionTypes';
import {
    CartItem, CartItemOption, CartState, CartTotal,
} from '../cart/cartTypes';
import { ICoupon } from '../../interfaces/coupon';
import { IProduct } from '../../interfaces/product';
import { IOrderProduct } from '../../interfaces/order';
import { withClientState } from '../client';
import { CartItemQuantity } from '../cart/cartActionTypes';

function calcSubtotal(items: CartItem[]): number {
    return items.reduce((subtotal, item) => subtotal + item.total, 0);
}

function calcQuantity(items: CartItem[]): number {
    return items.reduce((quantity, item) => quantity + item.quantity, 0);
}

function calcTotal(subtotal: number, totals: CartTotal[]): number {
    return totals.reduce((acc, extraLine) => (extraLine.type === 'discount' ? acc - extraLine.price : acc + extraLine.price), subtotal);
}
function calcSubtotalEligibleForDiscount(items: CartItem[]): number {
    return items.filter((item) => item.eligibleForDiscount)
        .reduce((subtotal, item) => subtotal + item.total, 0);
}
const getDiscountAmount = (coupon: ICoupon, total: number): number => {
    if (!coupon) {
        return 0;
    }

    if (coupon?.minOrderPrice && total >= coupon?.minOrderPrice) {
        const { isPercentage = false, percentage = 0, discountAmount = 0 } = coupon;
        return isPercentage
            ? total * (percentage / 100)
            : discountAmount;
    }
    toast.warn(`الحد الادنى للطلب حتى يتم تطبيق الخصم JOD ${coupon?.minOrderPrice}`, { theme: 'colored' });

    return 0;
};

function calcTotals(items: CartItem[], shippingPrice: number, coupon?: ICoupon): CartTotal[] {
    if (items.length === 0) {
        return [];
    }

    const subtotal = calcSubtotalEligibleForDiscount(items);
    const result: CartTotal[] = [
        {
            type: 'shipping',
            title: 'التوصيل',
            price: shippingPrice,
        },
        {
            type: 'discount',
            title: 'كوبون الخصم',
            price: getDiscountAmount(coupon, subtotal),
        },
    ];

    return result;
}

function calculateOffersByQuantities(product: IOrderProduct, quantity: number): number {
    let total = 0;
    let offerQuantity = 0;
    let quantityTotal = quantity;
    offerQuantity = product.offerQuantity;
    if (offerQuantity === 0) {
        offerQuantity = 1;
    }
    while (quantityTotal > 0 && quantityTotal >= offerQuantity) {
        total += product.offerPrice;
        quantityTotal -= offerQuantity;
    }
    if (quantityTotal > 0) {
        total += product.price * quantity;
    }
    return total;
}

function handleFetchProducts(state: OrderState, action: OrderAction): OrderState {
    if (action.type === ORDER_PRODUCTS_FETCH_SUCCESS || action.type === ORDER_SUBMIT_UPDATE_SUCCESS) {
        const selectedOrder = state.orders.find((order) => order.id == action.payload.orderId);
        const items = action.payload.orderProducts.map((product) => {
            const total = product.isOffer
                ? calculateOffersByQuantities(product, product.quantity) : product.price * product.quantity;
            return {
                id: product.id,
                product: JSON.parse(JSON.stringify(product)),
                price: product.price,
                total,
                quantity: product.quantity,
                eligibleForDiscount: !product.isOffer,
            };
        });
        const subtotal = calcSubtotal(items);
        const totals = calcTotals(items, selectedOrder?.deliveryPrice, selectedOrder?.couponInfo);
        const total = calcTotal(subtotal, totals);
        const isOrderProductsUpdated = action.type === ORDER_PRODUCTS_FETCH_SUCCESS;
        const orderUpdateProductsIsLoading = !isOrderProductsUpdated;
        return {
            ...state,
            orderProductsIsLoading: false,
            orderProducts: [...action.payload.orderProducts],
            coupon: selectedOrder?.couponInfo,
            items,
            subtotal,
            totals,
            total,
            selectedOrder,
            isOrderProductsUpdated,
            orderUpdateProductsIsLoading,
        };
    }
    return { ...state };
}

function handleCancelOrder(state: OrderState, action: OrderAction): OrderState {
    if (action.type === CANCEL_ORDER_SUCCESS) {
        const newOrders = state.orders.filter((order) => order.id !== action.data.id);
        newOrders.push({ ...action.data });
        return {
            ...state,
            orderIsLoading: false,
            orders: [...newOrders],
        };
    }

    return { ...state };
}

function removeItem(state: OrderState, itemId: number) {
    const { items } = state;
    const newItems = items.filter((item) => item.id !== itemId);

    const subtotal = calcSubtotal(newItems);
    const totals = calcTotals(newItems, state.shippingPrice, state.coupon);
    const total = calcTotal(subtotal, totals);

    return {
        ...state,
        items: newItems,
        quantity: calcQuantity(newItems),
        subtotal,
        totals,
        total,
    };
}

function updateQuantities(state: OrderState, quantities: CartItemQuantity[]) {
    let needUpdate = false;

    const newItems = state.items.map((item) => {
        const quantity = quantities.find((x) => x.itemId === item.id && x.value !== item.quantity);

        if (!quantity) {
            return item;
        }

        needUpdate = true;
        const total = item.product.isOffer
            ? calculateOffersByQuantities(item.product, quantity.value)
            : quantity.value * item.price;
        return {
            ...item,
            quantity: quantity.value,
            total,
        };
    });

    if (needUpdate) {
        const subtotal = calcSubtotal(newItems);
        const totals = calcTotals(newItems, state.shippingPrice, state.coupon);
        const total = calcTotal(subtotal, totals);

        return {
            ...state,
            items: newItems,
            quantity: calcQuantity(newItems),
            subtotal,
            totals,
            total,
        };
    }

    return state;
}
const initialState: OrderState = {
    init: false,
    orderIsLoading: false,
    orders: [],
    orderProducts: [],
    orderProductsIsLoading: false,
    orderUpdateProductsIsLoading: false,
    isOrderProductsUpdated: false,
    lastItemId: 0,
    items: [],
    quantity: 0,
    subtotal: 0,
    totals: [],
    total: 0,
    shippingPrice: 0,
};

function orderBaseReducer(state = initialState, action: OrderAction): OrderState {
    switch (action.type) {
    case ORDER_INIT:
        return {
            ...state,
            init: true,
        };
    case USER_ORDERS_FETCH_START:
        return { ...state, orderIsLoading: true };
    case ORDER_UPDATE_PRODUCTS_START:
        return { ...state, orderUpdateProductsIsLoading: true };
    case ORDER_SUBMIT_UPDATE_SUCCESS:
        return handleFetchProducts(state, action);
    case USER_ORDERS_FETCH_SUCCESS:
        return {
            ...state,
            orderIsLoading: false,
            orders: [...action.data],
        };
    case ORDER_REMOVE_ITEM:
        return removeItem(state, action.itemId);

    case ORDER_UPDATE_QUANTITIES:
        return updateQuantities(state, action.quantities);
    case ORDER_PRODUCT_FETCH_START:
        return { ...state, orderProductsIsLoading: true };
    case ORDER_PRODUCTS_FETCH_SUCCESS:
        return handleFetchProducts(state, action);
    case CANCEL_ORDER_SUCCESS:
        return handleCancelOrder(state, action);
    default:
        return state;
    }
}
const orderReducer = withClientState(orderBaseReducer, ORDER_NAMESPACE);

export default orderReducer;
