// application
import getShopPageData from '../../store/shop/shopHelpers';
import ShopPageCategory from '../../components/shop/ShopPageCategory';
import { wrapper } from '../../store/store';

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    await getShopPageData(store, context);
    return { props: {} };
});

function Page() {
    return <ShopPageCategory columns={4} viewMode="grid" pageTitle="عروض خاصة" />;
}

export default Page;
