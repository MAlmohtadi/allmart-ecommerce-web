// react
import { Fragment, useMemo } from 'react';

// third-party
import { FormattedMessage } from 'react-intl';

// application
import Dropdown from './Dropdown';
import { ICurrency } from '../../interfaces/currency';
import { useCurrency, useCurrencyChange } from '../../store/currency/currencyHooks';

// data stubs
import dataShopCurrencies from '../../data/shopCurrencies';

interface DropdownCurrencyItem {
    title: string;
    currency: ICurrency;
}

function DropdownCurrency() {
    const currency = useCurrency();
    const currencyChange = useCurrencyChange();

    const currencies: DropdownCurrencyItem[] = useMemo(() => (
        dataShopCurrencies.map(((eachCurrency) => ({
            title: `${eachCurrency.symbol} ${eachCurrency.name}`,
            currency: eachCurrency,
        })))
    ), []);

    const title = (
        <Fragment>
            <FormattedMessage id="topbar.currency" defaultMessage="Currency" />
            {': '}
            <span className="topbar__item-value">{currency.code}</span>
        </Fragment>
    );

    return (
        <Dropdown
            title={title}
            items={currencies}
            onClick={(item) => currencyChange(item.currency)}
        />
    );
}

export default DropdownCurrency;
