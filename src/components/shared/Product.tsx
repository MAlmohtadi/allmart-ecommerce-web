// react
import { Fragment, useState } from "react";

// third-party
import classNames from "classnames";

// application
import AppLink from "./AppLink";
import AsyncAction from "./AsyncAction";
import Compare16Svg from "../../svg/compare-16.svg";
import CurrencyFormat from "./CurrencyFormat";
import InputNumber from "./InputNumber";
import ProductGallery from "./ProductGallery";
import Rating from "./Rating";
import Wishlist16Svg from "../../svg/wishlist-16.svg";
import { IProduct, ITranslation } from "../../interfaces/main";
// import { IProduct } from '../../interfaces/product';
// import { useCompareAddItem } from '../../store/compare/compareHooks';
// import { useWishlistAddItem } from '../../store/wishlist/wishlistHooks';
// import { useCartAddItem } from '../../store/cart/cartHooks';

export type ProductLayout = "standard" | "sidebar" | "columnar" | "quickview";

export interface ProductProps {
    product: IProduct;
    layout: ProductLayout;
    translations: ITranslation| null
}

function Product(props: ProductProps) {
    const { product, layout,translations } = props;

    return (
        <div className={`product product--layout--${layout}`}>
            <div className="product__content">
                <ProductGallery layout={layout} images={[product.imageUrl]} />

                <div className="product__info">
                    <h1 className="product__name">{product.name}</h1>

                    <div className="product__description">{`${translations?.detailsTranslation}: ${product.description}`}</div>
                    <ul className="product__features">
                        <li key={`barcodeTranslation-${product.barcode}`}>{`${translations?.barcodeTranslation}: ${product.barcode}`}</li>
                        <li key={`widthTranslation-${product.barcode}`}>{`${translations?.widthTranslation}: ${product.weight}`}</li>
                        <li
                            key={`packagingTranslation-${product.barcode}}`}
                        >{`${translations?.packagingTranslation}: ${product.packaging}`}</li>
                        <li key={`packageWidth-${product.barcode}`}>{`${translations?.widthTranslation}: ${product.packageWidth}`}</li>
                        <li key={`packageHeight-${product.barcode}`}>{`${translations?.heightTranslation}: ${product.packageHeight}`}</li>
                        <li
                            key={`packageWeightTranslation-${product.barcode}`}
                        >{`${translations?.packageWeightTranslation}: ${product.packageWeight}`}</li>
                        <li
                            key={`boxWeightTranslation-${product.name}`}
                        >{`${translations?.boxWeightTranslation}: ${product.weight}`}</li>
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Product;
