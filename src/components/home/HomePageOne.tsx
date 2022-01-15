// react
import { Fragment, useMemo } from 'react';

// third-party
import Head from 'next/head';

// application
import shopApi from '../../api/shop';
import { IProduct } from '../../interfaces/product';
import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockBrands from '../blocks/BlockBrands';
import BlockCategories from '../blocks/BlockCategories';
import BlockFeatures from '../blocks/BlockFeatures';
import BlockPosts from '../blocks/BlockPosts';
import BlockProductColumns, { BlockProductColumnsItem } from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
import dataBlogPosts from '../../data/blogPosts';
import dataShopBlockCategories from '../../data/shopBlockCategories';
import theme from '../../data/theme';

export interface InitData {
    featuredProducts?: IProduct[];
    bestsellers?: IProduct[];
    latestProducts?: IProduct[];
    productColumns?: BlockProductColumnsItem[];
}

export interface HomePageOneProps {
    initData?: InitData;
}

function HomePageOne(props: HomePageOneProps) {
    const { initData } = props;

    /**
     * Featured products.
     */
    const featuredProducts = useProductTabs(
        useMemo(() => [
            { id: 1, name: 'All', categorySlug: undefined },
            { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
            { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
            { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
        ], []),
        (tab) => shopApi.getPopularProducts({ limit: 8, category: tab.categorySlug }),
        initData?.featuredProducts,
    );

    /**
     * Bestsellers.
     */
    const bestsellers = useDeferredData(() => (
        shopApi.getPopularProducts({ limit: 7 })
    ), [], initData?.bestsellers);

    /**
     * Latest products.
     */
    const latestProducts = useProductTabs(
        useMemo(() => [
            { id: 1, name: 'All', categorySlug: undefined },
            { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
            { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
            { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
        ], []),
        (tab) => shopApi.getLatestProducts({ limit: 8, category: tab.categorySlug }),
        initData?.latestProducts,
    );

    /**
     * Product columns.
     */
    const columns = initData?.productColumns || useProductColumns(
        useMemo(() => [
            {
                title: 'Top Rated Products',
                source: () => shopApi.getTopRatedProducts({ limit: 3 }),
            },
            {
                title: 'Special Offers',
                source: () => shopApi.getDiscountedProducts({ limit: 3 }),
            },
            {
                title: 'Bestsellers',
                source: () => shopApi.getPopularProducts({ limit: 3 }),
            },
        ], []),
    );

    return (
        <Fragment>
            <Head>
                <title>{`Home Page One — ${theme.name}`}</title>
            </Head>

            {useMemo(() => <BlockSlideShow withDepartments />, [])}

            {useMemo(() => <BlockFeatures />, [])}

            {useMemo(() => (
                <BlockProductsCarousel
                    title="Featured Products"
                    layout="grid-4"
                    products={featuredProducts.data}
                    loading={featuredProducts.isLoading}
                    groups={featuredProducts.tabs}
                    onGroupClick={featuredProducts.handleTabChange}
                />
            ), [featuredProducts])}

            {useMemo(() => <BlockBanner />, [])}

            {useMemo(() => (
                <BlockProducts
                    title="Bestsellers"
                    layout="large-first"
                    featuredProduct={bestsellers.data[0]}
                    products={bestsellers.data.slice(1, 7)}
                />
            ), [bestsellers.data])}

            {useMemo(() => (
                <BlockCategories
                    title="Popular Categories"
                    layout="classic"
                    categories={dataShopBlockCategories}
                />
            ), [])}

            {useMemo(() => (
                <BlockProductsCarousel
                    title="New Arrivals"
                    layout="horizontal"
                    rows={2}
                    products={latestProducts.data}
                    loading={latestProducts.isLoading}
                    groups={latestProducts.tabs}
                    onGroupClick={latestProducts.handleTabChange}
                />
            ), [latestProducts])}

            {useMemo(() => <BlockPosts title="Latest News" layout="list-sm" posts={dataBlogPosts} />, [])}

            {useMemo(() => <BlockBrands />, [])}

            {useMemo(() => <BlockProductColumns columns={columns} />, [columns])}
        </Fragment>
    );
}

export default HomePageOne;
