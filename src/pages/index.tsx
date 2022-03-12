// application
import HomePage, { InitData } from '../components/home/HomePage';
import shopApi from '../api/shop';
import { wrapper } from '../store/store';
import getHomePageData from '../store/home/homeHelpers';

export interface PageProps {
    initData?: InitData;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const homepageInfo = await shopApi.getHomePageData({ isWholeSale: false });
    await getHomePageData(store);
    return {
        props: {
            initData: {
                homepageInfo,
                featuredProducts: await shopApi.getFeaturedProducts({ isWholeSale: false }),
                offerProducts: await shopApi.getOfferProducts({
                    isWholeSale: false,
                    nextPageNumber: 0,
                    pageSize: 20,
                    sort: 'asc',
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
