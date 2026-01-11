import Cookies from 'js-cookie';
import { parse } from 'cookie';

/**
 * SSR-Safe Franchise Context Utility
 * Handles franchise context (country code, franchise ID, currency) in both SSR and client-side
 */
class FranchiseContext {
    /**
     * Client-side: Read from js-cookie
     * Server-side: Read from cookie string (from req.headers.cookie)
     */
    static getCountryCode(cookieString?: string): string | null {
        if (typeof window === 'undefined') {
            // SSR: Parse from cookie string
            if (cookieString) {
                const cookies = parse(cookieString);
                return cookies.selectedCountry || null;
            }
            return null;
        }
        // Client-side: Use js-cookie
        return Cookies.get('selectedCountry') || null;
    }

    static setCountryCode(countryCode: string): void {
        if (typeof window === 'undefined') {
            // SSR: Cannot set cookies, skip
            return;
        }
        Cookies.set('selectedCountry', countryCode, { expires: 365 });
    }

    static getFranchiseId(cookieString?: string): number | null {
        if (typeof window === 'undefined') {
            // SSR: Parse from cookie string
            if (cookieString) {
                const cookies = parse(cookieString);
                const franchiseId = cookies.franchiseId;
                return franchiseId ? parseInt(franchiseId, 10) : null;
            }
            return null;
        }
        // Client-side: Use js-cookie
        const franchiseId = Cookies.get('franchiseId');
        return franchiseId ? parseInt(franchiseId, 10) : null;
    }

    static setFranchiseId(franchiseId: number): void {
        if (typeof window === 'undefined') {
            // SSR: Cannot set cookies, skip
            return;
        }
        Cookies.set('franchiseId', franchiseId.toString(), { expires: 365 });
    }

    static getFranchiseCode(cookieString?: string): string | null {
        if (typeof window === 'undefined') {
            // SSR: Parse from cookie string
            if (cookieString) {
                const cookies = parse(cookieString);
                return cookies.franchiseCode || null;
            }
            return null;
        }
        // Client-side: Use js-cookie
        return Cookies.get('franchiseCode') || null;
    }

    static setFranchiseCode(franchiseCode: string): void {
        if (typeof window === 'undefined') {
            // SSR: Cannot set cookies, skip
            return;
        }
        Cookies.set('franchiseCode', franchiseCode, { expires: 365 });
    }

    static getCurrencyCode(cookieString?: string): string | null {
        if (typeof window === 'undefined') {
            // SSR: Parse from cookie string
            if (cookieString) {
                const cookies = parse(cookieString);
                return cookies.currencyCode || null;
            }
            return null;
        }
        // Client-side: Use js-cookie
        return Cookies.get('currencyCode') || null;
    }

    static setCurrencyCode(currencyCode: string): void {
        if (typeof window === 'undefined') {
            // SSR: Cannot set cookies, skip
            return;
        }
        Cookies.set('currencyCode', currencyCode, { expires: 365 });
    }

    /**
     * Get currency symbol based on language
     * @param langId - Language ID (1 = Arabic, 2 = English)
     * @param cookieString - Cookie string for SSR
     */
    static getCurrencySymbol(langId: number = 1, cookieString?: string): string | null {
        if (typeof window === 'undefined') {
            // SSR: Parse from cookie string
            if (cookieString) {
                const cookies = parse(cookieString);
                // Select symbol based on language
                if (langId === 1) {
                    return cookies.currencySymbolAr || null;
                }
                return cookies.currencySymbolEn || null;
            }
            return null;
        }
        // Client-side: Use js-cookie
        const currentLangId = parseInt(Cookies.get('langId') || '1', 10);
        if (currentLangId === 1) {
            return Cookies.get('currencySymbolAr') || null;
        }
        return Cookies.get('currencySymbolEn') || null;
    }

    /**
     * Set both currency symbols (Arabic and English)
     */
    static setCurrencySymbols(currencySymbolAr: string, currencySymbolEn: string): void {
        if (typeof window === 'undefined') {
            // SSR: Cannot set cookies, skip
            return;
        }
        Cookies.set('currencySymbolAr', currencySymbolAr, { expires: 365 });
        Cookies.set('currencySymbolEn', currencySymbolEn, { expires: 365 });
    }

    static clear(): void {
        if (typeof window === 'undefined') {
            // SSR: Cannot clear cookies, skip
            return;
        }
        Cookies.remove('selectedCountry');
        Cookies.remove('franchiseId');
        Cookies.remove('franchiseCode');
        Cookies.remove('currencyCode');
        Cookies.remove('currencySymbolAr');
        Cookies.remove('currencySymbolEn');
    }

    static isAvailable(cookieString?: string): boolean {
        const countryCode = this.getCountryCode(cookieString);
        const franchiseId = this.getFranchiseId(cookieString);
        return !!countryCode && !!franchiseId;
    }
}

export default FranchiseContext;

