// react
import { Fragment, useState } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from './AppLink';
import AsyncAction from './AsyncAction';
import Compare16Svg from '../../svg/compare-16.svg';
import CurrencyFormat from './CurrencyFormat';
import InputNumber from './InputNumber';
import ProductGallery from './ProductGallery';
import Rating from './Rating';
import Wishlist16Svg from '../../svg/wishlist-16.svg';
import { IProduct } from '../../interfaces/main';
// import { IProduct } from '../../interfaces/product';
// import { useCompareAddItem } from '../../store/compare/compareHooks';
// import { useWishlistAddItem } from '../../store/wishlist/wishlistHooks';
// import { useCartAddItem } from '../../store/cart/cartHooks';

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

export interface ProductProps {
    product: IProduct;
    layout: ProductLayout;
}

function Product(props: ProductProps) {
    const { product, layout } = props;

    return (
        <div className={`product product--layout--${layout}`}>
            <div className="product__content">
                <ProductGallery layout={layout} images={[product.imageUrl]} />

                <div className="product__info">
                    <h1 className="product__name">{product.name}</h1>
                    
                    <div className="product__description">{product.description}</div>
                    <ul className="product__features">
                    {/* <h6 className="product__name">{product.name}</h6> */}
                        <h6>Barcode: {product.barcode}</h6>
                        <h6>Weight:{product.weight}</h6>
                        <h6>packaging: {product.packaging}</h6>
                        <h6>Voltage: </h6>
                        <h6>packageWidth: {product.packageWidth}</h6>
                        <h6>packageHeight: {product.packageHeight}</h6>
                        <h6>packageWeight: {product.packageWeight}</h6>
                        <h6>packageWeight: {product.weight}</h6>
                    </ul>
                
                </div>
            </div>
        </div>
    );
}

export default Product;
