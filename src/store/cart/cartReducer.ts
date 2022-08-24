import { toast } from 'react-toastify';
import { IProduct } from '../../interfaces/product';
import {
    CartItem,
    CartItemOption,
    CartState,
    CartTotal,
} from './cartTypes';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_QUANTITIES,
    CartAction,
    CartItemQuantity,
    CART_UPDATE_SHIPPING_PRICE,
    CART_ADD_COUPON_SUCCESS,
    CART_CLEAR,
} from './cartActionTypes';
import { withClientState } from '../client';
import { ICoupon } from '../../interfaces/coupon';

function findItemIndex(items: CartItem[], product: IProduct, options: CartItemOption[]): number {
    return items.findIndex((item) => {
        if (item.product.id !== product.id || item.options.length !== options.length) {
            return false;
        }

        for (let i = 0; i < options.length; i += 1) {
            const option = options[i];
            const itemOption = item.options.find((itemOption) => (
                itemOption.optionId === option.optionId && itemOption.valueId === option.valueId
            ));

            if (!itemOption) {
                return false;
            }
        }

        return true;
    });
}

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
    toast.warn(`الحد الادنى للطلب بدون عروض حتى يتم تطبيق الخصم JOD ${coupon?.minOrderPrice}`, { theme: 'colored' });

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
            price: shippingPrice || 0 ,
        },
        {
            type: 'discount',
            title: 'كوبون الخصم',
            // @ts-ignore
            price: getDiscountAmount(coupon, subtotal),
        },
    ];

    return result;
}

function calculateOffersByQuantities(product: IProduct, quantity: number): number {
    let total = 0;
    let offerQuantity = 0;
    let quantityTotal = quantity;
    offerQuantity = product.offerQuantity || 1;
    if (offerQuantity === 0) {
        offerQuantity = 1;
    }
    while (quantityTotal > 0 && quantityTotal >= offerQuantity) {
        total += product.offerPrice;
        quantityTotal -= offerQuantity;
    }
    if (quantityTotal > 0) {
        total += product.price * quantityTotal;
    }
    return total;
}
function addItem(state: CartState, product: IProduct, options: CartItemOption[], quantity: number) {
    const itemIndex = findItemIndex(state.items, product, options);

    let newItems;
    let { lastItemId } = state;
    let total = 0;
    if (itemIndex === -1) {
        lastItemId += 1;
        total = product.isOffer ? calculateOffersByQuantities(product, quantity) : product.price;
        newItems = [...state.items, {
            id: lastItemId,
            product: JSON.parse(JSON.stringify(product)),
            options: JSON.parse(JSON.stringify(options)),
            price: product.price,
            total,
            quantity,
            eligibleForDiscount: !product.isOffer,
        }];
    } else {
        const item = state.items[itemIndex];
        total = product.isOffer
            ? calculateOffersByQuantities(product, item.quantity + quantity)
            : (item.quantity + quantity) * item.price;
        newItems = [
            ...state.items.slice(0, itemIndex),
            {
                ...item,
                quantity: item.quantity + quantity,
                total,
            },
            ...state.items.slice(itemIndex + 1),
        ];
    }

    const subtotal = calcSubtotal(newItems);
    const totals = calcTotals(newItems, state.shippingPrice, state.coupon);
    total = calcTotal(subtotal, totals);

    return {
        ...state,
        lastItemId,
        subtotal,
        totals,
        total,
        items: newItems,
        quantity: calcQuantity(newItems),
    };
}

function removeItem(state: CartState, itemId: number) {
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

function updateQuantities(state: CartState, quantities: CartItemQuantity[]) {
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

function applyCoupon(state: CartState, coupon: ICoupon) {
    const subtotal = calcSubtotal(state.items);
    const totals = calcTotals(state.items, state.shippingPrice, coupon);
    const total = calcTotal(subtotal, totals);
    return {
        ...state,
        subtotal,
        totals,
        total,
        coupon,
    };
}
const initialState: CartState = {
    lastItemId: 0,
    quantity: 0,
    items: [],
    subtotal: 0,
    totals: [],
    total: 0,
    shippingPrice: 0,
};

export const CART_NAMESPACE = 'cart';

function cartBaseReducer(state = initialState, action: CartAction): CartState {
    switch (action.type) {
    case CART_ADD_ITEM:
        return addItem(state, action.product, action.options, action.quantity);

    case CART_REMOVE_ITEM:
        return removeItem(state, action.itemId);

    case CART_UPDATE_QUANTITIES:
        return updateQuantities(state, action.quantities);
    case CART_UPDATE_SHIPPING_PRICE:
        return { ...state, shippingPrice: action.price };
    case CART_ADD_COUPON_SUCCESS:
        return applyCoupon(state, action.coupon);
    case CART_CLEAR:
        return initialState;
    default:
        return state;
    }
}

const cartReducer = withClientState(cartBaseReducer, CART_NAMESPACE);

export default cartReducer;
