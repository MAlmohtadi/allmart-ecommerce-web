// application
import { CURRENCY_CHANGE, CurrencyChangeAction } from './currencyActionTypes';
import { ICurrency } from '../../interfaces/currency';

// eslint-disable-next-line import/prefer-default-export
export function currencyChange(currency: ICurrency): CurrencyChangeAction {
    return {
        type: CURRENCY_CHANGE,
        currency,
    };
}
