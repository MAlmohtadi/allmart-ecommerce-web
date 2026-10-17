// @ts-nocheck
// application
import ShopPageCategoryMain from "../../components/shop/ShopPageCategoryMain";
import { wrapper } from "../../store/store";
import mainApi, { DEFAULT_LOCALE, normalizeHomePageInfo } from "../../api/main";
import { defaultLocaleRedirect } from "../../store/main/mainHelpers";
import { IHomePageInfo, IProduct } from "../../interfaces/main";

export interface InitData {
    homePageInfo: IHomePageInfo;
    productsList: IProduct[];
}
export interface PageProps {
    initData: InitData;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    // non-dynamic route: locale and categoryId arrive in the query string (context.params is undefined here)
    const { locale = DEFAULT_LOCALE, categoryId } = context.query;
    // console.log("getAllProduct", context);
    let homePageInfo = await mainApi.getHomePageInfo({ locale: locale });
    if (!homePageInfo) {
        // unknown/inactive ?locale (or the API failed for it): show the Arabic page instead of a 500
        if (locale !== DEFAULT_LOCALE) {
            return defaultLocaleRedirect("/categories", { categoryId });
        }
        homePageInfo = normalizeHomePageInfo(null);
    }
    let productsList;
    if(categoryId){
        productsList= await mainApi.getProductByCategory({ locale: locale, categoryId:categoryId });
    }else{
        productsList= await mainApi.getAllProduct({ locale: locale });
    }
  
    return {
        props: {
            initData: {
                homePageInfo: homePageInfo,
                productsList: productsList,
            },
        },
    };
});

function Page(props: InitData) {
    const { initData } = props;
    return <ShopPageCategoryMain initData={initData} columns={3} viewMode="list" />;
}

export default Page;