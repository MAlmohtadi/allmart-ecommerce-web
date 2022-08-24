// react
import { Fragment } from 'react';

// application
import { ICurrency } from '../../interfaces/currency';
//  import { useCurrency } from '../../store/currency/currencyHooks';

export interface CurrencyFormatProps {
    value: number;
    currency?: ICurrency;
}

function CurrencyFormat(props: CurrencyFormatProps) {
    let { value = 0 } = props;
    // const currentCurrency = useCurrency();
    //  const { symbol } = currency || currentCurrency;
    if (value === null) {
        value = 0;
    }
    return <Fragment>{`${value.toFixed(2)} دينار`}</Fragment>;
}

export default CurrencyFormat;
