// react
import { Fragment, useEffect } from 'react';

// third-party
import Head from 'next/head';

// application
import { useRouter } from 'next/router';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import AppLink from '../shared/AppLink';
import url from '../../services/url';

import { useAccount } from '../../store/account/accountHooks';
import { useCancelOrder, useOrder, useOrderProductsFetchData } from '../../store/order/orderHooks';
import { orderStatus } from './AccountPageOrders';
import CurrencyFormat from '../shared/CurrencyFormat';
import BlockLoader from '../blocks/BlockLoader';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function AccountPageOrderDetails() {
    const router = useRouter();
    const account = useAccount();
    const orderState = useOrder();
    const getOrderProducts = useOrderProductsFetchData();
    const orderDetails = orderState.selectedOrder;
    const statusId: number = orderDetails?.statusId || 1;
    // @ts-ignore: Unreachable code error
    const status = orderDetails?.isCancelled ? orderStatus[5] : orderStatus[statusId];
    const cancelOrderAction = useCancelOrder();
    const discount = orderState.totals.find((item) => item.type === 'discount')?.price;
    const date = moment(orderDetails?.orderDate);
    useEffect(() => {
        if (router.query?.orderId && account.id) {
            getOrderProducts(Number(router.query?.orderId));
        }
    }, [router.query, account.id]);

    const onCancel = () => confirmAlert({
        title: 'تأكيد إلغاء الطلب',
        message: 'هل انت متأكد من إلغاء طلبك.',
        buttons: [
            {
                label: 'نعم',
                onClick: () => cancelOrderAction(Number(router.query?.orderId)),
            },
            {
                label: 'لا',
                onClick: () => {},
            },
        ],
    });

    if (orderState.orderProductsIsLoading && !orderState.orderProducts) {
        return <BlockLoader />;
    }

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
                                {!orderState.orderProductsIsLoading
                                    && orderState.orderProducts.map((product) => (
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
                                        <CurrencyFormat value={discount || 0.0} />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>المجموع الكلي</th>
                                    <td>
                                        <CurrencyFormat value={orderState?.total || 0.0} />
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
                                            <button
                                                type="button"
                                                onClick={onCancel}
                                                className="btn btn-secondary cart__update-button"
                                            >
                                                إلغاء الطلب
                                            </button>
                                            {/* );
                                                }}
                                            /> */}

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
