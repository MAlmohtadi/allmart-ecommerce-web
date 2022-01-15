// application
import getShopPageData from '../../../store/shop/shopHelpers';
import ShopPageCategory from '../../../components/shop/ShopPageCategory';
import { wrapper } from '../../../store/store';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    await getShopPageData(store, context);

    return { props: {} };
});

function Page() {
    return <ShopPageCategory columns={3} viewMode="grid" sidebarPosition="start" />;
}

export default Page;
