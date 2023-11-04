// third-party
import { combineReducers } from 'redux';

// application
import version from '../version';
import cartReducer, { CART_NAMESPACE } from '../cart/cartReducer';
import currencyReducer, { CURRENCY_NAMESPACE } from '../currency/currencyReducer';
import localeReducer, { LOCALE_NAMESPACE } from '../locale/localeReducer';
import saleReducer, { SALE_NAMESPACE } from '../sale/saleReducer';
import mobileMenuReducer, { MOBILE_MENU_NAMESPACE } from '../mobile-menu/mobileMenuReducer';
import wishlistReducer, { WISHLIST_NAMESPACE } from '../wishlist/wishlistReducer';
import shopReducer from '../shop/shopReducer';
import { SHOP_NAMESPACE } from '../shop/shopTypes';
import accountReducer, { ACCOUNT_NAMESPACE } from '../account/accountReducer';
import { HOME_NAMESPACE } from '../home/homeTypes';
import homeReducer from '../home/homeReducer';
import { ORDER_NAMESPACE } from '../order/orderTypes';
import orderReducer from '../order/orderReducer';
import { MAIN_NAMESPACE } from '../main/mainTypes';
import mainReducer from '../main/mainReducer';
import quickviewReducer, { QUICKVIEW_NAMESPACE } from '../quickview/quickviewReducer';

export default combineReducers({
    version: (state: number = version) => state,
    [CART_NAMESPACE]: cartReducer,
    [CURRENCY_NAMESPACE]: currencyReducer,
    [LOCALE_NAMESPACE]: localeReducer,
    [SALE_NAMESPACE]: saleReducer,
    [MOBILE_MENU_NAMESPACE]: mobileMenuReducer,
    [WISHLIST_NAMESPACE]: wishlistReducer,
    [SHOP_NAMESPACE]: shopReducer,
    [ACCOUNT_NAMESPACE]: accountReducer,
    [HOME_NAMESPACE]: homeReducer,
    [ORDER_NAMESPACE]: orderReducer,
    [MAIN_NAMESPACE]: mainReducer,
    [QUICKVIEW_NAMESPACE]: quickviewReducer,
});
