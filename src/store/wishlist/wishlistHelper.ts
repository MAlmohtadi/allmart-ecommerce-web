import { GetServerSidePropsContext } from 'next';
import { Store } from 'redux';
import { RootState } from '../root/rootTypes';
// application
import { AppDispatch } from '../types';
import { wishlistInitThunk } from './wishlistActions';

export default async function getWishlistPageData(
    store: Store<RootState>,
    context: GetServerSidePropsContext,
): Promise<void> {
    // const categorySlug = slug || (typeof context.params?.slug === 'string' ? context.params.slug : null);

    const dispatch = store.dispatch as AppDispatch;

    await dispatch(wishlistInitThunk());
    // }
}
