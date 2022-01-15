// third-party
import { GetServerSideProps } from 'next';
// application
import shopApi from '../../../api/shop';
import ShopPageProduct from '../../../components/shop/ShopPageProduct';
import SitePageNotFound from '../../../components/site/SitePageNotFound';
import { IProduct } from '../../../interfaces/product';

export interface PageProps {
    product: IProduct | null;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let product: IProduct | null = null;

    if (typeof context.params?.slug === 'string') {
        const { slug } = context.params;

        product = await shopApi.getProductBySlug(slug);
    }

    return {
        props: {
            product,
        },
    };
};

function Page({ product }: PageProps) {
    if (product === null) {
        return <SitePageNotFound />;
    }

    return <ShopPageProduct product={product} />;
}

export default Page;
