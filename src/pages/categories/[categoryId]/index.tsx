// @ts-nocheck
import { wrapper } from '../../../store/store';
import mainApi, { DEFAULT_LOCALE, normalizeHomePageInfo } from '../../../api/main';
import { defaultLocaleRedirect } from '../../../store/main/mainHelpers';
import ShopPageCategoryMain from '../../../components/shop/ShopPageCategoryMain';
import { IHomePageInfo, IProduct } from '../../../interfaces/main';

export interface InitData {
    homePageData: IHomePageInfo[];
    productsList: IProduct[];
}
export interface PageProps {
    initData: InitData;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { locale = DEFAULT_LOCALE, categoryId } = context.query;
    // console.log("getAllProduct", context);
    let homePageInfo = await mainApi.getHomePageInfo({ locale: locale });
    if (!homePageInfo) {
        // unknown/inactive ?locale (or the API failed for it): show the Arabic page instead of a 500
        if (locale !== DEFAULT_LOCALE) {
            return defaultLocaleRedirect(`/categories/${encodeURIComponent(categoryId)}`);
        }
        homePageInfo = normalizeHomePageInfo(null);
    }
    const productsList =  await mainApi.getProductByCategory({ locale: locale, categoryId:categoryId });

    return {
        props: {
            initData: {
                homePageInfo: homePageInfo,
                productsList: productsList,
            },
        },
    };
});

function Page(props: PageProps) {
    const { initData } = props;
    return <ShopPageCategoryMain initData={initData} columns={3} viewMode="list" />;
}



export default Page;
