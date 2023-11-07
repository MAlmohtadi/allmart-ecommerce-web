// @ts-nocheck
import { wrapper } from '../../../store/store';
import mainApi from '../../../api/main';
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
    const { locale = "en_US" } = context.query;
    console.log("getAllProduct", context);
    const homePageInfo = await mainApi.getHomePageInfo({ locale: locale });
    const productsList = await mainApi.getAllProduct({ locale: locale });
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
    return <ShopPageCategoryMain initData={initData} columns={3} viewMode="grid" />;
}



export default Page;
