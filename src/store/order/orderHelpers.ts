import { GetServerSidePropsContext } from 'next';
import { Store } from 'redux';
// application

import { AppDispatch } from '../types';
import { RootState } from '../root/rootTypes';
import { orderInitThunk } from './orderActions';

export default async function getOrderPageData(
    store: Store<RootState>,
    context: GetServerSidePropsContext,
    isCurrentOrders: boolean,
    isOlderOrders: boolean,
): Promise<void> {
    // console.log(context);
    const dispatch = store.dispatch as AppDispatch;
    await dispatch(orderInitThunk(isCurrentOrders, isOlderOrders));
}
