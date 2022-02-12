// react
import {
    FormEvent, Fragment, useRef, useState,
} from 'react';

// third-party
import classNames from 'classnames';
import Head from 'next/head';

// application
import { toast } from 'react-toastify';
import AppLink from '../shared/AppLink';
import AsyncAction from '../shared/AsyncAction';
import Cross12Svg from '../../svg/cross-12.svg';
import CurrencyFormat from '../shared/CurrencyFormat';
import InputNumber from '../shared/InputNumber';
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';
import { CartItem } from '../../store/cart/cartTypes';

import {
    useCart, useCartApplyCoupon, useCartRemoveItem, useCartUpdateQuantities,
} from '../../store/cart/cartHooks';

export interface Quantity {
    itemId: number;
    value: string | number;
}

function ShopPageCart() {
    const [quantities, setQuantities] = useState<Quantity[]>([]);
    const cart = useCart();
    const cartRemoveItem = useCartRemoveItem();
    const cartUpdateQuantities = useCartUpdateQuantities();
    const updateQuantities = () => cartUpdateQuantities(
        quantities.map((x) => ({
            ...x,
            value: typeof x.value === 'string' ? parseFloat(x.value) : x.value,
        })),
    );
    const cartNeedUpdate = () => quantities.filter((x) => {
        const item = cart.items.find((item) => item.id === x.itemId);

        return item && item.quantity !== x.value && x.value !== '';
    }).length > 0;

    const getItemQuantity = (item: CartItem) => {
        const quantity = quantities.find((x) => x.itemId === item.id);

        return quantity ? quantity.value : item.quantity;
    };

    const handleChangeQuantity = (item: CartItem, quantity: string | number) => {
        setQuantities((prevState) => {
            const index = prevState.findIndex((x) => x.itemId === item.id);

            if (index === -1) {
                return [
                    ...prevState,
                    {
                        itemId: item.id,
                        value: quantity,
                    },
                ];
            }

            return [
                ...prevState.slice(0, index),
                {
                    ...prevState[index],
                    value: quantity,
                },
                ...prevState.slice(index + 1),
            ];
        });
    };

    const breadcrumb = [
        { title: 'الرئيسية', url: '' },
        { title: 'سلة التسوق', url: '' },
    ];

    let content;

    if (cart.quantity) {
        const cartItems = cart.items.map((item) => {
            let options;

            const image = (
                <div className="product-image">
                    <div className="product-image__body">
                        <img
                            className="product-image__img"
                            src={`${item.product?.imageUrl}`}
                            onError={({ currentTarget }) => {
                                // eslint-disable-next-line no-param-reassign
                                currentTarget.src = '/images/products/defaultImage.png';
                            }}
                            alt={item.product.name}
                        />
                    </div>
                </div>
            );

            if (item.options.length > 0) {
                options = (
                    <ul className="cart-table__options">
                        {item.options.map((option, index) => (
                            <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
                        ))}
                    </ul>
                );
            }

            const removeButton = (
                <AsyncAction
                    action={() => cartRemoveItem(item.id)}
                    render={({ run, loading }) => {
                        const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                            'btn-loading': loading,
                        });

                        return (
                            <button type="button" onClick={run} className={classes}>
                                <Cross12Svg />
                            </button>
                        );
                    }}
                />
            );

            return (
                <tr key={item.id} className="cart-table__row">
                    <td className="cart-table__column cart-table__column--image">{image}</td>
                    <td className="cart-table__column cart-table__column--product">
                        <div className="cart-table__product-name">{item.product.name}</div>
                        {options}
                    </td>
                    {/*
                    <td className="cart-table__column cart-table__column--price" data-title="العرض">
                        <CurrencyFormat value={item.product?.offerPrice || 0} />
                    </td> */}
                    <td className="cart-table__column cart-table__column--price" data-title="السعر">
                        <CurrencyFormat value={item.price} />
                    </td>
                    <td className="cart-table__column cart-table__column--quantity" data-title="الكمية">
                        <InputNumber
                            onChange={(quantity) => handleChangeQuantity(item, quantity)}
                            value={getItemQuantity(item)}
                            min={1}
                        />
                    </td>
                    <td className="cart-table__column cart-table__column--total" data-title="المجموع">
                        <CurrencyFormat value={item.total} />
                    </td>
                    <td className="cart-table__column cart-table__column--remove">{removeButton}</td>
                </tr>
            );
        });

        const cartTotals = cart.totals.length > 0 && (
            <Fragment>
                <thead className="cart__totals-header">
                    <tr>
                        <th>المجموع</th>
                        <td>
                            <CurrencyFormat value={cart.subtotal} />
                        </td>
                    </tr>
                </thead>
                <tbody className="cart__totals-body">
                    {cart.totals.map((extraLine, index) => {
                        let calcShippingLink;

                        if (extraLine.type === 'shipping') {
                            calcShippingLink = (
                                <div className="cart__calc-shipping">
                                    حسب المنطقة والوقت
                                    {/* <AppLink href="/">Calculate Shipping</AppLink> */}
                                </div>
                            );
                        }

                        return (
                            <tr key={index}>
                                <th>{extraLine.title}</th>
                                <td>
                                    <CurrencyFormat value={extraLine.price} />
                                    {calcShippingLink}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Fragment>
        );

        const updateCartButton = (
            <AsyncAction
                action={() => updateQuantities()}
                render={({ run, loading }) => {
                    const classes = classNames('btn btn-primary cart__update-button', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes} disabled={!cartNeedUpdate()}>
                            تعديل السلة
                        </button>
                    );
                }}
            />
        );

        content = (
            <div className="cart block">
                <div className="container">
                    <table className="cart__table cart-table">
                        <thead className="cart-table__head">
                            <tr className="cart-table__row">
                                <th className="cart-table__column cart-table__column--image">الصورة</th>
                                <th className="cart-table__column cart-table__column--product">المنتج</th>
                                <th className="cart-table__column cart-table__column--price">السعر</th>
                                <th className="cart-table__column cart-table__column--quantity">الكمية</th>
                                <th className="cart-table__column cart-table__column--total">المجموع</th>
                                <th className="cart-table__column cart-table__column--remove" aria-label="Remove" />
                            </tr>
                        </thead>
                        <tbody className="cart-table__body">{cartItems}</tbody>
                    </table>
                    <div className="cart__actions">
                        <div className="cart__buttons">
                            <AppLink href="/" className="btn btn-light">
                                أكمل التسوق
                            </AppLink>
                            {updateCartButton}
                        </div>
                    </div>

                    <div className="row justify-content-end pt-md-5 pt-4">
                        <div className="col-12 col-md-7 col-lg-6 col-xl-5">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">ملخص الدفع</h3>
                                    <table className="cart__totals">
                                        {cartTotals}
                                        <tfoot className="cart__totals-footer">
                                            <tr>
                                                <th>المبلغ الكلي</th>
                                                <td>
                                                    <CurrencyFormat value={cart.total} />
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <AppLink
                                        href={url.checkout()}
                                        className="btn btn-primary btn-xl btn-block cart__checkout-button"
                                    >
                                        تنفيذ الطلب
                                    </AppLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">السلة فارغة!</div>
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
                <title>سلة التسوق</title>
            </Head>

            <PageHeader header="سلة التسوق" breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageCart;
