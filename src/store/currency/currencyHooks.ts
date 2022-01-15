// application
import { CURRENCY_NAMESPACE } from './currencyReducer';
import { currencyChange } from './currencyActions';
import { useAppAction, useAppSelector } from '../hooks';

export const useCurrency = () => useAppSelector((state) => state[CURRENCY_NAMESPACE].current);

export const useCurrencyChange = () => useAppAction(currencyChange);
