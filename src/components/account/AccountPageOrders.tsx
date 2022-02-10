// react
import { useEffect, useState } from 'react';

// third-party
import Head from 'next/head';

// application
import moment from 'moment';
import AppLink from '../shared/AppLink';
import CurrencyFormat from '../shared/CurrencyFormat';
import Pagination from '../shared/Pagination';
import url from '../../services/url';

import { useOrder } from '../../store/order/orderHooks';
import { useAccount } from '../../store/account/accountHooks';
import { useDeferredData } from '../../services/hooks';
import shopApi from '../../api/shop';

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
    const orderState = useOrder();

    const ordersList = orderState.orders.map((order) => {
        const date = moment(order.orderDate);
        const status = order.isCancelled ? orderStatus[5] : orderStatus[order.statusId];
        return (
            <tr key={order.id}>
                <td>
                    <AppLink href={url.accountOrder(order)}>{`#${order.id}`}</AppLink>
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
            {/* <div className="card-footer">
                <Pagination current={page} total={3} onPageChange={setPage} />
            </div> */}
        </div>
    );
}

export default AccountPageOrders;
