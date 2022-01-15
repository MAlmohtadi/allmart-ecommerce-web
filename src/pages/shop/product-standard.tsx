// third-party
import { GetServerSideProps } from 'next';
// application
import shopApi from '../../api/shop';
import ShopPageProduct from '../../components/shop/ShopPageProduct';
import { IProduct } from '../../interfaces/product';

export interface PageProps {
    product: IProduct;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async () => ({
    props: {
        product: await shopApi.getProductBySlug('brandix-screwdriver-screw1500acc'),
    },
});

function Page({ product }: PageProps) {
    return <ShopPageProduct product={product} layout="standard" />;
}

export default Page;
