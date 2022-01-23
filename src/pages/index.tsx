// third-party
import { GetServerSideProps } from 'next';

// application
import HomePage, { InitData } from '../components/home/HomePage';
import shopApi from '../api/shop';

export interface PageProps {
    initData?: InitData;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
    return {
    props: {
        initData: {
            homepageInfo: await shopApi.getHompageData({ isWholeSale: false }),
            featuredProducts: await shopApi.getFeaturedProducts({ isWholeSale: false }),
            offerProducts: await shopApi.getOfferProducts({
                isWholeSale: false,
                nextPageNumber: 0,
                pageSize: 20,
                sort: 'asc',
            }),
        },
    },
}};

function Page(props: PageProps) {
    const { initData } = props;

    return <HomePage initData={initData} />;
}

export default Page;
