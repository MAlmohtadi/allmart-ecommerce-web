import { Store } from 'redux';
// application

import { AppDispatch } from '../types';
import { RootState } from '../root/rootTypes';
import { mainInitThunk } from './mainActions';

export default async function getHomePageInfo(
    store: Store<RootState>,
): Promise<void> {
    // console.log(context);
    const dispatch = store.dispatch as AppDispatch;
    await dispatch(mainInitThunk());
}
