import { useFranchise } from '../store/franchise/franchiseHooks';
import { formatPrice as formatPriceUtil } from '../utils/currency-formatter';
import Cookies from 'js-cookie';

/**
 * Hook that returns currency formatter function with franchise context
 * Note: For SSR, use formatPrice directly with explicit currency params
 */
export function useCurrencyFormatter() {
    const franchise = useFranchise();
    
    // Get current language ID
    const langId = typeof window !== 'undefined' 
        ? parseInt(Cookies.get('langId') || '1', 10)
        : 1;
    
    // Select currency symbol based on language
    const currencySymbol = langId === 1 
        ? (franchise.currencySymbolAr || 'د.أ')
        : (franchise.currencySymbolEn || 'JD');
    
    const currencyCode = franchise.currencyCode || 'JOD';
    
    return {
        formatPrice: (price: number) => formatPriceUtil(price, currencyCode, currencySymbol),
        currencyCode,
        currencySymbol,
    };
}

