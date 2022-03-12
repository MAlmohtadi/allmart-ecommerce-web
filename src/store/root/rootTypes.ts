import { AppReducerStateType } from '../types';
import cartReducer from '../cart/cartReducer';
import currencyReducer from '../currency/currencyReducer';
import localeReducer from '../locale/localeReducer';
import saleReducer from '../sale/saleReducer';
import mobileMenuReducer from '../mobile-menu/mobileMenuReducer';
import wishlistReducer from '../wishlist/wishlistReducer';
import shopReducer from '../shop/shopReducer';
import accountReducer from '../account/accountReducer';
import homeReducer from '../home/homeReducer';
import orderReducer from '../order/orderReducer';

export interface RootState {
    version: number;
    cart: AppReducerStateType<typeof cartReducer>;
    wishlist: AppReducerStateType<typeof wishlistReducer>;
    mobileMenu: AppReducerStateType<typeof mobileMenuReducer>;
    locale: AppReducerStateType<typeof localeReducer>;
    sale: AppReducerStateType<typeof saleReducer>;
    currency: AppReducerStateType<typeof currencyReducer>;
    shop: AppReducerStateType<typeof shopReducer>;
    account: AppReducerStateType<typeof accountReducer>;
    home: AppReducerStateType<typeof homeReducer>;
    order: AppReducerStateType<typeof orderReducer>;
}
