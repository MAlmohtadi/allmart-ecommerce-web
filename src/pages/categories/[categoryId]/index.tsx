// application
import { useRouter } from 'next/router';
import getShopPageData from '../../../store/shop/shopHelpers';
import ShopPageCategory from '../../../components/shop/ShopPageCategory';
import { wrapper } from '../../../store/store';

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return { props: {} }
    });

function Page() {
    return <ShopPageCategory columns={3} viewMode="list" />;
}

export default Page;
