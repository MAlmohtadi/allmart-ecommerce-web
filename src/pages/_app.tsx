// react
import {
    ComponentType, useEffect, useMemo, Fragment,
} from 'react';
// third-party
import { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import { NextComponentType, NextPageContext } from 'next';
import { useStore } from 'react-redux';
// application
import Layout from '../components/Layout';
import { load, save, wrapper } from '../store/store';
import { useApplyClientState } from '../store/client';
import { useDirection, useLocale, useMessages } from '../store/locale/localeHooks';
// styles
import '../scss/index.scss';

export type StroykaAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any> & {
        Layout: ComponentType;
    };
};

function StroykaApp({ Component, pageProps, router }: StroykaAppProps) {
    const headerLayout = 'default';
    const applyClientState = useApplyClientState();
    const locale = useLocale();
    const messages = useMessages();
    const direction = useDirection();
    const store = useStore();
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
        document.documentElement.lang = locale;
        document.documentElement.dir = direction;
    }, [direction, locale]);

    const content = useMemo(() => {
        const PageLayout = Component.Layout || Fragment;

        return (
            <Layout headerLayout={headerLayout}>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </Layout>
        );
    }, [headerLayout, Component, pageProps]);

    return (
        <IntlProvider locale={locale} messages={messages}>
            {content}
        </IntlProvider>
    );
}

export default wrapper.withRedux(StroykaApp);
