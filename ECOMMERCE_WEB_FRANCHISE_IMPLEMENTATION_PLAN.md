# Ecommerce Web Franchise Multi-Tenancy Implementation Plan

## Executive Summary

This document provides a comprehensive implementation plan for extending the All-Mart Ecommerce Web application (Next.js/React) to support multiple franchises. The plan is designed to be consistent with both the API implementation plan and the Admin Portal implementation plan, ensuring seamless integration across all three applications.

**Technology Stack:**
- Next.js 12.1.0 (React 17.0.2)
- TypeScript
- Redux with Redux Thunk
- React Intl for internationalization
- Server-Side Rendering (SSR)
- Cookie-based language selection
- LocalStorage for state persistence

---

## 1. Current Architecture Analysis

### 1.1 API Integration
**Current State:**
- API calls in `src/api/shop.ts` and `src/api/main.ts`
- BASE_URL hardcoded: `"https://jubran.jubran-api.com/api"`
- All API calls use `fetch()` directly
- Language ID (`langId`) passed via cookies or query parameters
- No franchise/country context in API requests
- Device type header included (`deviceType: 'mobileWeb' | 'desktopWeb'`)

**Files Involved:**
- `src/api/shop.ts` - Main shop API (products, orders, cart, checkout)
- `src/api/main.ts` - Main page API (homepage, categories, banners)

### 1.2 State Management
**Current State:**
- Redux store with multiple namespaces (cart, account, home, shop, etc.)
- LocalStorage persistence via `store/store.ts`
- Cookie-based language selection (`langId`)
- No franchise state management
- Cart stored in Redux (localStorage)

**Store Structure:**
- `src/store/cart/` - Cart state
- `src/store/account/` - User account state
- `src/store/home/` - Homepage data
- `src/store/shop/` - Shop/product state
- `src/store/wishlist/` - Wishlist state
- `src/store/locale/` - Language/locale state

### 1.3 Country/Region Handling
**Current State:**
- Partial country handling in checkout (`ShopPageCheckout.tsx`)
- Hardcoded country selection: "Jordan" vs "United States of America"
- Hardcoded delivery price for USA ($25)
- No country selection on first visit
- No country persistence

**File:** `src/components/shop/ShopPageCheckout.tsx` (lines 50-91)

### 1.4 Currency Display
**Current State:**
- `CurrencyFormat` component exists (`src/components/shared/CurrencyFormat.tsx`)
- No franchise-specific currency formatting
- Currency likely hardcoded or single currency

### 1.5 User Authentication
**Current State:**
- Login/register via `shopApi.login()` and `shopApi.registerAccount()`
- User account stored in Redux (`account` namespace)
- No franchise context in user authentication
- User can access all products (no franchise filtering)

---

## 2. Required Changes for Franchise Support

### 2.1 Country/Franchise Selection on First Visit

#### 2.1.1 Country Selection Modal/Page
**New Component:** `src/components/country/CountrySelectionModal.tsx`

**Purpose:** Show country selector on first visit or when franchise context is missing

**Features:**
- Modal overlay (or full-page on mobile)
- Country options: "Jordan" (الأردن) and "USA" (الولايات المتحدة)
- Store selection in cookie: `selectedCountry` = "JO" | "US"
- Auto-detect country from IP/geolocation (optional, can be overridden)
- Remember selection (persist in cookie)

**Implementation:**
```typescript
interface CountrySelectionModalProps {
    onSelect: (countryCode: string) => void;
    isOpen: boolean;
}

// Store in cookie
Cookies.set('selectedCountry', countryCode, { expires: 365 });
```

#### 2.1.2 Country Selection Logic
**New File:** `src/utils/franchise-context.ts`

**Purpose:** Manage franchise context (country code → franchise ID mapping)

**CRITICAL: SSR-Safe Implementation**

```typescript
import Cookies from 'js-cookie';
import { parse } from 'cookie';

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
                return franchiseId ? parseInt(franchiseId) : null;
            }
            return null;
        }
        // Client-side: Use js-cookie
        const franchiseId = Cookies.get('franchiseId');
        return franchiseId ? parseInt(franchiseId) : null;
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

    static getCurrencySymbol(cookieString?: string): string | null {
        if (typeof window === 'undefined') {
            // SSR: Parse from cookie string
            if (cookieString) {
                const cookies = parse(cookieString);
                return cookies.currencySymbol || null;
            }
            return null;
        }
        // Client-side: Use js-cookie
        return Cookies.get('currencySymbol') || null;
    }

    static setCurrencySymbol(currencySymbol: string): void {
        if (typeof window === 'undefined') {
            // SSR: Cannot set cookies, skip
            return;
        }
        Cookies.set('currencySymbol', currencySymbol, { expires: 365 });
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
        Cookies.remove('currencySymbol');
    }

    static isAvailable(cookieString?: string): boolean {
        const countryCode = this.getCountryCode(cookieString);
        const franchiseId = this.getFranchiseId(cookieString);
        return !!countryCode && !!franchiseId;
    }
}

export default FranchiseContext;
```

#### 2.1.3 Franchise Resolution on App Load
**Update File:** `src/pages/_app.tsx`

**Changes:**
- **SSR-Safe:** Read cookies in `getInitialProps` using `parse` from 'cookie' package
- Check for country selection on app load (both SSR and client)
- If missing, show country selection modal (client-side only)
- After country selection, call API to get franchise info
- Store franchise ID and code in cookies

**SSR Implementation:**
```typescript
StroykaApp.getInitialProps = wrapper.getInitialAppProps(store => async (context) => {
    const { ctx } = context;
    const cookies = parse(ctx.req?.headers.cookie || "");
    const langId = parseInt(cookies.langId || "1");
    
    // SSR-Safe: Read franchise from cookies
    const countryCode = cookies.selectedCountry || null;
    const franchiseId = cookies.franchiseId ? parseInt(cookies.franchiseId) : null;
    const franchiseCode = cookies.franchiseCode || null;

    // If franchise context available, set in Redux
    // CRITICAL: Currency comes from cookies (stored from API), not inferred from country
    if (countryCode && franchiseId && franchiseCode) {
        const currencyCode = cookies.currencyCode || 'JOD'; // From API, not inferred
        const currencySymbol = cookies.currencySymbol || 'د.أ'; // From API, not inferred

        store.dispatch(franchiseSet({
            franchiseId,
            franchiseCode,
            countryCode,
            currencyCode, // From API response, not inferred
            currencySymbol, // From API response, not inferred
        }));
    }

    // Fetch homepage data with franchise context (if available)
    // Use apiRequestSSR for server-side calls
    const cookieString = ctx.req?.headers.cookie;
    const homeData = await shopApi.getHomePageDataSSR({ 
        langId, 
        isWholeSale: false 
    }, cookieString);

    store.dispatch({
        type: "HOME_FETCH_SUCCESS",
        data: homeData,
    });

    return {
        pageProps: {
            initData: homeData,
            needsCountrySelection: !countryCode || !franchiseId,
        },
    };
});
```

**Client-Side Initialization:**
```typescript
useEffect(() => {
    // Client-side: Check if country selection needed
    const countryCode = FranchiseContext.getCountryCode();
    const franchiseId = FranchiseContext.getFranchiseId();

    if (!countryCode || !franchiseId) {
        // Show country selection modal
        setShowCountrySelection(true);
    } else {
        // Initialize franchise in Redux from cookies
        const franchiseCode = FranchiseContext.getFranchiseCode();
        // CRITICAL: Get currency from cookies (stored from API response), not inferred from country code
        const currencyCode = FranchiseContext.getCurrencyCode() || 'JOD'; // From API, fallback only
        const currencySymbol = FranchiseContext.getCurrencySymbol() || 'د.أ'; // From API, fallback only

        dispatch(franchiseSet({
            franchiseId,
            franchiseCode: franchiseCode || '',
            countryCode,
            currencyCode, // From API response, not inferred
            currencySymbol, // From API response, not inferred
        }));
    }
}, []);
```

**New API Endpoint Needed:**
```typescript
// In src/api/shop.ts
// CRITICAL: Response shape must be consistent across all clients (Web, Admin, Mobile)
// Response format: { franchiseId: number, franchiseCode: string, currencyCode: string, currencySymbol: string }
getFranchiseByCountry: (countryCode: string): Promise<{ franchiseId: number, franchiseCode: string, currencyCode: string, currencySymbol: string }> => {
    return apiRequest(`/api/franchise/getByCountry?countryCode=${countryCode}`, {
        method: 'GET',
    }).then(async (response) => {
        const result = await response.json();
        // API response format: { isSuccess: boolean, franchiseId, franchiseCode, currencyCode, currencySymbol, message?: string }
        // Store currency in cookies (from API, not inferred)
        if (result.isSuccess && result.franchiseId && result.currencyCode && result.currencySymbol) {
            FranchiseContext.setFranchiseId(result.franchiseId);
            FranchiseContext.setFranchiseCode(result.franchiseCode);
            FranchiseContext.setCurrencyCode(result.currencyCode); // From API
            FranchiseContext.setCurrencySymbol(result.currencySymbol); // From API
            return {
                franchiseId: result.franchiseId,
                franchiseCode: result.franchiseCode,
                currencyCode: result.currencyCode,
                currencySymbol: result.currencySymbol,
            };
        }
        throw new Error(result.message || 'Failed to get franchise');
    });
}

// SSR version
getFranchiseByCountrySSR: (countryCode: string, cookieString?: string): Promise<{ franchiseId: number, franchiseCode: string, currencyCode: string, currencySymbol: string }> => {
    return apiRequestSSR(`/api/franchise/getByCountry?countryCode=${countryCode}`, cookieString, {
        method: 'GET',
    }).then(async (response) => {
        const result = await response.json();
        // API response format: { isSuccess: boolean, franchiseId, franchiseCode, currencyCode, currencySymbol, message?: string }
        if (result.isSuccess && result.franchiseId && result.currencyCode && result.currencySymbol) {
            return {
                franchiseId: result.franchiseId,
                franchiseCode: result.franchiseCode,
                currencyCode: result.currencyCode,
                currencySymbol: result.currencySymbol,
            };
        }
        throw new Error(result.message || 'Failed to get franchise');
    });
}
```

#### 2.1.4 Country Switcher Component
**New Component:** `src/components/country/CountrySwitcher.tsx`

**Purpose:** Allow users to switch country/franchise

**Location:** Header component (next to language selector)

**Features:**
- Dropdown/select showing available countries
- On selection:
  - Clear cart (show warning)
  - Clear wishlist
  - Update franchise context
  - Reload page data
  - Redirect to homepage

**Warning Message:**
"Changing country will clear your cart and wishlist. Continue?"

---

### 2.2 Centralized API Request Interceptor

#### 2.2.1 API Request Utility
**New File:** `src/utils/api-interceptor.ts`

**Purpose:** Automatically add franchise context to all API requests

**CRITICAL: SSR-Safe Implementation**

```typescript
import FranchiseContext from './franchise-context';
import { isMobile } from 'react-device-detect';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://jubran.jubran-api.com/api";

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
        '/api/franchise/getByCountry',
        '/api/user/login',
        '/api/user/register',
    ];

    const requiresFranchiseContext = !PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));

    if (requiresFranchiseContext) {
        if (!franchiseId || !countryCode) {
            if (typeof window !== 'undefined') {
                // Client-side: This is an error - reject immediately
                console.warn('Franchise context missing for protected endpoint:', url);
                return Promise.reject({
                    message: 'Franchise context required. Please select a country.',
                    status: 403,
                    requiresCountrySelection: true,
                });
            }
            // SSR: Continue without franchise header (will fail on server, but handled gracefully)
        }
    }

    // Get language ID from cookies (1 = Arabic, 2 = English)
    const langId = typeof window !== 'undefined' 
        ? (parseInt(Cookies.get('langId') || '1')) 
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
        ? (parseInt(parse(cookieString).langId || '1'))
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
        '/api/franchise/getByCountry',
        '/api/user/login',
        '/api/user/register',
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
```

#### 2.2.2 Update All API Files
**Files to Update:**
- `src/api/shop.ts` - Replace all `fetch()` calls with `apiRequest()` (client) and add `apiRequestSSR()` versions for SSR
- `src/api/main.ts` - Replace all `fetch()` calls with `apiRequest()` (client) and add `apiRequestSSR()` versions for SSR

**Pattern (Client-Side):**
```typescript
// OLD:
return fetch(`${BASE_URL}/products/getProducts`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
    },
    body: JSON.stringify(options),
});

// NEW:
import { apiRequest } from '../utils/api-interceptor';

return apiRequest('/products/getProducts', {
    method: 'POST',
    body: JSON.stringify(options),
});
```

**Pattern (Server-Side/SSR):**
```typescript
// For use in getInitialProps, getServerSideProps
import { apiRequestSSR } from '../utils/api-interceptor';

export const getHomePageDataSSR = (
    options: GetSaleOptions = {},
    cookieString?: string
): Promise<IHomePageResponse> => {
    return apiRequestSSR('/home/getHomeInfo', cookieString, {
        method: 'GET',
        // Query params handled in URL
    }).then((response) => response.json());
};
```

**Important:**
- Client-side components use `apiRequest()`
- Server-side (getInitialProps, getServerSideProps) use `apiRequestSSR(cookieString)`
- Remove `BASE_URL` from individual API calls, use `apiRequest()`/`apiRequestSSR()` which includes it
- Remove `franchiseId` from all request bodies (comes from headers automatically)

---

### 2.3 Redux Store Updates

#### 2.3.1 Franchise State in Redux
**New File:** `src/store/franchise/franchiseTypes.ts`

```typescript
export interface FranchiseState {
    franchiseId: number | null;
    franchiseCode: string | null;
    countryCode: string | null;
    currencyCode: string | null;
    currencySymbol: string | null;
}
```

**New File:** `src/store/franchise/franchiseReducer.ts`

```typescript
import { FranchiseState } from './franchiseTypes';

const initialState: FranchiseState = {
    franchiseId: null,
    franchiseCode: null,
    countryCode: null,
    currencyCode: null,
    currencySymbol: null,
};

export const FRANCHISE_NAMESPACE = 'franchise';

export default function franchiseReducer(
    state = initialState,
    action: any
): FranchiseState {
    switch (action.type) {
        case 'FRANCHISE_SET':
            return {
                ...state,
                franchiseId: action.franchiseId,
                franchiseCode: action.franchiseCode,
                countryCode: action.countryCode,
                currencyCode: action.currencyCode,
                currencySymbol: action.currencySymbol,
            };
        case 'FRANCHISE_CLEAR':
            return initialState;
        default:
            return state;
    }
}
```

**New File:** `src/store/franchise/franchiseActions.ts`

```typescript
import { FranchiseState } from './franchiseTypes';

export function franchiseSet(data: FranchiseState) {
    return {
        type: 'FRANCHISE_SET',
        ...data,
    };
}

export function franchiseClear() {
    return {
        type: 'FRANCHISE_CLEAR',
    };
}
```

**New File:** `src/store/franchise/franchiseHooks.ts`

```typescript
import { useSelector } from 'react-redux';
import { FranchiseState } from './franchiseTypes';
import { FRANCHISE_NAMESPACE } from './franchiseReducer';

export function useFranchise(): FranchiseState {
    return useSelector((state: any) => state[FRANCHISE_NAMESPACE] || {});
}
```

**Update File:** `src/store/root/rootReducer.ts`

**Add franchise reducer to root reducer:**
```typescript
import franchiseReducer from '../franchise/franchiseReducer';

// In combineReducers:
franchise: franchiseReducer,
```

#### 2.3.2 Initialize Franchise State
**Update File:** `src/pages/_app.tsx`

**Changes:**
- **SSR:** Initialize franchise state in `getInitialProps` (see section 2.1.3)
- **Client-side:** Check cookies and initialize if needed
- If missing, show country selection modal (client-side only)
- After country selection, fetch franchise info and set in Redux

**Client-Side Initialization (in component):**
```typescript
useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') {
        return;
    }

    const countryCode = FranchiseContext.getCountryCode();
    const franchiseId = FranchiseContext.getFranchiseId();
    const franchiseCode = FranchiseContext.getFranchiseCode();

    if (countryCode && franchiseId && franchiseCode) {
        // CRITICAL: Get currency from cookies (stored from API), not inferred from country
        const currencyCode = FranchiseContext.getCurrencyCode() || 'JOD'; // From API, fallback only
        const currencySymbol = FranchiseContext.getCurrencySymbol() || 'د.أ'; // From API, fallback only

        dispatch(franchiseSet({
            franchiseId,
            franchiseCode,
            countryCode,
            currencyCode, // From API response, not inferred
            currencySymbol, // From API response, not inferred
        }));
    } else {
        // Show country selection modal (client-side only)
        setShowCountrySelection(true);
    }
}, []);
```

**Note:** Franchise state is also initialized in `getInitialProps` for SSR (see section 2.1.3).

---

### 2.4 Currency Display & Formatting

#### 2.4.1 Currency Utility
**New File:** `src/utils/currency-formatter.ts`

**Purpose:** Format prices based on franchise currency

**CRITICAL: Pure Functions (No Hooks)**

```typescript
/**
 * Pure function to format price - NO HOOKS
 * Components must pass currencyCode and currencySymbol
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
```

**New File:** `src/hooks/useCurrencyFormatter.ts`

**Purpose:** React hook that provides currency formatter with franchise context

```typescript
import { useFranchise } from '../store/franchise/franchiseHooks';
import { formatPrice as formatPriceUtil } from '../utils/currency-formatter';

/**
 * Hook that returns currency formatter function with franchise context
 */
export function useCurrencyFormatter() {
    const franchise = useFranchise();
    
    const currencyCode = franchise.currencyCode || 'JOD';
    const currencySymbol = franchise.currencySymbol || 'د.أ';
    
    return {
        formatPrice: (price: number) => formatPriceUtil(price, currencyCode, currencySymbol),
        currencyCode,
        currencySymbol,
    };
}
```

#### 2.4.2 Update CurrencyFormat Component
**Update File:** `src/components/shared/CurrencyFormat.tsx`

**Changes:**
- Use franchise currency from Redux
- Format based on currency code
- Support both JOD and USD formatting

#### 2.4.3 Update All Price Displays
**Files to Update:**
- All product listing components
- Cart components
- Checkout components
- Order details components
- Account pages

**Pattern (Option 1 - Using Hook):**
```typescript
import { useCurrencyFormatter } from '../../hooks/useCurrencyFormatter';

// In component:
const { formatPrice, currencyCode, currencySymbol } = useCurrencyFormatter();
<span>{formatPrice(product.price)}</span>
```

**Pattern (Option 2 - Direct):**
```typescript
import { formatPrice } from '../../utils/currency-formatter';
import { useFranchise } from '../../store/franchise/franchiseHooks';

// In component:
const franchise = useFranchise();
<span>{formatPrice(product.price, franchise.currencyCode, franchise.currencySymbol)}</span>
```

**Recommendation:** Use Option 1 (hook) for cleaner code.

---

### 2.5 Cart & Wishlist Per Franchise

#### 2.5.1 Cart Storage Key Update
**Update File:** `src/store/cart/cartReducer.ts`

**Changes:**
- Include franchise ID in cart storage key
- Cart key format: `cart_${franchiseId}`
- Clear cart when franchise changes

**Implementation:**
```typescript
const getCartStorageKey = (franchiseId: number | null): string => {
    return `cart_${franchiseId || 'default'}`;
};

// CRITICAL: Only clear cart when actually switching franchises, not on initial load
export default function cartReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'FRANCHISE_SET':
            // Only clear if switching from one franchise to another (not initial load)
            const previousFranchiseId = state.franchiseId; // Store previous in state if needed
            const nextFranchiseId = action.franchiseId;
            
            // Clear cart only if:
            // 1. Previous franchise ID exists (not initial load)
            // 2. Previous franchise ID is different from new one (actual switch)
            if (previousFranchiseId !== null && previousFranchiseId !== nextFranchiseId) {
                return initialState; // Clear cart on franchise switch
            }
            // On initial load (previousFranchiseId is null), keep existing cart
            return state;
        // ... other cases
    }
}
```

**Alternative Approach (Recommended):**
Handle cart clearing in the country switcher component, not in reducer:

```typescript
// In CountrySwitcher component:
const handleCountrySwitch = async (newCountryCode: string) => {
    const confirmed = window.confirm(
        'Changing country will clear your cart and wishlist. Continue?'
    );
    
    if (!confirmed) return;

    // Clear cart BEFORE switching franchise
    dispatch(cartClear());
    
    // Then switch franchise
    // ... franchise switch logic
};
```

**Update File:** `src/store/cart/cartReducer.ts`

**Changes:**
- Store current franchise ID in cart state (optional, for comparison)
- Do NOT clear cart on `FRANCHISE_SET` action
- Cart clearing handled explicitly in country switcher component

#### 2.5.2 Wishlist Per Franchise
**Update File:** `src/store/wishlist/wishlistReducer.ts`

**Changes:**
- Include franchise ID in wishlist API calls
- Filter wishlist by franchise (handled by API)
- Clear wishlist when franchise changes

**Update File:** `src/store/wishlist/wishlistActions.ts`

**Changes:**
- Remove `franchiseId` from all wishlist API calls (comes from header)
- Get franchise ID from Redux state

```typescript
export function wishlistFetchProducts(): WishlistThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        const account = getState()[ACCOUNT_NAMESPACE];
        
        if (!account.id) {
            return;
        }

        // CRITICAL: Do NOT pass franchiseId in request body
        // API will get franchiseId from X-Franchise-Id header (via apiRequest)
        const products = await shopApi.getWishListProducts({
            userId: account.id,
            // franchiseId removed - comes from header
        });
        
        dispatch(wishlistFetchProductsSuccess(products));
    };
}

// Add action to clear wishlist
export function wishlistClear() {
    return {
        type: 'WISHLIST_CLEAR',
    };
}
```

**New Actions Needed for Complete State Reset:**

**Update File:** `src/store/home/homeActions.ts`
```typescript
export function clearHomeData() {
    return {
        type: 'CLEAR_HOME_DATA',
    };
}
```

**Update File:** `src/store/shop/shopActions.ts` (or productActions.ts)
```typescript
export function clearProductFilters() {
    return {
        type: 'CLEAR_PRODUCT_FILTERS',
    };
}

export function clearSelectedCategory() {
    return {
        type: 'CLEAR_SELECTED_CATEGORY',
    };
}
```

#### 2.5.3 Cart/Wishlist Clear on Franchise Switch
**Update File:** `src/components/country/CountrySwitcher.tsx`

**Changes:**
- Show warning before switching
- Clear cart and wishlist on switch
- Update franchise context
- Reload page

```typescript
const handleCountrySwitch = async (newCountryCode: string) => {
    const confirmed = window.confirm(
        'Changing country will clear your cart and wishlist. Continue?'
    );
    
    if (!confirmed) return;

    // CRITICAL: Reset ALL franchise-bound state, not just cart
    // Clear cart
    dispatch(cartClear());
    
    // Clear wishlist
    dispatch(wishlistClear());
    
    // Clear homepage data (banners, categories cached data)
    dispatch(clearHomeData());
    
    // Clear product filters and selected category
    dispatch(clearProductFilters());
    dispatch(clearSelectedCategory());
    
    // Update franchise context
    FranchiseContext.setCountryCode(newCountryCode);
    const franchiseInfo = await shopApi.getFranchiseByCountry(newCountryCode);
    FranchiseContext.setFranchiseId(franchiseInfo.franchiseId);
    FranchiseContext.setFranchiseCode(franchiseInfo.franchiseCode);
    // CRITICAL: Store currency from API response, not inferred
    FranchiseContext.setCurrencyCode(franchiseInfo.currencyCode);
    FranchiseContext.setCurrencySymbol(franchiseInfo.currencySymbol);
    
    // Update Redux
    dispatch(franchiseSet({
        franchiseId: franchiseInfo.franchiseId,
        franchiseCode: franchiseInfo.franchiseCode,
        countryCode: newCountryCode,
        currencyCode: franchiseInfo.currencyCode, // From API, not inferred
        currencySymbol: franchiseInfo.currencySymbol, // From API, not inferred
    }));
    
    // Reload page
    window.location.href = '/';
};
```

---

### 2.6 Checkout & Delivery Updates

#### 2.6.1 Checkout Component Updates
**Update File:** `src/components/shop/ShopPageCheckout.tsx`

**Changes:**
- Remove hardcoded country selection (use franchise context)
- Remove hardcoded delivery price for USA
- Use franchise context for country/state/city
- Delivery price calculation via API (franchise-aware)

**Current Issues (lines 50-91):**
- Hardcoded country: `const [country, setCountry] = useState("Jordan");`
- Hardcoded USA delivery price: `deliveryPrice: 25`
- Manual country handling

**Fix:**
```typescript
import { useFranchise } from '../../store/franchise/franchiseHooks';

const franchise = useFranchise();
const [country, setCountry] = useState(franchise.countryCode === 'US' ? 'United States of America' : 'Jordan');

// Delivery price from API (franchise-aware)
const onChangeLocation = async (lat: number, lng: number) => {
    const deliveryDetails = await shopApi.getDeliveryInfo({ 
        lat, 
        lng,
        country: franchise.countryCode,
        state,
        city,
    });
    setDeliveryDetails(deliveryDetails);
    setLocation({ lat, lng });
};
```

#### 2.6.2 Order Creation Updates
**Update File:** `src/api/shop.ts`

**Changes:**
- Add `franchiseId` to order creation
- Add `country`, `state`, `city` from franchise context
- Remove hardcoded delivery price logic

**Order Options Interface Update:**
```typescript
export interface OrderOptions extends OrderBaseOptions {
    couponCode: string,
    deliveryDate: string,
    deliveryPeriod: string,
    deliveryPrice: number,
    location: string,
    notes: string,
    typeOfPayment: number,
    country: string,      // NEW - Required for delivery calculation
    state: string,        // NEW - Required for USA delivery
    city: string,         // NEW - Required for USA delivery
    // franchiseId removed - API gets it from X-Franchise-Id header (via apiRequest)
}
```

**CRITICAL:** Do NOT include `franchiseId` in request body. The API will extract it from the `X-Franchise-Id` header automatically via the `apiRequest()` interceptor.

---

### 2.7 Product Listing & Search

#### 2.7.1 Product API Calls
**Update Files:**
- `src/api/shop.ts` - All product-related API calls
- `src/store/shop/shopActions.ts` - Product fetching actions

**Changes:**
- All product API calls automatically include franchise context via `apiRequest()`
- No need to manually add franchise ID (handled by interceptor)
- Products automatically filtered by franchise (API handles it)

**No Changes Needed:**
- Product listing components (automatic filtering via API)
- Search functionality (automatic filtering via API)
- Category pages (automatic filtering via API)

#### 2.7.2 Homepage Data
**Update File:** `src/store/home/homeActions.ts`

**Changes:**
- Homepage data fetching includes franchise context
- Categories, banners, offers all franchise-scoped (API handles it)

**Update File:** `src/pages/_app.tsx`

**Changes:**
- `getHomePageData` call includes franchise context (via `apiRequest()`)

---

### 2.8 User Account & Orders

#### 2.8.1 User Orders Per Franchise
**Update File:** `src/api/shop.ts`

**Changes:**
- `getUserOrders` includes franchise context
- Orders filtered by franchise (API handles it)

**Update File:** `src/components/account/AccountPageOrders.tsx`

**Changes:**
- Display franchise indicator for each order
- Filter orders by current franchise (if needed)

#### 2.8.2 User Account
**No Changes Needed:**
- User accounts are shared across franchises (as per API plan)
- User can access orders from all franchises
- UI can show franchise indicator for each order

---

### 2.9 UI Components Updates

#### 2.9.1 Header Component
**Update File:** `src/components/header/Header.tsx`

**Changes:**
- Add country switcher component
- Display current country/franchise indicator
- Show currency symbol

#### 2.9.2 Footer Component
**Update File:** `src/components/footer/Footer.tsx`

**Changes:**
- Contact info per franchise (if applicable)
- Social links per franchise (if applicable)

#### 2.9.3 Homepage
**Update File:** `src/components/home/HomePage.tsx`

**Changes:**
- All data automatically franchise-scoped (via API)
- Currency display uses franchise currency

---

## 2.10 SSR vs Client-Side Patterns Summary

### 2.10.1 Cookie Reading

**Server-Side (SSR):**
```typescript
import { parse } from 'cookie';

// In getInitialProps or getServerSideProps
const cookieString = ctx.req?.headers.cookie;
const cookies = parse(cookieString || '');
const countryCode = cookies.selectedCountry;
const franchiseId = cookies.franchiseId ? parseInt(cookies.franchiseId) : null;

// Or use FranchiseContext utility
const countryCode = FranchiseContext.getCountryCode(cookieString);
const franchiseId = FranchiseContext.getFranchiseId(cookieString);
```

**Client-Side:**
```typescript
import Cookies from 'js-cookie';

// In components, useEffect, etc.
const countryCode = Cookies.get('selectedCountry');
const franchiseId = Cookies.get('franchiseId') ? parseInt(Cookies.get('franchiseId')!) : null;

// Or use FranchiseContext utility
const countryCode = FranchiseContext.getCountryCode(); // No parameter
const franchiseId = FranchiseContext.getFranchiseId(); // No parameter
```

### 2.10.2 API Calls

**Server-Side (SSR):**
```typescript
import { apiRequestSSR } from '../utils/api-interceptor';

// In getInitialProps or getServerSideProps
const cookieString = ctx.req?.headers.cookie;
const response = await apiRequestSSR('/products/getProducts', cookieString, {
    method: 'POST',
    body: JSON.stringify(options),
});
```

**Client-Side:**
```typescript
import { apiRequest } from '../utils/api-interceptor';

// In components, Redux actions, etc.
const response = await apiRequest('/products/getProducts', {
    method: 'POST',
    body: JSON.stringify(options),
});
```

### 2.10.3 Currency Formatting

**Server-Side (SSR):**
```typescript
import { formatPrice } from '../utils/currency-formatter';

// Pure function, no hooks
const formatted = formatPrice(10.50, 'USD', '$');
```

**Client-Side:**
```typescript
import { useCurrencyFormatter } from '../hooks/useCurrencyFormatter';

// In component
const { formatPrice } = useCurrencyFormatter();
const formatted = formatPrice(10.50);
```

### 2.10.4 Country Selection UI

**Server-Side:**
- ❌ Do NOT render country selection modal in SSR
- ✅ Set `needsCountrySelection` flag in pageProps
- ✅ Handle country selection client-side only

**Client-Side:**
```typescript
// In component
useEffect(() => {
    if (pageProps.needsCountrySelection) {
        setShowCountrySelection(true);
    }
}, []);
```

---

## 3. Implementation Phases

### Phase 1: Foundation (Week 1)
1. ✅ Create `FranchiseContext` utility (SSR-safe)
2. ✅ Create `apiRequest` and `apiRequestSSR` interceptors (SSR-safe)
3. ✅ Create franchise Redux store (types, reducer, actions, hooks)
4. ✅ Create country selection modal/component (client-side only)
5. ✅ Update `_app.tsx` to handle franchise initialization (SSR + client)
6. ✅ Create franchise resolution API integration
7. ✅ Create currency formatter (pure functions) and `useCurrencyFormatter` hook

### Phase 2: API Integration (Week 2)
1. ✅ Update `src/api/shop.ts` to use `apiRequest()` (client) and `apiRequestSSR()` (SSR)
2. ✅ Update `src/api/main.ts` to use `apiRequest()` (client) and `apiRequestSSR()` (SSR)
3. ✅ Remove hardcoded BASE_URL from API files
4. ✅ Remove `franchiseId` from all request bodies (use headers only)
5. ✅ Test all API calls include franchise context (both client and SSR)
6. ✅ Update all Redux actions to use franchise context
7. ✅ Test SSR with franchise context

### Phase 3: UI Components (Week 3)
1. ✅ Create country switcher component
2. ✅ Update header with country switcher
3. ✅ Update all price displays to use `useCurrencyFormatter` hook
4. ✅ Update checkout component (remove hardcoded country/delivery)
5. ✅ Update cart/wishlist to be franchise-aware
6. ✅ Fix cart clearing logic (only on actual switch, not initial load)

### Phase 4: Cart & Wishlist (Week 4)
1. ✅ Update cart storage to include franchise ID
2. ✅ Update wishlist to include franchise ID
3. ✅ Implement cart/wishlist clear on franchise switch
4. ✅ Test cart persistence per franchise

### Phase 5: Testing & Polish (Week 5)
1. ✅ Test country selection flow
2. ✅ Test franchise switching
3. ✅ Test currency display
4. ✅ Test cart/wishlist per franchise
5. ✅ Test checkout flow
6. ✅ Test order creation
7. ✅ UI/UX refinements

---

## 4. File Structure Changes

### New Files to Create:
```
src/
├── components/
│   └── country/
│       ├── CountrySelectionModal.tsx (NEW)
│       └── CountrySwitcher.tsx (NEW)
├── store/
│   └── franchise/
│       ├── franchiseTypes.ts (NEW)
│       ├── franchiseReducer.ts (NEW)
│       ├── franchiseActions.ts (NEW)
│       └── franchiseHooks.ts (NEW)
├── hooks/
│   └── useCurrencyFormatter.ts (NEW)
├── utils/
│   ├── franchise-context.ts (NEW - SSR-safe)
│   ├── api-interceptor.ts (NEW - SSR-safe with apiRequestSSR)
│   └── currency-formatter.ts (NEW - Pure functions, no hooks)
```

### Files to Modify:
- `src/api/shop.ts` - Use apiRequest, add franchise to orders
- `src/api/main.ts` - Use apiRequest
- `src/pages/_app.tsx` - Franchise initialization
- `src/store/root/rootReducer.ts` - Add franchise reducer
- `src/store/cart/cartReducer.ts` - Franchise-aware cart
- `src/store/wishlist/wishlistReducer.ts` - Franchise-aware wishlist
- `src/components/shop/ShopPageCheckout.tsx` - Remove hardcoded country/delivery
- `src/components/shared/CurrencyFormat.tsx` - Use franchise currency
- `src/components/header/Header.tsx` - Add country switcher
- All price display components - Use currency formatter

---

## 5. Consistency with API & Admin Portal Plans

### 5.1 Authentication Flow Alignment
- ✅ Ecommerce web sends `countryCode` to `/api/franchise/getByCountry` endpoint
- ✅ API returns franchise info: `{ franchiseId, franchiseCode, currencyCode, currencySymbol }`
- ✅ Ecommerce web stores franchise info (including currency) in cookies (persistent)
- ✅ All API requests include `X-Franchise-Id` and `X-Country-Code` headers (matches API interceptor)
- ✅ Currency comes from API response (franchise configuration), NOT inferred

### 5.2 Franchise Context Alignment
- ✅ Single source of truth: `FranchiseContext` utility (matches API/Admin Portal)
- ✅ Franchise ID stored in cookies (persistent across sessions)
- ✅ All API requests automatically include franchise context via headers
- ✅ No franchise ID in request bodies (security - matches API plan)
- ✅ "Deny by default" - API calls blocked if franchise context missing (client-side)
- ✅ Public endpoints (`/api/franchise/getByCountry`, `/api/user/login`, `/api/user/register`) don't require franchise context

### 5.3 Currency Support Alignment
- ✅ Currency determined by franchise configuration (stored in database)
- ✅ Currency code and symbol come from API response (franchise configuration), NOT inferred
- ✅ Currency formatting utility uses API-provided currency (matches Admin Portal)
- ✅ Price displays use franchise-specific formatting
- ✅ Currency code stored per franchise in database (matches API)

### 5.4 Data Filtering Alignment
- ✅ All data automatically filtered by franchise (via API)
- ✅ No client-side filtering needed (API handles it)
- ✅ Product lists, orders, categories all franchise-scoped
- ✅ Homepage data scoped to franchise
- ✅ Complete state reset on franchise switch: cart, wishlist, homepage data, product filters, selected category

### 5.5 User Account Alignment
- ✅ Shared users across franchises (matches API plan)
- ✅ User can switch franchises
- ✅ Cart and wishlist are franchise-specific
- ✅ Orders show franchise indicator

---

## 6. Environment Variables

### 6.1 API URL Configuration
**New File:** `.env.local` (or update existing)

```env
NEXT_PUBLIC_API_URL=https://jubran.jubran-api.com/api
```

**Update File:** `src/utils/api-interceptor.ts`

```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://jubran.jubran-api.com/api";
```

---

## 7. Server-Side Rendering (SSR) Considerations

### 7.1 Franchise Context in SSR
**Update File:** `src/pages/_app.tsx`

**Changes:**
- In `getInitialProps`, read franchise from cookies using `parse` from 'cookie' package
- Pass franchise context to initial data fetching using `apiRequestSSR`
- Handle missing franchise context gracefully (don't throw, allow default behavior)
- Country selection handled client-side only (not in SSR)

**SSR Implementation:**
```typescript
StroykaApp.getInitialProps = wrapper.getInitialAppProps(store => async (context) => {
    const { ctx } = context;
    const cookies = parse(ctx.req?.headers.cookie || "");
    const langId = parseInt(cookies.langId || "1");
    const cookieString = ctx.req?.headers.cookie;
    
    // SSR-Safe: Read franchise from cookies
    const countryCode = FranchiseContext.getCountryCode(cookieString);
    const franchiseId = FranchiseContext.getFranchiseId(cookieString);
    const franchiseCode = FranchiseContext.getFranchiseCode(cookieString);

    // If franchise context available, set in Redux store
    // CRITICAL: Currency comes from cookies (stored from API), not inferred from country
    if (countryCode && franchiseId && franchiseCode) {
        const currencyCode = cookies.currencyCode || 'JOD'; // From API, fallback only
        const currencySymbol = cookies.currencySymbol || 'د.أ'; // From API, fallback only

        store.dispatch(franchiseSet({
            franchiseId,
            franchiseCode,
            countryCode,
            currencyCode, // From API response, not inferred
            currencySymbol, // From API response, not inferred
        }));
    }

    // Fetch homepage data with franchise context (if available)
    // Use apiRequestSSR for server-side calls
    const homeData = await shopApi.getHomePageDataSSR({ 
        langId, 
        isWholeSale: false 
    }, cookieString);

    store.dispatch({
        type: "HOME_FETCH_SUCCESS",
        data: homeData,
    });

    return {
        pageProps: {
            initData: homeData,
            needsCountrySelection: !countryCode || !franchiseId,
        },
    };
});
```

**Key Points:**
- Use `apiRequestSSR()` for all server-side API calls
- Pass `cookieString` to `apiRequestSSR()` for franchise context
- Don't throw errors if franchise context missing (handle gracefully)
- Country selection UI shown only on client-side

### 7.2 Cookie Handling in SSR
**CRITICAL: SSR-Safe Cookie Handling**

**Server-Side (SSR):**
- Use `cookie` package's `parse()` function (already imported in `_app.tsx`)
- Read cookies from `ctx.req?.headers.cookie` in `getInitialProps` and `getServerSideProps`
- Use `FranchiseContext.getCountryCode(cookieString)` with cookie string parameter
- Use `apiRequestSSR()` for server-side API calls

**Client-Side:**
- Use `js-cookie` package (Cookies.get, Cookies.set)
- Use `FranchiseContext.getCountryCode()` without parameter (reads from js-cookie)
- Use `apiRequest()` for client-side API calls

**Pattern:**
```typescript
// Server-side (getInitialProps, getServerSideProps)
const cookieString = ctx.req?.headers.cookie;
const countryCode = FranchiseContext.getCountryCode(cookieString); // Pass cookie string
const franchiseId = FranchiseContext.getFranchiseId(cookieString);

// Client-side (useEffect, components)
const countryCode = FranchiseContext.getCountryCode(); // No parameter, uses js-cookie
const franchiseId = FranchiseContext.getFranchiseId();
```

**Important:**
- Never call `Cookies.get()` or `Cookies.set()` in SSR (will cause errors)
- Always check `typeof window !== 'undefined'` before using `js-cookie`
- Use `FranchiseContext` utility which handles SSR/client differences

---

## 8. Testing Strategy

### 8.1 Unit Tests
- Test `FranchiseContext` utility functions (both SSR and client modes)
- Test `apiRequest` and `apiRequestSSR` interceptors
- Test currency formatter (pure function, no hooks)
- Test `useCurrencyFormatter` hook
- Test franchise Redux reducer/actions
- Test cart clearing logic (only on switch, not initial load)

### 8.2 Integration Tests
- Test country selection flow (client-side)
- Test franchise switching
- Test API requests include franchise context (client-side)
- Test SSR API requests include franchise context (server-side)
- Test cart/wishlist per franchise
- Test cart NOT cleared on initial load
- Test cart cleared on franchise switch
- Test checkout flow with franchise context
- Test currency display in SSR and client

### 8.3 Manual Testing Checklist
- [ ] Country selection on first visit
- [ ] Country selection persistence
- [ ] Franchise context in all API requests
- [ ] Currency display (JOD vs USD) - both SSR and client
- [ ] Cart NOT cleared on initial load (only on switch)
- [ ] Cart cleared on franchise switch (with confirmation)
- [ ] Wishlist cleared on franchise switch
- [ ] Products filtered by franchise
- [ ] Orders filtered by franchise
- [ ] Checkout flow with franchise context
- [ ] Delivery price calculation per franchise
- [ ] SSR with franchise context (no errors)
- [ ] No `franchiseId` in request bodies (headers only)
- [ ] Currency formatter works in SSR (no hook errors)

---

## 9. Migration Considerations

### 9.1 Backward Compatibility
- Existing users will see country selection on first visit after update
- Old cart data can be cleared (or migrated if needed)
- Language selection remains unchanged
- User accounts remain valid

### 9.2 Data Migration
- No database migration needed (handled by API)
- Clear localStorage cart on first load (optional)
- Cookie-based franchise context (no migration needed)

### 9.3 Deployment
- Deploy after API deployment
- Ensure API endpoints are ready
- Test country selection immediately after deployment
- Monitor for franchise context errors

---

## 10. Risk Assessment

### 10.1 High Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing franchise context in API calls | **CRITICAL** | Use `apiRequest`/`apiRequestSSR` interceptors (mandatory) |
| SSR errors (Cookies.get, window) | **CRITICAL** | SSR-safe `FranchiseContext` and `apiRequestSSR` |
| Cart/wishlist data loss on franchise switch | High | Clear warning message, user confirmation |
| Cart cleared on initial load | High | Only clear on actual switch, not initial load |
| Currency display errors (hook usage) | High | Pure functions + `useCurrencyFormatter` hook |
| FranchiseId in request bodies | High | Remove from bodies, use headers only |

### 10.2 Medium Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Country selection UX confusion | Medium | Clear UI, helpful messages |
| Performance with franchise filtering | Low | API handles filtering, no client-side impact |
| Cookie expiration issues | Low | Long expiration (365 days), refresh on login |

---

## 11. Success Criteria

### 11.1 Functional Requirements
- ✅ Users can select country on first visit
- ✅ Country selection persists across sessions
- ✅ All API requests include franchise context
- ✅ Data filtered by franchise automatically
- ✅ Users can switch franchises
- ✅ Currency displays correctly per franchise
- ✅ Cart and wishlist are franchise-specific
- ✅ Checkout flow works with franchise context

### 11.2 Non-Functional Requirements
- ✅ No franchise context errors in console
- ✅ Smooth user experience
- ✅ Clear franchise indicators in UI
- ✅ Proper error handling
- ✅ SSR works with franchise context

### 11.3 Business Requirements
- ✅ Ecommerce web supports multiple franchises
- ✅ Users can shop from different franchises
- ✅ Currency display matches franchise location
- ✅ Cart/wishlist isolated per franchise

---

## 12. Open Questions & Decisions

1. **Country Selection UI:** Modal, separate page, or banner?
   - **Recommendation:** Modal on first visit, switcher in header for changes

2. **Cart Migration:** Migrate existing cart or clear?
   - **Recommendation:** Clear on first load after update (simpler)

3. **IP Geolocation:** Auto-detect country or manual selection only?
   - **Recommendation:** Manual selection (more reliable, user control)

4. **Franchise Switching Frequency:** How often will users switch?
   - **Decision Needed:** Based on user behavior analysis

---

## Conclusion

This plan provides a comprehensive roadmap for implementing franchise multi-tenancy in the Ecommerce Web application. The implementation is designed to be consistent with both the API plan and the Admin Portal plan, ensuring seamless integration and data security.

**Key Success Factors:**
1. Centralized franchise context management
2. Automatic franchise context in all API requests
3. Clear UI indicators for current franchise
4. Proper cart/wishlist isolation per franchise
5. Currency support per franchise
6. Smooth country selection and switching UX

**Estimated Timeline:** 4-5 weeks for complete implementation, aligned with API and Admin Portal implementation timelines.

---

---

## 13. Cross-Platform Consistency Summary

### 13.1 Currency Source
- ✅ Currency code and symbol come from API response (`/api/franchise/getByCountry`), NOT inferred from country code
- ✅ Stored in cookies and used for all price formatting
- ✅ Currency comes from franchise configuration (database)

### 13.2 API Endpoint Consistency
- ✅ All franchise-scoped endpoints require `X-Franchise-Id` and `X-Country-Code` headers
- ✅ Public endpoints (`/api/franchise/getByCountry`, `/api/user/login`, `/api/user/register`) don't require franchise context
- ✅ "Deny by default" - API calls blocked client-side if franchise context missing

### 13.3 State Reset on Franchise Switch
- ✅ Clears: cart, wishlist, homepage data, product filters, selected category
- ✅ Ensures no stale data from previous franchise

### 13.4 Response Format
- ✅ `/api/franchise/getByCountry` returns: `{ franchiseId, franchiseCode, currencyCode, currencySymbol }`
- ✅ All API responses use consistent wrapper format

---

*Document Version: 1.1*  
*Last Updated: 2025-01-23*  
*Prepared for: All-Mart Ecommerce Web Franchise Expansion*  
*Consistent with:*
- *FRANCHISE_IMPLEMENTATION_ANALYSIS.md (API Plan)*
- *ADMIN_PORTAL_FRANCHISE_IMPLEMENTATION_PLAN.md (Admin Portal Plan)*
- *MOBILE_APP_FRANCHISE_IMPLEMENTATION_PLAN.md (Mobile App Plan)*

