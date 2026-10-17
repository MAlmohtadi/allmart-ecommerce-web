import { Store } from 'redux';
import qs from 'query-string';
// application

import { AppDispatch } from '../types';
import { RootState } from '../root/rootTypes';
import { mainInitThunk } from './mainActions';
import { DEFAULT_LOCALE } from '../../api/main';

/**
 * getServerSideProps result that reopens an exportation page with ?locale=DEFAULT_LOCALE.
 * Used when the API does not accept the requested locale, so the visitor gets the Arabic page
 * instead of a 500 (and the client never switches to the unknown locale).
 */
export function defaultLocaleRedirect(pathname: string, query: qs.StringifiableRecord = {}) {
    return {
        redirect: {
            destination: qs.stringifyUrl({ url: pathname, query: { ...query, locale: DEFAULT_LOCALE } }),
            permanent: false,
        },
    };
}

export default async function getHomePageInfo(
    store: Store<RootState>,
): Promise<void> {
    // console.log(context);
    const dispatch = store.dispatch as AppDispatch;
    await dispatch(mainInitThunk());
}
