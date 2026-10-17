/**
 * Pure function to format price - NO HOOKS
 * Components must pass currencyCode and currencySymbol
 * SSR-safe: Can be used in getServerSideProps, getInitialProps, etc.
 */
export const formatPrice = (
    price: number, 
    currencyCode: string = 'JOD', 
    currencySymbol: string = 'د.أ'
): string => {
    const formattedPrice = parseFloat(price.toString()).toFixed(2);

    if (currencyCode === 'USD') {
        // USD: $10.50
        return `$${formattedPrice}`;
    } else {
        // JOD: 10.50 د.أ
        return `${formattedPrice} ${currencySymbol}`;
    }
};

/**
 * Get default currency symbol (fallback only)
 */
export const getDefaultCurrencySymbol = (): string => {
    return 'د.أ';
};

/**
 * Get default currency code (fallback only)
 */
export const getDefaultCurrencyCode = (): string => {
    return 'JOD';
};

