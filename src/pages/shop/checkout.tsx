// application
import shopApi from '../../api/shop';
import ShopPageCheckout from '../../components/shop/ShopPageCheckout';
import { ICheckoutInfo } from '../../interfaces/checkout-info';

export interface PageProps {
    initData?: ICheckoutInfo;
}
export async function getServerSideProps() {
    return {
        props: {
            initData: await shopApi.getCheckoutInfo(),
        },
    };
}
function Page(props: PageProps) {
    const { initData } = props;
    return <ShopPageCheckout initData={initData} />;
}

export default Page;
