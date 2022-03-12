// react
import { Fragment, useState } from 'react';

// third-party
import Head from 'next/head';

// application
import moment from 'moment';
import AppLink from '../shared/AppLink';
import CurrencyFormat from '../shared/CurrencyFormat';
import Pagination from '../shared/Pagination';
import url from '../../services/url';

import { useOrder } from '../../store/order/orderHooks';
import BlockLoader from '../blocks/BlockLoader';
import { useAccount } from '../../store/account/accountHooks';

export const orderStatus = {
    1: {
        label: 'تم استلام الطلب',
    },
    2: {
        label: 'الطلب قيد التجهيز',
    },
    3: {
        label: 'الطلب قيد التوصيل',
    },
    4: {
        label: 'تم توصيل الطلب',
    },
    5: {
        label: 'تم إلغاء الطلب',
    },
};

function AccountPageOrders() {
    const [page, setPage] = useState(1);
    const orderState = useOrder();
    const account = useAccount();
    const limit = 5;
    const total = orderState.orders.length;
    const pages = Math.ceil(total / limit);
    const from = (page - 1) * limit + 1;
    const to = Math.max(Math.min(page * limit, total), from);
    const handlePageChange = (newPage: number) => {
        if (newPage <= pages) {
            setPage(newPage);
        }
    };
    const ordersList = orderState.orders.slice(from - 1, to).map((order) => {
        const date = moment(order.orderDate);
        // @ts-ignore
        const status = order.isCancelled ? orderStatus[5] : orderStatus[order.statusId];
        return (
            <tr key={order.id}>
                <td>
                    <AppLink href={url.accountOrder(order.id)}>{`#${order.id}`}</AppLink>
                </td>
                <td>
                    {date.format('l')}
                    {' '}
                    {date.format('LT')}
                </td>
                <td>{status.label}</td>
                <td>
                    <CurrencyFormat value={order.totalPrice} />
                </td>
            </tr>
        );
    });
    if (orderState.orderIsLoading && !orderState.orders) {
        return <BlockLoader />;
    }

    if (!account.isLoggedIn) {
        return (
            <Fragment>
                <Head>
                    <title>جميع الطلبات — جبران</title>
                </Head>

                <div className="block block-empty">
                    <div className="container">
                        <div className="block-empty__body">
                            <div className="block-empty__message">يجب عليك تسجيل الدخول !</div>
                            <div className="block-empty__actions">
                                <AppLink href="/account/login" className="btn btn-primary btn-sm">
                                    تسجيل الدخول
                                </AppLink>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
    return (
        <div className="card">
            <Head>
                <title>جميع الطلبات — جبران</title>
            </Head>

            <div className="card-header">
                <h5>جميع الطلبات</h5>
            </div>
            <div className="card-divider" />
            <div className="card-table">
                <div className="table-responsive-sm">
                    <table>
                        <thead>
                            <tr>
                                <th>الطلب</th>
                                <th>التاريخ</th>
                                <th>الحالة</th>
                                <th>المجموع</th>
                            </tr>
                        </thead>
                        <tbody>{ordersList}</tbody>
                    </table>
                </div>
            </div>
            <div className="card-divider" />
            <div className="card-footer">
                <Pagination current={page} total={pages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default AccountPageOrders;
