// application
import BlockHeader from '../shared/BlockHeader';
import ProductCard from '../shared/ProductCard';
import { IProduct } from '../../interfaces/product';

export type BlockProductsLayout = 'large-first' | 'large-last';

export interface BlockProductsProps {
    title: string;
    layout?: BlockProductsLayout;
    featuredProduct?: IProduct;
    products?: IProduct[];
}

function BlockProducts(props: BlockProductsProps) {
    const {
        title,
        featuredProduct,
        layout = 'large-first',
        products = [],
    } = props;

    let large;
    let smalls;

    if (featuredProduct) {
        large = (
            <div className="block-products__featured">
                <div className="block-products__featured-item">
                    <ProductCard product={featuredProduct} />
                </div>
            </div>
        );
    }

    if (products.length > 0) {
        const productsList = products.slice(0, 6).map((product, index) => (
            <div key={index} className="block-products__list-item">
                <ProductCard product={product} />
            </div>
        ));

        smalls = (
            <div className="block-products__list">
                {productsList}
            </div>
        );
    }

    return (
        <div className={`block block-products block-products--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={title} />

                <div className="block-products__body">
                    {layout === 'large-first' && large}
                    {smalls}
                    {layout === 'large-last' && large}
                </div>
            </div>
        </div>
    );
}

export default BlockProducts;
