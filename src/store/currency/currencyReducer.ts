// application
import { CURRENCY_CHANGE, CurrencyAction } from './currencyActionTypes';
import { CurrencyState } from './currencyTypes';
import { dataShopDefaultCurrency } from '../../data/shopCurrencies';
import { withClientState } from '../client';

const initialState: CurrencyState = {
    current: dataShopDefaultCurrency,
};

export const CURRENCY_NAMESPACE = 'currency';

function currencyBaseReducer(state = initialState, action: CurrencyAction): CurrencyState {
    if (action.type === CURRENCY_CHANGE && state.current.code !== action.currency.code) {
        return {
            ...state,
            current: JSON.parse(JSON.stringify(action.currency)),
        };
    }

    return state;
}

const currencyReducer = withClientState(currencyBaseReducer, CURRENCY_NAMESPACE);

export default currencyReducer;
