// @ts-nocheck
// application
import ShopPageCategoryMain from "../../components/shop/ShopPageCategoryMain";
import { wrapper } from "../../store/store";
import mainApi from "../../api/main";
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
    const { locale = "en_US",categoryId  } = context.params;
    console.log("getAllProduct", context);
    const homePageInfo = await mainApi.getHomePageInfo({ locale: locale });
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
    return <ShopPageCategoryMain initData={initData} columns={4} viewMode="grid" />;
}

export default Page;