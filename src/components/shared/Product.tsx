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
    translations: ITranslation | null;
}

function Product(props: ProductProps) {
    const { product, layout, translations } = props;

    return (
        <div className={`product product--layout--${layout}`}>
            <div className="product__content">
                <ProductGallery layout={layout} images={[product.imageUrl]} />

                <div className="product__info">
                    <h1 className="product__name">{product.name}</h1>
                    <hr></hr>
                    <div className="product__description">
                        {
                            <>
                                <b> {translations?.detailsTranslation}: </b>
                                <span>{product.description}</span>
                            </>
                        }
                    </div>
                    
                    <br></br>
                    <ul className="product__features">
                        <li key={`product-barcodeTranslation-${product.barcode}`}>
                            <span>{translations?.barcodeTranslation}: </span>
                            {product.barcode}
                        </li>
                        <li key={`product-widthTranslation-${product.barcode}`}>
                            <span>{translations?.widthTranslation}: </span>
                            {product.weight}
                        </li>
                        <li key={`product-packagingTranslation-${product.barcode}`}>
                            <span>{translations?.packagingTranslation}: </span>
                            {product.packaging}
                        </li>
                        <li key={`product-packageWidth-${product.barcode}`}>
                            <span>{translations?.widthTranslation}: </span>
                            {product.packageWidth}
                        </li>
                        <li key={`product-packageHeight-${product.barcode}`}>
                            <span>{translations?.heightTranslation}: </span>
                            {product.packageHeight}
                        </li>
                        <li key={`product-packageWeightTranslation-${product.barcode}`}>
                            <span>{translations?.packageWeightTranslation}: </span>
                            {product.packageWeight}
                        </li>
                        <li key={`product-boxWeightTranslation-${product.barcode}`}>
                            <span>{translations?.boxWeightTranslation}: </span>
                            {product.weight}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Product;
