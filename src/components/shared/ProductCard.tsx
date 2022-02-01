// react
import { Fragment, memo } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from './AppLink';
import AsyncAction from './AsyncAction';
// import Compare16Svg from '../../svg/compare-16.svg';
import CurrencyFormat from './CurrencyFormat';
// import Quickview16Svg from '../../svg/quickview-16.svg';
// import Rating from './Rating';
import url from '../../services/url';
import Wishlist16Svg from '../../svg/wishlist-16.svg';
// import { IProduct } from '../../interfaces/product-old';
import { useCompareAddItem } from '../../store/compare/compareHooks';
import { useQuickviewOpen } from '../../store/quickview/quickviewHooks';
import { useWishlistAddItem } from '../../store/wishlist/wishlistHooks';
import { useCartAddItem } from '../../store/cart/cartHooks';
import { IProduct } from '../../interfaces/product';
import { useAccount } from '../../store/account/accountHooks';

export type ProductCardLayout = 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal';

export interface ProductCardProps {
    product: IProduct;
    layout?: ProductCardLayout;
}

function ProductCard(props: ProductCardProps) {
    const { product, layout } = props;
    const containerClasses = classNames('product-card', {
        'product-card--layout--grid product-card--size--sm': layout === 'grid-sm',
        'product-card--layout--grid product-card--size--nl': layout === 'grid-nl',
        'product-card--layout--grid product-card--size--lg': layout === 'grid-lg',
        'product-card--layout--list': layout === 'list',
        'product-card--layout--horizontal': layout === 'horizontal',
    });
    const cartAddItem = useCartAddItem();
    const wishlistAddItem = useWishlistAddItem();
    // const compareAddItem = useCompareAddItem();
    // const quickviewOpen = useQuickviewOpen();
    const account = useAccount();
    const badges = [];
    let image;
    let price;
    // let features;

    if (product.isOffer) {
        badges.push(
            <div key="sale" className="product-card__badge product-card__badge--sale">
                عرض
            </div>,
        );
    }
    // if (product.badges.includes('hot')) {
    //     badges.push(<div key="hot" className="product-card__badge product-card__badge--hot">Hot</div>);
    // }
    // if (product.badges.includes('new')) {
    //     badges.push(<div key="new" className="product-card__badge product-card__badge--new">New</div>);
    // }

    // if (product.images && product.images.length > 0) {
    image = (
        <div className="product-card__image product-image">
            <div className="product-image__body">
                <img
                    className="product-image__img"
                    src={`${product?.imageUrl}`}
                    onError={({ currentTarget }) => {
                        currentTarget.src = '/images/products/defaultImage.png';
                    }}
                    alt={product.name}
                />
            </div>
        </div>
    );
    // }

    if (product.isOffer && product.offerType === 2) {
        price = (
            <div className="product-card__prices">
                <span className="product-card__new-price">
                    <CurrencyFormat value={product.offerPrice} />
                </span>
                {' '}
                <span className="product-card__old-price">
                    <CurrencyFormat value={product.price} />
                </span>
            </div>
        );
    } else {
        price = (
            <div className="product-card__prices">
                <CurrencyFormat value={product.price} />
            </div>
        );
    }
    if (!product?.isStockAvailable) {
        return null;
    }

    return (
        <div className={containerClasses}>
            {badges.length > 0 && <div className="product-card__badges-list">{badges}</div>}
            {image}
            <div className="product-card__info">
                <div className="product-card__name">
                    <div>{product.name}</div>
                </div>
                {product.isOffer && product.offerType === 3 && (
                    <div className="product-card__rating">
                        <div className="product-card__offer-price">
                            {`إشتري ${product.offerQuantity || 0} حبات بـ ${
                                product.offerPrice || 0
                            } دينار`}

                        </div>
                    </div>
                )}
            </div>
            <div className="product-card__actions">
                <div className="product-card__availability">
                    الحالة:
                    <span className="text-success">{`${product.isStockAvailable ? ' متوفر ' : ' غير متوفر '}`}</span>
                </div>
                {price}
                <div className="product-card__buttons">
                    <AsyncAction
                        action={() => cartAddItem(product)}
                        render={({ run, loading }) => (
                            <Fragment>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames('btn btn-primary product-card__addtocart', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    أضف للسلة
                                </button>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames(
                                        'btn btn-secondary product-card__addtocart product-card__addtocart--list',
                                        {
                                            'btn-loading': loading,
                                        },
                                    )}
                                >
                                    أضف للسلة
                                </button>
                            </Fragment>
                        )}
                    />
                    { account.isLoggedIn && (
                        <AsyncAction
                            action={() => wishlistAddItem(product)}
                            render={({ run, loading }) => (
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames(
                                        'btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist',
                                        {
                                            'btn-loading': loading,
                                        },
                                    )}
                                >
                                    <Wishlist16Svg />
                                </button>
                            )}
                        />
                    )}
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

export default memo(ProductCard);
