// react
import { Fragment } from 'react';

// third-party
import classNames from 'classnames';
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import AsyncAction, { RenderFn } from '../shared/AsyncAction';
import Cross12Svg from '../../svg/cross-12.svg';
import CurrencyFormat from '../shared/CurrencyFormat';
import PageHeader from '../shared/PageHeader';
import Rating from '../shared/Rating';
import url from '../../services/url';
import { useWishlist, useWishlistRemoveItem } from '../../store/wishlist/wishlistHooks';

// data stubs
import theme from '../../data/theme';
import { useCartAddItem } from '../../store/cart/cartHooks';

function ShopPageWishlist() {
    const { items } = useWishlist();
    const wishlistRemoveItem = useWishlistRemoveItem();
    const cartAddItem = useCartAddItem();
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Wishlist', url: '' },
    ];

    let content;

    if (items.length) {
        const itemsList = items.map((item) => {
            let image;

            image = (
                <div className="product-image">
                    <div className="product-image__body">
                        <img
                            className="product-image__img"
                            src={item.imageUrl}
                            onError={({ currentTarget }) => {
                                currentTarget.src = 'http://localhost:3000/images/products/defaultImage.png';
                            }}
                            alt={item.name}
                        />
                    </div>
                </div>
            );


            const renderAddToCarButton: RenderFn = ({ run, loading }) => {
                const classes = classNames('btn btn-primary btn-sm', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>Add To Cart</button>;
            };

            const renderRemoveButton: RenderFn = ({ run, loading }) => {
                const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes} aria-label="Remove"><Cross12Svg /></button>;
            };

            return (
                <tr key={item.id} className="wishlist__row">
                    <td className="wishlist__column wishlist__column--image">
                        {image}
                    </td>
                    <td className="wishlist__column wishlist__column--product">
                        {/* <AppLink href={url.product(item)} className="wishlist__product-name"> */}
                            {item.name}
                        {/* </AppLink> */}
                        {/* <div className="wishlist__product-rating">
                            <Rating value={item.rating} />
                            <div className="wishlist__product-rating-legend">{`${item.reviews} Reviews`}</div>
                        </div> */}
                    </td>
                    <td className="wishlist__column wishlist__column--stock">
                        <div className="badge badge-success">In Stock</div>
                    </td>
                    <td className="wishlist__column wishlist__column--price"><CurrencyFormat value={item.price} /></td>
                    <td className="wishlist__column wishlist__column--tocart">
                        <AsyncAction
                            action={() => cartAddItem(item)}
                            render={renderAddToCarButton}
                        />
                    </td>
                    <td className="wishlist__column wishlist__column--remove">
                        <AsyncAction
                            action={() => wishlistRemoveItem(item.id)}
                            render={renderRemoveButton}
                        />
                    </td>
                </tr>
            );
        });

        content = (
            <div className="block">
                <div className="container">
                    <table className="wishlist">
                        <thead className="wishlist__head">
                            <tr className="wishlist__row">
                                <th className="wishlist__column wishlist__column--image">Image</th>
                                <th className="wishlist__column wishlist__column--product">Product</th>
                                <th className="wishlist__column wishlist__column--stock">Stock Status</th>
                                <th className="wishlist__column wishlist__column--price">Price</th>
                                <th className="wishlist__column wishlist__column--tocart" aria-label="Add to cart" />
                                <th className="wishlist__column wishlist__column--remove" aria-label="Remove" />
                            </tr>
                        </thead>
                        <tbody className="wishlist__body">
                            {itemsList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">Your wish list is empty!</div>
                        <div className="block-empty__actions">
                            <AppLink href="/" className="btn btn-primary btn-sm">
                                Continue
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{`Wish List — ${theme.name}`}</title>
            </Head>

            <PageHeader header="Wishlist" breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageWishlist;
