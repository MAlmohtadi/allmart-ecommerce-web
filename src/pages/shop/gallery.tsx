// application
import ShopPageGallery from '../../components/shop/ShopPageGallery';
import shopApi from '../../api/shop';
import { PageProps } from '..';

// noinspection JSUnusedGlobalSymbols
export async function getServerSideProps() {
    return {
        props: {
            initData: {
                gallery: await shopApi.getGalleryImages(),
            },
        },
    };
}

function Page(props: PageProps) {
    const { initData } = props;

    return <ShopPageGallery initData={initData} />;
}

export default Page;
