// application
import {
    MOBILE_MENU_CLOSE,
    MOBILE_MENU_OPEN,
    MobileMenuCloseAction,
    MobileMenuOpenAction,
} from './mobileMenuActionTypes';

export function mobileMenuOpen(): MobileMenuOpenAction {
    return { type: MOBILE_MENU_OPEN };
}

export function mobileMenuClose(): MobileMenuCloseAction {
    return { type: MOBILE_MENU_CLOSE };
}
