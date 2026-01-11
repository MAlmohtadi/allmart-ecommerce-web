// react
import { Fragment } from 'react';

// application
import { ICurrency } from '../../interfaces/currency';
import { useFranchise } from '../../store/franchise/franchiseHooks';
import { formatPrice } from '../../utils/currency-formatter';
import Cookies from 'js-cookie';

export interface CurrencyFormatProps {
    value: number;
    currency?: ICurrency;
}

function CurrencyFormat(props: CurrencyFormatProps) {
    const franchise = useFranchise();
    let { value = 0 } = props;
    
    if (value === null) {
        value = 0;
    }

    // Get current language ID
    const langId = typeof window !== 'undefined' 
        ? parseInt(Cookies.get('langId') || '1', 10)
        : 1;

    // Select currency symbol based on language
    const currencySymbol = langId === 1 
        ? (franchise.currencySymbolAr || 'د.أ')
        : (franchise.currencySymbolEn || 'JD');

    const currencyCode = franchise.currencyCode || 'JOD';

    // Use pure function for formatting (SSR-safe)
    const formatted = formatPrice(value, currencyCode, currencySymbol);

    return <Fragment>{formatted}</Fragment>;
}

export default CurrencyFormat;
