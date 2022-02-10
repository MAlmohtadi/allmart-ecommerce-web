// react
import { Fragment, useEffect } from 'react';

// third-party
import Head from 'next/head';

// application
import { useRouter } from 'next/router';
import moment from 'moment';
import classNames from 'classnames';
import AppLink from '../shared/AppLink';
import url from '../../services/url';

// data stubs
import theme from '../../data/theme';
import { useAccount } from '../../store/account/accountHooks';
import { useCancelOrder, useOrder, useOrderProductsFetchData } from '../../store/order/orderHooks';
import { orderStatus } from './AccountPageOrders';
import { useDeferredData } from '../../services/hooks';
import shopApi from '../../api/shop';
import CurrencyFormat from '../shared/CurrencyFormat';
import AsyncAction from '../shared/AsyncAction';

export default function AccountPageOrderDetails() {
    const router = useRouter();
    const account = useAccount();
    const orderState = useOrder();
    const getOrderProducts = useOrderProductsFetchData();
    const orderDetails = orderState.orders.find((order) => router.query?.orderId == order.id);
    const status = orderDetails?.isCancelled ? orderStatus[5] : orderStatus[orderDetails?.statusId || 1];
    const cancelOrderAction = useCancelOrder();
    // const orderProducts = useDeferredData(() => (
    //     shopApi.getOrderProducts({ orderId: router.query?.orderId, userId: account.id })
    // ), []);
    const date = moment(orderDetails?.orderDate);
    useEffect(() => {
        if (router.query?.orderId && account.id) {
            getOrderProducts(router.query?.orderId);
        }
    }, [router.query, account.id]);
    return (
        <Fragment>
            <Head>
                <title>معلومات الطلب - جبران</title>
            </Head>

            <div className="card">
                <div className="order-header">
                    <div className="order-header__actions">
                        <AppLink href={url.accountOrders()} className="btn btn-xs btn-secondary">
                            العودة
                        </AppLink>
                    </div>
                    <h5 className="order-header__title">{`رقم الطلب #${router.query?.orderId}`}</h5>
                    <div className="order-header__subtitle">
                        تاريخ الطلب:
                        <mark className="order-header__date">
                            {date.format('l')}
                            {' '}
                            {date.format('LT')}
                        </mark>
                        الحالة:
                        <mark className="order-header__status">{status.label}</mark>
                        تاريخ التوصيل:
                        <mark className="order-header__date">{orderDetails?.deliveryDate}</mark>
                    </div>
                </div>
                <div className="card-divider" />
                <div className="card-table">
                    <div className="table-responsive-sm">
                        <table>
                            <thead>
                                <tr>
                                    <th>المنتج</th>
                                    <th>المجموع</th>
                                </tr>
                            </thead>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                {!orderState.productOrderIsLoading
                                    && orderState.productOrder.map((product) => (
                                        <tr id={product.name}>
                                            <td>{`${product.name} × ${product.quantity}`}</td>
                                            <td>
                                                <CurrencyFormat value={product.price || 0.0} />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                <tr>
                                    <th>التوصيل</th>
                                    <td>
                                        <CurrencyFormat value={orderDetails?.deliveryPrice || 0.0} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>الخصم</th>
                                    <td>
                                        <CurrencyFormat value={orderDetails?.couponDiscount || 0.0} />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>المجموع الكلي</th>
                                    <td>
                                        <CurrencyFormat value={orderDetails?.totalPrice || 0.0} />
                                    </td>
                                </tr>
                                {!orderDetails?.isCancelled && orderDetails?.statusId === 1 && (
                                    <tr>
                                        <th>
                                            <AppLink href={`/account/orders/${router.query?.orderId}/edit`} className="btn btn-primary">
                                                تعديل الطلب
                                            </AppLink>
                                        </th>
                                        <td>
                                            <AsyncAction
                                                action={() => cancelOrderAction(router.query?.orderId)}
                                                render={({ run, loading }) => {
                                                    const classes = classNames('btn btn-secondary cart__update-button', {
                                                        'btn-loading': loading,
                                                    });

                                                    return (
                                                        <button type="button" onClick={run} className={classes}>
                                                            إلغاء الطلب
                                                        </button>
                                                    );
                                                }}
                                            />

                                        </td>
                                    </tr>
                                )}
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
