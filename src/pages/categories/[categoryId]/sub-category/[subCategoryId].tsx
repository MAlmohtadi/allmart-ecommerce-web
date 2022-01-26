// application
import { useRouter } from 'next/router';
import getShopPageData from '../../../../store/shop/shopHelpers';
import ShopPageCategory from '../../../../components/shop/ShopPageCategory';
import { wrapper } from '../../../../store/store';

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    await getShopPageData(store, context);
    return { props: {} };
});

function Page() {
    const router = useRouter();
    return <ShopPageCategory columns={3} viewMode="list" />;
    // return <h1>{`Sub Category Page ${router.query.subCategoryId}`}</h1>;
}

export default Page;
