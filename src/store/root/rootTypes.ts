import { AppReducerStateType } from '../types';
import cartReducer from '../cart/cartReducer';
import compareReducer from '../compare/compareReducer';
import currencyReducer from '../currency/currencyReducer';
import localeReducer from '../locale/localeReducer';
import saleReducer from '../sale/saleReducer';
import mobileMenuReducer from '../mobile-menu/mobileMenuReducer';
import quickviewReducer from '../quickview/quickviewReducer';
import wishlistReducer from '../wishlist/wishlistReducer';
import shopReducer from '../shop/shopReducer';

export interface RootState {
    version: number;
    cart: AppReducerStateType<typeof cartReducer>;
    wishlist: AppReducerStateType<typeof wishlistReducer>;
    compare: AppReducerStateType<typeof compareReducer>;
    mobileMenu: AppReducerStateType<typeof mobileMenuReducer>;
    quickview: AppReducerStateType<typeof quickviewReducer>;
    locale: AppReducerStateType<typeof localeReducer>;
    sale: AppReducerStateType<typeof saleReducer>;
    currency: AppReducerStateType<typeof currencyReducer>;
    shop: AppReducerStateType<typeof shopReducer>;
}
