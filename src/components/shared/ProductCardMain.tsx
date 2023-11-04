// react
import { Fragment, memo } from "react";

// third-party
import classNames from "classnames";

// application
import AppLink from "./AppLink";
import AsyncAction from "./AsyncAction";
// import Compare16Svg from '../../svg/compare-16.svg';
// import CurrencyFormat from './CurrencyFormat';
import Quickview16Svg from "../../svg/quickview-16.svg";
// import Rating from './Rating';
import url from "../../services/url";
// import Wishlist16Svg from '../../svg/wishlist-16.svg';
// import { IProduct } from '../../interfaces/product';
// import { useCompareAddItem } from '../../store/compare/compareHooks';
import { useQuickviewOpen } from "../../store/quickview/quickviewHooks";
import { IProduct } from "../../interfaces/main";
// import { useWishlistAddItem } from '../../store/wishlist/wishlistHooks';
// import { useCartAddItem } from '../../store/cart/cartHooks';

export type ProductCardLayout = "grid-sm" | "grid-nl" | "grid-lg" | "list" | "horizontal";

export interface ProductCardProps {
    product: IProduct;
    layout?: ProductCardLayout;
}

function ProductCardMain(props: ProductCardProps) {
    const { product, layout } = props;
    const containerClasses = classNames("product-card", {
        "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
        "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
        "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
        "product-card--layout--list": layout === "list",
        "product-card--layout--horizontal": layout === "horizontal",
    });
    // const cartAddItem = useCartAddItem();
    // const wishlistAddItem = useWishlistAddItem();
    // const compareAddItem = useCompareAddItem();
    const quickviewOpen = useQuickviewOpen();
    let image;
    let features;

    if (product.imageUrl) {
        image = (
            <div className="product-card__image product-image">
                <AppLink className="product-image__body">
                    <img className="product-image__img" src={product.imageUrl} alt="" />
                </AppLink>
            </div>
        );
    }

    features = (
        <ul className="product-card__features-list">
            {/* {product.attributes.filter((x) => x.featured).map((attribute, index) => ( */}
            <li key={"barcode"}>Barcode: {product.barcode}</li>
            <li key={"packaging"}>packaging: {product.packaging}</li>
            <li key={"Voltage"}>Voltage: </li>
            <li key={"packageWidth"}>packageWidth: {product.packageWidth}</li>
            <li key={"packageHeight"}>packageHeight: {product.packageHeight}</li>
            <li key={"packageWeight"}>packageWeight: {product.packageWeight}</li>
            <li key={"weight"}>packageWeight: {product.weight}</li>
            {/* <li key={index}>{`${attribute.name}: ${attribute.values.map((x) => x.name).join(', ')}`}</li>
                    <li key={index}>{`${attribute.name}: ${attribute.values.map((x) => x.name).join(', ')}`}</li>
                    <li key={index}>{`${attribute.name}: ${attribute.values.map((x) => x.name).join(', ')}`}</li>
                    <li key={index}>{`${attribute.name}: ${attribute.values.map((x) => x.name).join(', ')}`}</li> */}
            {/* ))} */}
        </ul>
    );

    return (
        <div className={containerClasses}>
            {/* <AsyncAction
                action={() => quickviewOpen(product)}
                render={({ run, loading }) => (
                    <button
                        type="button"
                        onClick={run}
                        className={classNames("product-card__quickview", {
                            "product-card__quickview--preload": loading,
                        })}
                    >
                         <Quickview16Svg /> 
                    </button>
                )}
            /> */}
            {/* {badges.length > 0 && (
                <div className="product-card__badges-list">{badges}</div>
            )} */}
            {image}
            <div className="product-card__info">
                <div className="product-card__name">
                    <AppLink>{product.name}</AppLink>
                </div>
                {/* <div className="product-card__rating">
                    <Rating value={product.rating} />
                    <div className=" product-card__rating-legend">{`${product.reviews} Reviews`}</div>
                </div> */}
                {features}
            </div>
            <div className="product-card__actions">
                {/* <div className="product-card__availability">
                    Availability:
                    <span className="text-success">In Stock</span>
                </div>
                {price} */}
                <div className="product-card__buttons">
                    <AsyncAction
                        action={() => quickviewOpen(product)}
                        render={({ run, loading }) => (
                            <Fragment>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames("btn btn-primary product-card__addtocart", {
                                        "btn-loading": loading,
                                    })}
                                >
                                    Details
                                </button>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames(
                                        "btn btn-secondary product-card__addtocart product-card__addtocart--list",
                                        {
                                            "btn-loading": loading,
                                        }
                                    )}
                                >
                                    Details
                                </button>
                            </Fragment>
                        )}
                    />

                    {/* <AsyncAction
                        action={() => compareAddItem(product)}
                        render={({ run, loading }) => (
                            <button
                                type="button"
                                onClick={run}
                                className={classNames('btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare', {
                                    'btn-loading': loading,
                                })}
                            >
                                <Compare16Svg />
                            </button>
                        )}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default memo(ProductCardMain);
