// react
import { ComponentType, useEffect, useMemo, Fragment, useState } from "react";
// third-party
import { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { NextComponentType, NextPageContext } from "next";
import { useStore, useDispatch } from "react-redux";
// application
import { parse } from 'cookie';
import shopApi from '../api/shop';
import Layout from "../components/Layout";
import { load, save, wrapper } from "../store/store";
import { useApplyClientState } from "../store/client";
import { useDirection, useLocale, useMessages } from "../store/locale/localeHooks";
// styles
import "../scss/index.scss";
import { useSale } from "../store/sale/saleHooks";
import { useSyncedLocalStorage } from "../store/locale/localeHooks";
import { useHomeFetchData } from "../store/home/homeHooks";
import { useMainFetchData } from "../store/main/mainHooks";
import { useAccount } from "../store/account/accountHooks";
import { useInitWishlistProducts } from "../store/wishlist/wishlistHooks";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import FranchiseContext from '../utils/franchise-context';
import { franchiseSet } from '../store/franchise/franchiseActions';
import CountrySelectionModal from '../components/country/CountrySelectionModal';
export type StroykaAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any> & {
        Layout: ComponentType;
    };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StroykaApp({ Component, pageProps, router }: StroykaAppProps) {
    const headerLayout = 'default';
    const applyClientState = useApplyClientState();
    const locale = useLocale();
    const messages = useMessages();
    const direction = useDirection();
    const store = useStore();
    const dispatch = useDispatch();
    const homeData = useSelector((state: any) => state?.home);
    const fetchHomePageData = useHomeFetchData();
    const initWishlist = useInitWishlistProducts();
    const isWholeSale = useSale();
    const account = useAccount();
    const [dir] = useSyncedLocalStorage<"ltr" | "rtl">("direction", "rtl");
    const [showCountrySelection, setShowCountrySelection] = useState(false);
    // console.log("homeData", homeData);
    // fetch home page data when ever isWholeSale changed
    // useEffect(() => {
    //     fetchHomePageData();
    //     if (account.id) {
    //         initWishlist();
    //     }
    // }, [isWholeSale, account.id]);

    // preloader
    useEffect(() => {
        const preloader = document.querySelector('.site-preloader');

        if (!preloader) {
            return;
        }

        setTimeout(() => {
            const onTransitionEnd = (event: Event) => {
                if (event instanceof TransitionEvent && event.propertyName === 'opacity' && preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            };

            preloader.addEventListener('transitionend', onTransitionEnd);
            preloader.classList.add('site-preloader__fade');

            if (getComputedStyle(preloader).opacity === '0' && preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 100);
    }, []);

    // CRITICAL: Initialize direction synchronously on mount (before any rendering)
    // This ensures direction is set immediately, even before React effects run
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const initialDir = localStorage.getItem("direction");
        if (initialDir) {
            document.documentElement.dir = initialDir;
        } else {
            // Default to RTL if not set
            document.documentElement.dir = "rtl";
            localStorage.setItem("direction", "rtl");
        }
    }

    // Loading and saving state on the client side (cart, wishlist, etc.).
    useEffect(() => {
        // Clean up old franchise carts on app load
        if (typeof window !== 'undefined') {
            const { cleanupOldFranchiseCarts, cleanupMainStateCart } = require('../utils/cart-cleanup');
            cleanupMainStateCart(); // Remove cart from main state if it exists
            cleanupOldFranchiseCarts(); // Remove carts for inactive franchises
        }

        const state = load();

        if (state) {
            applyClientState(state);
        }

        if (process.browser) {
            store.subscribe(() => {
                save(store.getState());
            });
        }
    }, [store]);

    // Update direction when dir state changes (from useSyncedLocalStorage)
    // This is the primary way direction is updated
    useEffect(() => {
        if (typeof document !== 'undefined' && dir) {
            document.documentElement.dir = dir;
        }
    }, [dir]);

    // Update direction on route change (backup mechanism)
    useEffect(() => {
        const handleRouteChange = () => {
            if (typeof window !== 'undefined' && typeof document !== 'undefined') {
                const storedDir = localStorage.getItem("direction");
                if (storedDir) {
                    document.documentElement.dir = storedDir;
                } else {
                    document.documentElement.dir = "rtl";
                }
            }
        };
      
        router.events.on("routeChangeComplete", handleRouteChange);
        router.events.on("routeChangeStart", handleRouteChange);
      
        return () => {
          router.events.off("routeChangeComplete", handleRouteChange);
          router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [router.events]);

    // Listen to localStorage changes for immediate updates (backup mechanism)
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleStorageChange = () => {
            if (typeof document !== 'undefined') {
                const storedDir = localStorage.getItem("direction");
                if (storedDir) {
                    document.documentElement.dir = storedDir;
                }
            }
        };

        // Listen to custom event from useSyncedLocalStorage
        window.addEventListener("local-storage-change", handleStorageChange);
        
        // Also listen to storage events (for cross-tab sync)
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "direction" && e.newValue && typeof document !== 'undefined') {
                document.documentElement.dir = e.newValue;
            }
        };
        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("local-storage-change", handleStorageChange);
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    // Update language attribute
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = locale;
        }
    }, [locale]);

    // Client-side: Initialize franchise from cookies or show country selection
    // ONLY for eshop routes (not exportation)
    useEffect(() => {
        // Only run on client-side
        if (typeof window === 'undefined') {
            return;
        }

        // Check if current route is eshop (starts with /eshop or /shop)
        const pathname = router.pathname;
        const isEshopRoute = pathname.startsWith('/eshop') || pathname.startsWith('/shop') || pathname.startsWith('/account') || pathname.startsWith('/search');
        
        // Skip franchise logic for exportation routes
        if (!isEshopRoute) {
            return;
        }

        const countryCode = FranchiseContext.getCountryCode();
        const franchiseId = FranchiseContext.getFranchiseId();
        const franchiseCode = FranchiseContext.getFranchiseCode();

        if (countryCode && franchiseId && franchiseCode) {
            // Initialize franchise in Redux from cookies
            // Get currency from cookies (stored from API response), not inferred
            const currencyCode = FranchiseContext.getCurrencyCode() || 'JOD';
            // Note: currencySymbolAr and currencySymbolEn are stored in cookies by FranchiseContext.setCurrencySymbols()
            // We need to read them directly from cookies since FranchiseContext.getCurrencySymbol() requires langId
            const Cookies = require('js-cookie');
            const currencySymbolAr = Cookies.get('currencySymbolAr') || 'د.أ';
            const currencySymbolEn = Cookies.get('currencySymbolEn') || 'JD';

            dispatch(franchiseSet({
                franchiseId,
                franchiseCode: franchiseCode || '',
                countryCode,
                currencyCode, // From API response, not inferred
                currencySymbolAr, // From API response, not inferred
                currencySymbolEn, // From API response, not inferred
            }));
        } else {
            // Show country selection modal (client-side only)
            // Check if needsCountrySelection flag is set from SSR
            if (pageProps.needsCountrySelection !== false) {
                setShowCountrySelection(true);
            }
        }
    }, [dispatch, pageProps.needsCountrySelection, router.pathname]);

    const content = useMemo(() => {
        const PageLayout = Component.Layout || Fragment;

        return (
            <Layout headerLayout={headerLayout}  homeData={homeData}>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </Layout>
        );
    }, [headerLayout, Component, pageProps,homeData]);

    // Only show country selection modal on eshop routes
    const pathname = router.pathname;
    const isEshopRoute = pathname.startsWith('/eshop') || pathname.startsWith('/shop') || pathname.startsWith('/account') || pathname.startsWith('/search');
    const shouldShowModal = showCountrySelection && isEshopRoute;

    return (
        <IntlProvider locale={locale} messages={messages}>
            {content}
            <CountrySelectionModal 
                isOpen={shouldShowModal} 
                onClose={() => setShowCountrySelection(false)} 
            />
        </IntlProvider>
    );
}

StroykaApp.getInitialProps = wrapper.getInitialAppProps(store => async (context) => {
    const { ctx } = context;
    const cookies = parse(ctx.req?.headers.cookie || "");
    const langId = parseInt(cookies.langId || "1", 10);
    const cookieString = ctx.req?.headers.cookie;
    
    // Check if current route is eshop (not exportation)
    const pathname = ctx.pathname || '';
    const isEshopRoute = pathname.startsWith('/eshop') || pathname.startsWith('/shop') || pathname.startsWith('/account') || pathname.startsWith('/search');
    
    // Only initialize franchise logic for eshop routes
    let homeData = null;
    let needsCountrySelection = false;
    
    if (isEshopRoute) {
        // SSR-Safe: Read franchise from cookies
        const countryCode = FranchiseContext.getCountryCode(cookieString);
        const franchiseId = FranchiseContext.getFranchiseId(cookieString);
        const franchiseCode = FranchiseContext.getFranchiseCode(cookieString);

        // If franchise context available, set in Redux store
        // CRITICAL: Currency comes from cookies (stored from API), not inferred from country
        if (countryCode && franchiseId && franchiseCode) {
            const currencyCode = cookies.currencyCode || 'JOD'; // From API, fallback only
            const currencySymbolAr = cookies.currencySymbolAr || 'د.أ'; // From API, fallback only
            const currencySymbolEn = cookies.currencySymbolEn || 'JD'; // From API, fallback only

            store.dispatch(franchiseSet({
                franchiseId,
                franchiseCode,
                countryCode,
                currencyCode, // From API response, not inferred
                currencySymbolAr, // From API response, not inferred
                currencySymbolEn, // From API response, not inferred
            }));
        }

        // Fetch homepage data with franchise context (if available)
        // Use apiRequestSSR for server-side calls
        try {
            homeData = await shopApi.getHomePageDataSSR({ 
                langId, 
                isWholeSale: false 
            }, cookieString);
        } catch (error) {
            // If franchise context missing, return empty data (will be handled client-side)
            console.warn('Failed to fetch homepage data:', error);
            homeData = null;
        }

        if (homeData) {
            store.dispatch({
                type: "HOME_FETCH_SUCCESS",
                data: homeData,
            });
        }

        needsCountrySelection = !countryCode || !franchiseId;
    }

    return {
        pageProps: {
            initData: homeData,
            needsCountrySelection,
        },
    };
});

export default wrapper.withRedux(StroykaApp);
