// react
import { Fragment } from 'react';

// application
import { ICurrency } from '../../interfaces/currency';
import { useCurrency } from '../../store/currency/currencyHooks';

export interface CurrencyFormatProps {
    value: number;
    currency?: ICurrency;
}

function CurrencyFormat(props: CurrencyFormatProps) {
    const { value, currency } = props;
    const currentCurrency = useCurrency();
    const { symbol } = currency || currentCurrency;

    return <Fragment>{`${value.toFixed(2)}${symbol}`}</Fragment>;
}

export default CurrencyFormat;
