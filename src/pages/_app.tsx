// react
import { ComponentType, useEffect, useMemo, Fragment } from "react";
// third-party
import { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { NextComponentType, NextPageContext } from "next";
import { useStore } from "react-redux";
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
    const homeData = useSelector((state: any) => state?.home);
    const fetchHomePageData = useHomeFetchData();
    const initWishlist = useInitWishlistProducts();
    const isWholeSale = useSale();
    const account = useAccount();
    const [dir] = useSyncedLocalStorage<"ltr" | "rtl">("direction", "rtl");
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

    // Loading and saving state on the client side (cart, wishlist, etc.).
    useEffect(() => {
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
    useEffect(() => {
        const handleRouteChange = () => {
          const dir = localStorage.getItem("direction") || "rtl";
          document.documentElement.dir = dir;
        };
      
        router.events.on("routeChangeComplete", handleRouteChange);
      
        // Set it initially too
        handleRouteChange();
      
        return () => {
          router.events.off("routeChangeComplete", handleRouteChange);
        };
      }, [router.events]);
    useEffect(() => {
        // console.log("Setting HTML lang & dir", direction, locale);
        document.documentElement.lang = locale;
        // document.documentElement.dir = direction;
        document.documentElement.dir = dir;// localStorage.getItem('direction') || 'rtl';;
        // === 'rtl' ? document.documentElement.setAttribute('dir', 'rtl') : document.documentElement.setAttribute('dir', 'ltr');
    }, [dir]);

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

    return (
        <IntlProvider locale={locale} messages={messages}>
            {content}
        </IntlProvider>
    );
}

StroykaApp.getInitialProps = wrapper.getInitialAppProps(store => async (context) => {
    const { ctx } = context;
    const cookies = parse(ctx.req?.headers.cookie || "");
    const langId = parseInt(cookies.langId || "1");
console.log("home_page_data_2")
    const homeData = await shopApi.getHomePageData({ langId, isWholeSale: false });

    store.dispatch({
        type: "HOME_FETCH_SUCCESS",
        data: homeData,
    });

    return {
        pageProps: {
            initData: homeData,
        },
    };
});

export default wrapper.withRedux(StroykaApp);
