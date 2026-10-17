// third-party
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
// application
import rootReducer from './root/rootReducer';
import version from './version';
import { RootState } from './root/rootTypes';

export const save = (state: any) => {
    try {
        // Save main state WITHOUT cart (cart is saved separately per franchise)
        const stateWithoutCart = { ...state };
        if (stateWithoutCart.cart) {
            delete stateWithoutCart.cart;
        }
        localStorage.setItem('state', JSON.stringify(stateWithoutCart));
        
        // Save franchise-specific cart if franchise context exists
        if (state && state.cart && typeof window !== 'undefined') {
            const Cookies = require('js-cookie');
            const franchiseId = Cookies.get('franchiseId');
            if (franchiseId) {
                const cartKey = `cart_${franchiseId}`;
                localStorage.setItem(cartKey, JSON.stringify(state.cart));
            }
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const load = () => {
    if (!process.browser) {
        return undefined;
    }

    let state;

    try {
        state = localStorage.getItem('state');

        if (typeof state === 'string') {
            state = JSON.parse(state);
        }

        if (state && state.version !== version) {
            state = undefined;
        }

        // Remove any old cart from main state (cart is now franchise-specific only)
        if (state && state.cart) {
            delete state.cart;
        }

        // Load franchise-specific cart if franchise context exists
        if (state && typeof window !== 'undefined') {
            const Cookies = require('js-cookie');
            const franchiseId = Cookies.get('franchiseId');
            if (franchiseId) {
                const cartKey = `cart_${franchiseId}`;
                const savedCart = localStorage.getItem(cartKey);
                if (savedCart) {
                    try {
                        state.cart = JSON.parse(savedCart);
                    } catch (e) {
                        // If cart parse fails, use empty cart
                        state.cart = {
                            lastItemId: 0,
                            quantity: 0,
                            items: [],
                            subtotal: 0,
                            totals: [],
                            total: 0,
                            shippingPrice: 0,
                            stateFrom: 'client',
                        };
                    }
                } else {
                    // If no franchise-specific cart exists, use empty cart
                    state.cart = {
                        lastItemId: 0,
                        quantity: 0,
                        items: [],
                        subtotal: 0,
                        totals: [],
                        total: 0,
                        shippingPrice: 0,
                        stateFrom: 'client',
                    };
                }
            } else {
                // No franchise context - keep cart empty until franchise is selected
                state.cart = {
                    lastItemId: 0,
                    quantity: 0,
                    items: [],
                    subtotal: 0,
                    totals: [],
                    total: 0,
                    shippingPrice: 0,
                    stateFrom: 'client',
                };
            }
        } else if (state) {
            // No window object or no state - use empty cart
            state.cart = {
                lastItemId: 0,
                quantity: 0,
                items: [],
                subtotal: 0,
                totals: [],
                total: 0,
                shippingPrice: 0,
                stateFrom: 'client',
            };
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return state || undefined;
};

// create a makeStore function
const makeStore: MakeStore<Store<RootState>> = () => (
    createStore(rootReducer, composeWithDevTools(
        applyMiddleware(thunk),
    ))
);

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore);
