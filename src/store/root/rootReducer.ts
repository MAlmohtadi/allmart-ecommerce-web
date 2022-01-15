// third-party
import { combineReducers } from 'redux';

// application
import version from '../version';
import cartReducer, { CART_NAMESPACE } from '../cart/cartReducer';
import compareReducer, { COMPARE_NAMESPACE } from '../compare/compareReducer';
import currencyReducer, { CURRENCY_NAMESPACE } from '../currency/currencyReducer';
import localeReducer, { LOCALE_NAMESPACE } from '../locale/localeReducer';
import mobileMenuReducer, { MOBILE_MENU_NAMESPACE } from '../mobile-menu/mobileMenuReducer';
import quickviewReducer, { QUICKVIEW_NAMESPACE } from '../quickview/quickviewReducer';
import wishlistReducer, { WISHLIST_NAMESPACE } from '../wishlist/wishlistReducer';
import shopReducer from '../shop/shopReducer';
import { SHOP_NAMESPACE } from '../shop/shopTypes';

export default combineReducers({
    version: (state: number = version) => state,
    [CART_NAMESPACE]: cartReducer,
    [COMPARE_NAMESPACE]: compareReducer,
    [CURRENCY_NAMESPACE]: currencyReducer,
    [LOCALE_NAMESPACE]: localeReducer,
    [MOBILE_MENU_NAMESPACE]: mobileMenuReducer,
    [QUICKVIEW_NAMESPACE]: quickviewReducer,
    [WISHLIST_NAMESPACE]: wishlistReducer,
    [SHOP_NAMESPACE]: shopReducer,
});
