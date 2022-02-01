// react
import { Fragment, useEffect, useMemo } from 'react';

// third-party
import Head from 'next/head';

// application
import shopApi from '../../api/shop';
// import { IProduct } from '../../interfaces/product';
import { useDeferredData } from '../../services/hooks';

import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
// import dataBlogPosts from '../../data/blogPosts';
import theme from '../../data/theme';
import { IHomePageResponse } from '../../interfaces/hompage';
import { IProductResponse } from '../../interfaces/product';
import { useHome, useHomeFetchData, useHomeInit } from '../../store/home/homeHooks';
import { useSale } from '../../store/sale/saleHooks';
import getHomePageData from '../../store/home/homeHelpers';

export interface InitData {
    homepageInfo?: IHomePageResponse;
    featuredProducts?: IProductResponse;
    offerProducts?: IProductResponse;
}

export interface HomePageProps {
    initData?: InitData;
}

function HomePage(props: HomePageProps) {
    const { initData } = props;
    const isWholeSale = useSale();
    const homepageInfo = useDeferredData(() => shopApi.getHompageData({ isWholeSale }), initData?.homepageInfo);
    const homeData = useHome();
    const featuredProducts = useDeferredData(
        () => shopApi.getFeaturedProducts({ isWholeSale: false }),
        initData?.featuredProducts,
    );

    const offerProducts = useDeferredData(
        () => shopApi.getOfferProducts({
            isWholeSale: false,
            nextPageNumber: 0,
            pageSize: 20,
            sort: 'asc',
        }),
        initData?.offerProducts,
    );

    return (
        <Fragment>
            <Head>
                <title>جبران</title>
            </Head>

            {useMemo(
                () => (
                    <BlockSlideShow homepageInfo={homepageInfo?.data} />
                ),
                [],
            )}

            {/* {useMemo(() => <BlockFeatures layout="boxed" />, [])} */}

            {useMemo(
                () => (
                    <BlockProductsCarousel
                        title="منتجاتنا"
                        layout="grid-5"
                        rows={2}
                        products={featuredProducts.data?.products}
                        loading={featuredProducts.isLoading}
                    />
                ),
                [featuredProducts],
            )}

            {useMemo(
                () => (
                    <BlockProductsCarousel
                        title="عروض خاصة"
                        layout="grid-5"
                        rows={offerProducts.data?.products?.length > 10 ? 2 : 1}
                        products={offerProducts.data?.products}
                        loading={offerProducts.isLoading}
                    />
                ),
                [offerProducts],
            )}
        </Fragment>
    );
}

export default HomePage;
