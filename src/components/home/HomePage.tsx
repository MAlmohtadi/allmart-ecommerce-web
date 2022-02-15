// react
import { Fragment, useMemo } from 'react';

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
import { IHomePageResponse } from '../../interfaces/homepage';
import { IProductResponse } from '../../interfaces/product';
import { useSale } from '../../store/sale/saleHooks';
import BlockCategories from '../blocks/BlockCategories';

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
    const homepageInfo = useDeferredData(() => shopApi.getHomePageData({ isWholeSale }), initData?.homepageInfo);

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

            {useMemo(() => (
                <BlockCategories
                    title="التصنيفات"
                    layout="classic"
                    categories={homepageInfo.data?.categories}
                />
            ), [])}
            
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
                        rows={offerProducts.data?.products?.length || 0 > 10 ? 2 : 1}
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
