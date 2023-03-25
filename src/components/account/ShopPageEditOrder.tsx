// react
import {
    Fragment, useState,
} from 'react';

// third-party
import classNames from 'classnames';
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import AsyncAction from '../shared/AsyncAction';
import Cross12Svg from '../../svg/cross-12.svg';
import CurrencyFormat from '../shared/CurrencyFormat';
import InputNumber from '../shared/InputNumber';
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';
import { CartItem } from '../../store/cart/cartTypes';

import {
    useOrder, useOrderRemoveItem, useOrderUpdateQuantities, useUpdateOrderProducts,
} from '../../store/order/orderHooks';

export interface Quantity {
    itemId: number;
    value: string | number;
}

function ShopPageEditOrder() {
    const [quantities, setQuantities] = useState<Quantity[]>([]);
    const orderState = useOrder();
    const cartRemoveItem = useOrderRemoveItem();
    const cartUpdateQuantities = useOrderUpdateQuantities();
    const orderUpdateProducts = useUpdateOrderProducts();
    const updateQuantities = () => cartUpdateQuantities(
        quantities.map((x) => ({
            ...x,
            value: typeof x.value === 'string' ? parseFloat(x.value) : x.value,
        })),
    );

    const cartNeedUpdate = () => quantities.filter((x) => {
        const item = orderState.items.find((item) => item.id === x.itemId);

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
        { title: 'حسابي', url: '/account/profile' },
        { title: 'الطلبات', url: '/account/orders' },
    ];

    let content;

    const cartItems = orderState.items.map((item) => {
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
                </td>
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

    const cartTotals = (
        <Fragment>
            <thead className="cart__totals-header">
                <tr>
                    <th>المجموع</th>
                    <td>
                        <CurrencyFormat value={orderState.subtotal} />
                    </td>
                </tr>
            </thead>
            <tbody className="cart__totals-body">
                {orderState.totals.map((extraLine, index) => (
                    <tr key={index}>
                        <th>{extraLine.title}</th>
                        <td>
                            <CurrencyFormat value={extraLine.price} />

                        </td>
                    </tr>
                ))}
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
                        تعديل الطلب
                    </button>
                );
            }}
        />
    );

    // eslint-disable-next-line prefer-const
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
                        <AppLink href={url.accountOrder(orderState.selectedOrder?.id || 0)} className="btn btn-light">
                            إلغاء
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
                                                <CurrencyFormat value={orderState.total} />
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <AsyncAction
                                    action={() => orderUpdateProducts()}
                                    render={({ run, loading }) => {
                                        const classes = classNames('btn btn-primary cart__update-button', {
                                            'btn-loading': loading,
                                        });

                                        return (
                                            <button type="button" onClick={run} className={classes} disabled={orderState.selectedOrder?.totalPrice === orderState.total}>
                                                تأكيد الطلب
                                            </button>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Fragment>
            <Head>
                <title>تعديل الطلب - خيرات اليوم</title>
            </Head>

            <PageHeader header="تعديل الطلب" breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageEditOrder;
