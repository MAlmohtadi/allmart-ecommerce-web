// application
import { useAppAction, useAppSelector } from '../hooks';
import { WISHLIST_NAMESPACE } from './wishlistReducer';
import { wishlistAddItem, wishlistRemoveItem } from './wishlistActions';

export const useWishlist = () => useAppSelector((state) => state[WISHLIST_NAMESPACE]);

export const useWishlistAddItem = () => useAppAction(wishlistAddItem);

export const useWishlistRemoveItem = () => useAppAction(wishlistRemoveItem);
