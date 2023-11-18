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
                        <li key={`barcodeTranslation-${product.barcode}`}>
                            {
                                <>
                                    <b> {translations?.barcodeTranslation}: </b>
                                    <span>{product.barcode}</span>
                                </>
                            }
                        </li>
                        <li key={`widthTranslation-${product.barcode}`}>
                            {
                                <>
                                    <b> {translations?.widthTranslation}: </b>
                                    <span>{product.weight}</span>
                                </>
                            }
                        </li>
                        <li key={`packagingTranslation-${product.barcode}}`}>
                            {
                                <>
                                    <b> {translations?.packagingTranslation}: </b>
                                    <span>{product.packaging}</span>
                                </>
                            }
                        </li>
                        <li key={`packageWidth-${product.barcode}`}>
                            {
                                <>
                                    <b> {translations?.widthTranslation}: </b>
                                    <span>{product.packageWidth}</span>
                                </>
                            }
                        </li>
                        <li key={`packageHeight-${product.barcode}`}>
                            {
                                <>
                                    <b> {translations?.heightTranslation}: </b>
                                    <span>{product.packageHeight}</span>
                                </>
                            }
                        </li>
                        <li key={`packageWeightTranslation-${product.barcode}`}>
                            {
                                <>
                                    <b> {translations?.packageWeightTranslation}: </b>
                                    <span>{product.packageWeight}</span>
                                </>
                            }
                        </li>
                        <li key={`boxWeightTranslation-${product.name}`}>
                            {
                                <>
                                    <b> {translations?.boxWeightTranslation}: </b>
                                    <span>{product.weight}</span>
                                </>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Product;
