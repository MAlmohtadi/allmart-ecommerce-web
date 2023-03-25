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
import { useWishlist, useWishlistRemoveItem } from '../../store/wishlist/wishlistHooks';

// data stubs
import { useCartAddItem } from '../../store/cart/cartHooks';
import { useAccount } from '../../store/account/accountHooks';

function ShopPageWishlist() {
    const { items } = useWishlist();
    const wishlistRemoveItem = useWishlistRemoveItem();
    const cartAddItem = useCartAddItem();
    const breadcrumb = [
        { title: 'الرئيسية', url: '' },
        { title: 'المفضلة', url: '' },
    ];
    const account = useAccount();
    let content;
    if (!account.isLoggedIn) {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">
                            يجب عليك تسجيل الدخول
                            !
                        </div>
                        <div className="block-empty__actions">
                            <AppLink href="/account/login" className="btn btn-primary btn-sm">
                                تسجيل الدخول
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (items.length) {
        const itemsList = items.map((item) => {
            const image = (
                <div className="product-image">
                    <div className="product-image__body">
                        <img
                            className="product-image__img"
                            src={`${item.imageUrl}`}
                            onError={({ currentTarget }) => {
                                // eslint-disable-next-line no-param-reassign
                                currentTarget.src = '/images/products/defaultImage.png';
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

                return <button type="button" onClick={run} className={classes}>إضافة للسلة</button>;
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
                        {item.name}
                    </td>
                    <td className="wishlist__column wishlist__column--stock">
                        <div className="badge badge-success">{item.isStockAvailable ? ' متوفر ' : 'غير متوفر '}</div>
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
                                <th className="wishlist__column wishlist__column--image">الصورة</th>
                                <th className="wishlist__column wishlist__column--product">المنتج</th>
                                <th className="wishlist__column wishlist__column--stock">الحالة</th>
                                <th className="wishlist__column wishlist__column--price">السعر</th>
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
                        <div className="block-empty__message">لا يوجد منتجات مفضلة!</div>
                        <div className="block-empty__actions">
                            <AppLink href="/" className="btn btn-primary btn-sm">
                                أكمل التسوق
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
                <title>المفضلة - خيرات اليوم</title>
            </Head>

            <PageHeader header="المفضلة" breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageWishlist;
