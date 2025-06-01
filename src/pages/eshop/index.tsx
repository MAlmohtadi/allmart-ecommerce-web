// application
import HomePage, { InitData } from '../../components/home/HomePage';
import shopApi from '../../api/shop';
import { wrapper } from '../../store/store';
import getHomePageData from '../../store/home/homeHelpers';
import { parse } from "cookie";

export interface PageProps {
    initData?: InitData;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const cookies = parse(context.req?.headers.cookie || "");
    const langId = parseInt(cookies.langId || "1");
    const homepageInfo = await shopApi.getHomePageData({ isWholeSale: false,langId });
console.log("bsssssoooooooo: ", cookies.langId);
    await getHomePageData(store, langId);
    return {
        props: {
            initData: {
                homepageInfo,
                featuredProducts: await shopApi.getFeaturedProducts({ isWholeSale: false, langId }),
                offerProducts: await shopApi.getOfferProducts({
                    isWholeSale: false,
                    nextPageNumber: 0,
                    pageSize: 20,
                    sort: 'asc',
                    langId
                }),
            },
        },
    };
});

function Page(props: PageProps) {
    const { initData } = props;

    return <HomePage initData={initData} />;
}

export default Page;
