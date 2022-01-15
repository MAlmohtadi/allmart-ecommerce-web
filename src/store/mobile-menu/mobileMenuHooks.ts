// application
import { MOBILE_MENU_NAMESPACE } from './mobileMenuReducer';
import { mobileMenuClose, mobileMenuOpen } from './mobileMenuActions';
import { useAppAction, useAppSelector } from '../hooks';

export const useMobileMenu = () => useAppSelector((state) => state[MOBILE_MENU_NAMESPACE]);

export const useMobileMenuOpen = () => useAppAction(mobileMenuOpen);

export const useMobileMenuClose = () => useAppAction(mobileMenuClose);
