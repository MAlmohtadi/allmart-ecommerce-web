// react
import { Fragment, memo } from 'react';

// third-party
import classNames from 'classnames';

// application
import AsyncAction from './AsyncAction';
import CurrencyFormat from './CurrencyFormat';
import Wishlist16Svg from '../../svg/wishlist-16.svg';
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
    const account = useAccount();
    const badges = [];
    let image;
    let price;
    if (product.isOffer) {
        badges.push(
            <div key="sale" className="product-card__badge product-card__badge--sale">
                عرض
            </div>,
        );
    }
    // eslint-disable-next-line prefer-const
    image = (
        <div className="product-card__image product-image">
            <div className="product-image__body">
                <img
                    className="product-image__img"
                    src={`${product?.imageUrl}`}
                    onError={({ currentTarget }) => {
                        // eslint-disable-next-line no-param-reassign
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
                </div>
            </div>
        </div>
    );
}

export default memo(ProductCard);
