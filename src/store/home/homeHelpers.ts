import { GetServerSidePropsContext } from 'next';
import { Store } from 'redux';
// application

import { AppDispatch } from '../types';
import { RootState } from '../root/rootTypes';
import { homeInitThunk } from './homeActions';

export default async function getHomePageData(
    store: Store<RootState>,
    context: GetServerSidePropsContext,
): Promise<void> {
    // console.log(context);
    const dispatch = store.dispatch as AppDispatch;
    await dispatch(homeInitThunk());
}
