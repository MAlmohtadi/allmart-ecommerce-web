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
import { useFranchise } from '../store/franchise/franchiseHooks';
import CountrySelectionModal from '../components/country/CountrySelectionModal';
export type StroykaAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any> & {
        Layout: ComponentType;
    };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StroykaApp({ Component, pageProps, router }: StroykaAppProps) {
    console.log('[FRANCHISE-MODAL] StroykaApp: Component render starting', {
        componentName: Component.displayName || Component.name || 'Unknown',
        pathname: router.pathname
    });
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
    
    // Initialize modal state based on franchise context (before any API calls)
    // Check synchronously on mount to prevent API calls before modal shows
    const [showCountrySelection, setShowCountrySelection] = useState(() => {
        if (typeof window === 'undefined') {
            console.log('[FRANCHISE-MODAL] SSR: Modal state initialized to false');
            return false;
        }
        const pathname = router.pathname;
        const isEshopRoute = pathname.startsWith('/eshop') || pathname.startsWith('/shop') || pathname.startsWith('/account') || pathname.startsWith('/search');
        
        console.log('[FRANCHISE-MODAL] Modal state init - pathname:', pathname, 'isEshopRoute:', isEshopRoute);
        
        if (!isEshopRoute) {
            console.log('[FRANCHISE-MODAL] Not an eshop route, modal state: false');
            return false;
        }

        const countryCode = FranchiseContext.getCountryCode();
        const franchiseId = FranchiseContext.getFranchiseId();
        const franchiseCode = FranchiseContext.getFranchiseCode();
        
        console.log('[FRANCHISE-MODAL] Franchise context check:', {
            countryCode,
            franchiseId,
            franchiseCode,
            hasContext: !!(countryCode && franchiseId && franchiseCode)
        });
        
        const shouldShow = !countryCode || !franchiseId || !franchiseCode;
        console.log('[FRANCHISE-MODAL] Modal state initialized:', shouldShow);
        
        // Show modal if franchise context is missing
        return shouldShow;
    });
    
    const franchise = useFranchise();
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

    // Client-side: Check franchise context on mount and show modal immediately if missing
    // This runs FIRST, before any API calls
    useEffect(() => {
        console.log('[FRANCHISE-MODAL] useEffect: Franchise context check starting');
        // Only run on client-side
        if (typeof window === 'undefined') {
            console.log('[FRANCHISE-MODAL] useEffect: SSR, skipping');
            return;
        }

        // Check if current route is eshop (starts with /eshop or /shop)
        const pathname = router.pathname;
        const isEshopRoute = pathname.startsWith('/eshop') || pathname.startsWith('/shop') || pathname.startsWith('/account') || pathname.startsWith('/search');
        
        console.log('[FRANCHISE-MODAL] useEffect - pathname:', pathname, 'isEshopRoute:', isEshopRoute);
        
        // Skip franchise logic for exportation routes
        if (!isEshopRoute) {
            console.log('[FRANCHISE-MODAL] useEffect: Not eshop route, skipping');
            return;
        }

        // Check franchise context immediately
        const countryCode = FranchiseContext.getCountryCode();
        const franchiseId = FranchiseContext.getFranchiseId();
        const franchiseCode = FranchiseContext.getFranchiseCode();

        console.log('[FRANCHISE-MODAL] useEffect - Franchise context:', {
            countryCode,
            franchiseId,
            franchiseCode,
            hasContext: !!(countryCode && franchiseId && franchiseCode)
        });

        // If franchise context is missing, show modal immediately
        if (!countryCode || !franchiseId || !franchiseCode) {
            console.log('[FRANCHISE-MODAL] useEffect: Franchise context missing, setting modal to true');
            setShowCountrySelection(true);
            return; // Don't initialize Redux if franchise is missing
        }

        console.log('[FRANCHISE-MODAL] useEffect: Franchise context exists, initializing Redux');

        // Initialize franchise in Redux from cookies (only if franchise context exists)
        const currencyCode = FranchiseContext.getCurrencyCode() || 'JOD';
        const Cookies = require('js-cookie');
        const currencySymbolAr = Cookies.get('currencySymbolAr') || 'د.أ';
        const currencySymbolEn = Cookies.get('currencySymbolEn') || 'JD';

        dispatch(franchiseSet({
            franchiseId,
            franchiseCode: franchiseCode || '',
            countryCode,
            currencyCode,
            currencySymbolAr,
            currencySymbolEn,
        }));
        console.log('[FRANCHISE-MODAL] useEffect: Redux franchise state initialized');
    }, [dispatch, router.pathname]);

    // Global error handler for API calls that require franchise context
    // This prevents errors from showing as alerts and shows modal instead
    useEffect(() => {
        console.log('[FRANCHISE-MODAL] useEffect: Global error handler setup starting');
        if (typeof window === 'undefined') {
            console.log('[FRANCHISE-MODAL] useEffect: Global error handler - SSR, skipping');
            return;
        }

        // Check if current route is eshop
        const pathname = router.pathname;
        const isEshopRoute = pathname.startsWith('/eshop') || pathname.startsWith('/shop') || pathname.startsWith('/account') || pathname.startsWith('/search');
        
        console.log('[FRANCHISE-MODAL] useEffect: Global error handler - pathname:', pathname, 'isEshopRoute:', isEshopRoute);
        
        if (!isEshopRoute) {
            console.log('[FRANCHISE-MODAL] useEffect: Global error handler - Not eshop route, skipping');
            return;
        }

        // Listen for unhandled promise rejections from API calls
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            const error = event.reason;
            console.log('[FRANCHISE-MODAL] Global error handler: Unhandled rejection caught', {
                error,
                message: (error as any)?.message,
                status: (error as any)?.status,
                requiresCountrySelection: (error as any)?.requiresCountrySelection,
                errorType: typeof error,
                errorKeys: error ? Object.keys(error) : []
            });
            
            // Check if error is related to franchise context
            if (error && (
                (error as any).requiresCountrySelection === true ||
                (error as any).status === 403 ||
                (error as any).message?.toLowerCase().includes('franchise context required') ||
                (error as any).message?.toLowerCase().includes('please select a country') ||
                (error as any).message?.toLowerCase().includes('franchise') ||
                (error as any).message?.toLowerCase().includes('select')
            )) {
                console.log('[FRANCHISE-MODAL] Global error handler: Franchise context error detected, showing modal and preventing default');
                // Show franchise selection modal instead of showing error
                setShowCountrySelection(true);
                event.preventDefault(); // Prevent default error handling (prevents browser console/alert)
                event.stopPropagation(); // Stop event propagation
            } else {
                console.log('[FRANCHISE-MODAL] Global error handler: Error not related to franchise context, allowing default handling');
            }
        };

        console.log('[FRANCHISE-MODAL] useEffect: Global error handler - Adding unhandledrejection listener');
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            console.log('[FRANCHISE-MODAL] useEffect: Global error handler - Removing unhandledrejection listener');
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, [router.pathname]);

    // Check franchise context - if missing and on eshop route, don't render page content
    const pathname = router.pathname;
    const isEshopRoute = pathname.startsWith('/eshop') || pathname.startsWith('/shop') || pathname.startsWith('/account') || pathname.startsWith('/search');
    const shouldShowModal = showCountrySelection && isEshopRoute;
    
    console.log('[FRANCHISE-MODAL] Render check:', {
        pathname,
        isEshopRoute,
        showCountrySelection,
        shouldShowModal,
        componentName: Component.displayName || Component.name || 'Unknown'
    });
    
    const content = useMemo(() => {
        console.log('[FRANCHISE-MODAL] useMemo content: Computing content', {
            shouldShowModal,
            pathname,
            isEshopRoute
        });
        
        // If modal is showing (franchise context missing), don't render page content
        // This prevents HomePage and other components from making API calls
        if (shouldShowModal) {
            console.log('[FRANCHISE-MODAL] useMemo content: Modal showing, returning null (no page content)');
            return null;
        }
        
        console.log('[FRANCHISE-MODAL] useMemo content: Modal not showing, rendering page content');
        const PageLayout = Component.Layout || Fragment;

        return (
            <Layout headerLayout={headerLayout}  homeData={homeData}>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </Layout>
        );
    }, [headerLayout, Component, pageProps, homeData, shouldShowModal, pathname, isEshopRoute]);

    console.log('[FRANCHISE-MODAL] Final render:', {
        shouldShowModal,
        contentIsNull: content === null,
        modalWillRender: shouldShowModal
    });
    
    return (
        <IntlProvider locale={locale} messages={messages}>
            {content}
            <CountrySelectionModal 
                isOpen={shouldShowModal} 
                onClose={() => {
                    console.log('[FRANCHISE-MODAL] Modal onClose called');
                    setShowCountrySelection(false);
                }} 
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

        console.log('[FRANCHISE-MODAL] getInitialProps - Franchise context:', {
            countryCode,
            franchiseId,
            franchiseCode,
            hasContext: !!(countryCode && franchiseId && franchiseCode)
        });

        // If franchise context available, set in Redux store
        // CRITICAL: Currency comes from cookies (stored from API), not inferred from country
        if (countryCode && franchiseId && franchiseCode) {
            console.log('[FRANCHISE-MODAL] getInitialProps: Franchise context exists, setting Redux and fetching homepage data');
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

            // Only fetch homepage data if franchise context is available
            // If franchise context is missing, skip API call (modal will handle selection)
            if (countryCode && franchiseId && franchiseCode) {
                try {
                    console.log('[FRANCHISE-MODAL] getInitialProps: Fetching homepage data...');
                    homeData = await shopApi.getHomePageDataSSR({ 
                        langId, 
                        isWholeSale: false 
                    }, cookieString);
                    console.log('[FRANCHISE-MODAL] getInitialProps: Homepage data fetched successfully');
                } catch (error) {
                    // If fetch fails, return empty data (will be handled client-side)
                    console.warn('[FRANCHISE-MODAL] getInitialProps: Failed to fetch homepage data:', error);
                    console.warn('[FRANCHISE-MODAL] getInitialProps: Error details:', {
                        message: (error as any)?.message,
                        status: (error as any)?.status,
                        error
                    });
                    homeData = null;
                }
            } else {
                // No franchise context - skip API call, modal will handle selection
                console.log('[FRANCHISE-MODAL] getInitialProps: No franchise context, skipping homepage data fetch');
                homeData = null;
            }

        if (homeData) {
            store.dispatch({
                type: "HOME_FETCH_SUCCESS",
                data: homeData,
            });
        }

            needsCountrySelection = !countryCode || !franchiseId;
            console.log('[FRANCHISE-MODAL] getInitialProps: Final state', {
                needsCountrySelection,
                hasHomeData: !!homeData
            });
        } else {
            console.log('[FRANCHISE-MODAL] getInitialProps: Not eshop route, skipping franchise logic');
        }

        return {
            pageProps: {
                initData: homeData,
                needsCountrySelection,
            },
        };
    });

export default wrapper.withRedux(StroykaApp);
