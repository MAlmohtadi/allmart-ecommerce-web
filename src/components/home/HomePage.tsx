// react
import { Fragment, useMemo } from 'react';

// third-party
import Head from 'next/head';

// application
import shopApi from '../../api/shop';
// import { IProduct } from '../../interfaces/product';
import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';

// blocks
// import BlockBanner from '../blocks/BlockBanner';
// import BlockBrands from '../blocks/BlockBrands';
import BlockCategories from '../blocks/BlockCategories';
import BlockFeatures from '../blocks/BlockFeatures';
// import BlockPosts from '../blocks/BlockPosts';
// import BlockProductColumns, { BlockProductColumnsItem } from '../blocks/BlockProductColumns';
// import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
// import dataBlogPosts from '../../data/blogPosts';
import dataShopBlockCategories from '../../data/shopBlockCategories';
import theme from '../../data/theme';
import { IHomePageResponse } from '../../interfaces/hompage';
import { IProductResponse, IProduct } from '../../interfaces/product';

export interface InitData {
    homepageInfo?:IHomePageResponse,
    featuredProducts?: IProductResponse;
    offerProducts?: IProductResponse,
    // bestsellers?: IProduct[];
    // latestProducts?: IProduct[];
    // productColumns?: BlockProductColumnsItem[];
    // customFeaturedProducts: IProductResponse;
}

export interface HomePageProps {
    initData?: InitData;
}

function HomePage(props: HomePageProps) {
    const { initData } = props;

    const homepageInfo = useDeferredData(() => (
        shopApi.getHompageData({ isWholeSale: false })
    ), initData?.homepageInfo);

    const featuredProducts = useDeferredData(() => (
        shopApi.getFeaturedProducts({ isWholeSale: false })
    ), initData?.featuredProducts);

    const offerProducts = useDeferredData(() => (
        shopApi.getOfferProducts({
            isWholeSale: false,
            nextPageNumber: 0,
            pageSize: 20,
            sort: 'asc',
        })
    ), initData?.offerProducts);

    return (
        <Fragment>
            <Head>
                <title>{`Home Page Two — ${theme.name}`}</title>
            </Head>

            {useMemo(() => <BlockSlideShow homepageInfo={homepageInfo?.data} />, [])}

            {/* {useMemo(() => <BlockFeatures layout="boxed" />, [])} */}

            {useMemo(() => (
                <BlockProductsCarousel
                    title="Featured Products"
                    layout="grid-5"
                    rows={2}
                    products={featuredProducts.data?.products}
                    loading={featuredProducts.isLoading}
                />
            ), [featuredProducts])}

            {useMemo(() => (
                <BlockProductsCarousel
                    title="عروض خاصة"
                    layout="grid-5"
                    rows={offerProducts.data?.products?.length >10 ? 2 : 1}
                    products={offerProducts.data?.products}
                    loading={offerProducts.isLoading}
                />
            ), [offerProducts])}
        </Fragment>
    );
}

export default HomePage;
