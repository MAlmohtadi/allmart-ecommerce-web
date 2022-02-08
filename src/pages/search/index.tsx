// application
import getShopPageData from '../../store/shop/shopHelpers';
import ShopPageCategory from '../../components/shop/ShopPageCategory';
import { wrapper } from '../../store/store';
// import getHomePageData from '../../store/home/homeHelpers';

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    await getShopPageData(store, context);
    // await getHomePageData(store, context);
    return { props: {} };
});

function Page() {
    return <ShopPageCategory columns={3} viewMode="list" />;
}

export default Page;
