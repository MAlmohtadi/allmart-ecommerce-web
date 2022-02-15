// react
import {
    Fragment,
    useCallback,
    useMemo,
    useState,
} from 'react';

// third-party
import Head from 'next/head';
// application
import BlockLoader from '../blocks/BlockLoader';
import CategorySidebar from './CategorySidebar';
import CategorySidebarItem from './CategorySidebarItem';
import PageHeader from '../shared/PageHeader';
import ProductsView, { ProductsViewGrid } from './ProductsView';
import url from '../../services/url';
import WidgetFilters from '../widgets/WidgetFilters';
import { useShop } from '../../store/shop/shopHooks';

export type ShopPageCategoryColumns = 3 | 4 | 5;
export type ShopPageCategoryViewMode = 'grid' | 'grid-with-features' | 'list';
export type ShopPageCategorySidebarPosition = 'start' | 'end';

export interface ShopPageCategoryProps {
    columns: ShopPageCategoryColumns;
    viewMode: ShopPageCategoryViewMode;
    sidebarPosition?: ShopPageCategorySidebarPosition;
    pageTitle?: string
}

function ShopPageCategory(props: ShopPageCategoryProps) {
    const { columns, viewMode, sidebarPosition = 'start', pageTitle = 'التصنيفات' } = props;
    const offcanvas = columns === 3 ? 'mobile' : 'always';
    const productsViewGrid = `grid-${columns}-${columns > 3 ? 'full' : 'sidebar'}` as ProductsViewGrid;

    // shop
    const shopState = useShop();

    // sidebar
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const openSidebarFn = useCallback(() => setSidebarOpen(true), [setSidebarOpen]);
    const closeSidebarFn = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);

    const sidebarComponent = useMemo(() => (
        <CategorySidebar open={sidebarOpen} closeFn={closeSidebarFn} offcanvas={offcanvas}>
            <CategorySidebarItem>
                <WidgetFilters title="الفلاتر" offcanvas={offcanvas} />
            </CategorySidebarItem>
        </CategorySidebar>
    ), [sidebarOpen, closeSidebarFn, offcanvas]);

    if (shopState.productsListIsLoading && !shopState.productsList) {
        return <BlockLoader />;
    }

    const breadcrumb = [
        { title: 'الرئيسية', url: url.home() },
        { title: pageTitle, url: url.catalog() },
    ];

    let content;

    const productsView = (
        <ProductsView
            layout={viewMode}
            grid={productsViewGrid}
            offcanvas={offcanvas}
            openSidebarFn={openSidebarFn}
        />
    );

    if (columns > 3) {
        content = (
            <div className="container">
                <div className="block">{productsView}</div>
                {sidebarComponent}
            </div>
        );
    } else {
        const sidebar = (
            <div className="shop-layout__sidebar">
                {sidebarComponent}
            </div>
        );

        content = (
            <div className="container">
                <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
                    {sidebarPosition === 'start' && sidebar}
                    <div className="shop-layout__content">
                        <div className="block">{productsView}</div>
                    </div>
                    {sidebarPosition === 'end' && sidebar}
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>التصنيفات - جبران</title>
            </Head>

            <PageHeader header={pageTitle} breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageCategory;
