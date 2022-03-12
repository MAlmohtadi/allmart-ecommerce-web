// application
import { IProduct } from '../../interfaces/product';
import {
    WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM, WishlistAction, WISHLIST_FETCH_PRODUCTS_SUCCESS, WISHLIST_INIT,
} from './wishlistActionTypes';
import { WishlistState } from './wishlistTypes';
import { withClientState } from '../client';

function addItem(state: WishlistState, product: IProduct): WishlistState {
    const itemIndex = state.items.findIndex((x) => x.id === product.id);

    if (itemIndex === -1) {
        return {
            items: [
                ...state.items,
                JSON.parse(JSON.stringify(product)),
            ],
        };
    }

    return state;
}

function removeItem(state: WishlistState, productId: number): WishlistState {
    return {
        ...state,
        items: state.items.filter((x) => x.id !== productId),
    };
}

const initialState: WishlistState = {
    items: [],
    init: false,
    productsListIsLoading: false,
};

export const WISHLIST_NAMESPACE = 'wishlist';

function wishlistBaseReducer(state = initialState, action: WishlistAction) {
    switch (action.type) {
    case WISHLIST_INIT:
        return { ...initialState, init: true };
    case WISHLIST_FETCH_PRODUCTS_SUCCESS:
        return { ...state, items: [...action.products] };
    case WISHLIST_ADD_ITEM:
        return addItem(state, action.product);
    case WISHLIST_REMOVE_ITEM:
        return removeItem(state, action.productId);
    default:
        return state;
    }
}

const wishlistReducer = withClientState(wishlistBaseReducer, WISHLIST_NAMESPACE);

export default wishlistReducer;
