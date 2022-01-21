// react
import { Fragment, useEffect, useState } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';
import Product from '../shared/Product';
import ProductTabs from './ProductTabs';
import shopApi from '../../api/shop';
import url from '../../services/url';
import { IProduct } from '../../interfaces/product-old';
import { IShopCategory } from '../../interfaces/category';

// blocks
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';

// widgets
import WidgetCategories from '../widgets/WidgetCategories';
import WidgetProducts from '../widgets/WidgetProducts';

// data stubs
import theme from '../../data/theme';

export type ShopPageProductLayout = 'standard' | 'sidebar' | 'columnar';

export type ShopPageProductSidebarPosition = 'start' | 'end';

export interface ShopPageProductProps {
    layout?: ShopPageProductLayout;
    sidebarPosition?: ShopPageProductSidebarPosition;
    // data
    product: IProduct;
}

function ShopPageProduct(props: ShopPageProductProps) {
    const {
        product,
        layout = 'standard',
        sidebarPosition = 'start',
    } = props;
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<IShopCategory[]>([]);
    const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);

    // Load related products.
    useEffect(() => {
        let canceled = false;

        shopApi.getRelatedProducts(product.slug, { limit: 8 }).then((products) => {
            if (canceled) {
                return;
            }

            setRelatedProducts(products);
        });

        return () => {
            canceled = true;
        };
    }, [product.slug, setRelatedProducts]);

    // Load categories.
    useEffect(() => {
        let canceled = false;

        if (layout !== 'sidebar') {
            setCategories([]);
        } else {
            shopApi.getCategories({ depth: 1 }).then((categories) => {
                if (canceled) {
                    return;
                }

                setCategories(categories);
            });
        }

        return () => {
            canceled = true;
        };
    }, [layout]);

    // Load latest products.
    useEffect(() => {
        let canceled = false;

        if (layout !== 'sidebar') {
            setLatestProducts([]);
        } else {
            shopApi.getLatestProducts({ limit: 5 }).then((result) => {
                if (canceled) {
                    return;
                }

                setLatestProducts(result);
            });
        }

        return () => {
            canceled = true;
        };
    }, [layout]);

    const breadcrumb = [
        { title: 'Home', url: url.home() },
        { title: 'Shop', url: url.catalog() },
        { title: product.name, url: url.product(product) },
    ];

    let content;

    if (layout === 'sidebar') {
        const sidebar = (
            <div className="shop-layout__sidebar">
                <div className="block block-sidebar">
                    <div className="block-sidebar__item">
                        <WidgetCategories categories={categories} location="shop" />
                    </div>
                    <div className="block-sidebar__item d-none d-lg-block">
                        <WidgetProducts title="Latest Products" products={latestProducts} />
                    </div>
                </div>
            </div>
        );

        content = (
            <div className="container">
                <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
                    {sidebarPosition === 'start' && sidebar}
                    <div className=" shop-layout__content">
                        <div className=" block">
                            <Product product={product} layout={layout} />
                            <ProductTabs withSidebar />
                        </div>

                        {relatedProducts.length > 0 && (
                            <BlockProductsCarousel
                                title="Related Products"
                                layout="grid-4-sm"
                                products={relatedProducts}
                                withSidebar
                            />
                        )}
                    </div>
                    {sidebarPosition === 'end' && sidebar}
                </div>
            </div>
        );
    } else {
        content = (
            <Fragment>
                <div className="block">
                    <div className="container">
                        <Product product={product} layout={layout} />
                        <ProductTabs />
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <BlockProductsCarousel
                        title="Related Products"
                        layout="grid-5"
                        products={relatedProducts}
                    />
                )}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{`${product.name} — ${theme.name}`}</title>
            </Head>

            <PageHeader breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageProduct;
