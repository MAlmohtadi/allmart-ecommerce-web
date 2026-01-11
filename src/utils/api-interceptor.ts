import FranchiseContext from './franchise-context';
import { isMobile } from 'react-device-detect';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://jubran.jubran-api.com/api";
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL ||'http://localhost:8080/api'

/**
 * Client-side API request with franchise context
 */
export const apiRequest = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    // Client-side: Read from cookies
    const franchiseId = FranchiseContext.getFranchiseId();
    const countryCode = FranchiseContext.getCountryCode();

    // CRITICAL: "Deny by default" - Block API calls if franchise context missing
    // List of public endpoints that don't require franchise context
    const PUBLIC_ENDPOINTS = [
        '/franchise/getByCountry',
        '/franchise/getActiveFranchises',
        '/user/login',
        '/user/register',
    ];

    const requiresFranchiseContext = !PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));

    if (requiresFranchiseContext) {
        if (!franchiseId || !countryCode) {
            if (typeof window !== 'undefined') {
                console.log('[API-INTERCEPTOR] Franchise context missing for protected endpoint:', {
                    url,
                    franchiseId,
                    countryCode,
                    stackTrace: new Error().stack
                });
                // Client-side: Reject silently (modal will be shown, no need for console warning)
                const error = {
                    message: 'Franchise context required. Please select a country.',
                    status: 403,
                    requiresCountrySelection: true,
                };
                console.log('[API-INTERCEPTOR] Rejecting promise with error:', error);
                return Promise.reject(error);
            }
            // SSR: Continue without franchise header (will fail on server, but handled gracefully)
        }
    }

    // Get language ID from cookies (1 = Arabic, 2 = English)
    const langId = typeof window !== 'undefined' 
        ? (parseInt(Cookies.get('langId') || '1', 10)) 
        : 1; // Default to Arabic for SSR

    const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        deviceType: typeof window !== 'undefined' && isMobile ? 'mobileWeb' : 'desktopWeb',
        'X-Language-Id': langId.toString(), // Language ID header (1=Arabic, 2=English)
        ...options.headers as Record<string, string>,
    };

    // Only add franchise headers if available
    if (franchiseId && countryCode) {
        headers['X-Franchise-Id'] = franchiseId.toString();
        headers['X-Country-Code'] = countryCode;
    }

    return fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
    });
};

/**
 * Server-side API request with franchise context from cookie string
 * Used in getServerSideProps and getInitialProps
 */
export const apiRequestSSR = async (
    url: string,
    cookieString: string | undefined,
    options: RequestInit = {}
): Promise<Response> => {
    // Server-side: Read from cookie string
    const franchiseId = FranchiseContext.getFranchiseId(cookieString);
    const countryCode = FranchiseContext.getCountryCode(cookieString);

    // Get language ID from cookie string (1 = Arabic, 2 = English)
    const { parse } = require('cookie'); // SSR: Use require for cookie parsing
    const langId = cookieString 
        ? (parseInt(parse(cookieString).langId || '1', 10))
        : 1; // Default to Arabic

    const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        deviceType: 'desktopWeb', // Default for SSR
        'X-Language-Id': langId.toString(), // Language ID header (1=Arabic, 2=English)
        ...options.headers as Record<string, string>,
    };

    // List of public endpoints that don't require franchise context
    const PUBLIC_ENDPOINTS = [
        '/franchise/getByCountry',
        '/franchise/getActiveFranchises',
        '/user/login',
        '/user/register',
    ];

    const requiresFranchiseContext = !PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));

    // For SSR, if franchise context missing and endpoint requires it, continue (will fail on server)
    // Server will return 403, which should be handled by error handling

    // Only add franchise headers if available
    if (franchiseId && countryCode) {
        headers['X-Franchise-Id'] = franchiseId.toString();
        headers['X-Country-Code'] = countryCode;
    }

    return fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
    });
};

