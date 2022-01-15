// react
import { useState } from 'react';

// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import CurrencyFormat from '../shared/CurrencyFormat';
import Pagination from '../shared/Pagination';
import url from '../../services/url';

// data stubs
import dataAccountOrders from '../../data/accountOrders';
import theme from '../../data/theme';

function AccountPageOrders() {
    const [page, setPage] = useState(1);

    const ordersList = dataAccountOrders.map((order) => (
        <tr key={order.id}>
            <td>
                <AppLink href={url.accountOrder(order)}>{`#${order.id}`}</AppLink>
            </td>
            <td>{order.date}</td>
            <td>{order.status}</td>
            <td>
                <CurrencyFormat value={order.total} />
                {' '}
                for
                {' '}
                {order.quantity}
                {' '}
                item(s)
            </td>
        </tr>
    ));

    return (
        <div className="card">
            <Head>
                <title>{`Order History — ${theme.name}`}</title>
            </Head>

            <div className="card-header">
                <h5>Order History</h5>
            </div>
            <div className="card-divider" />
            <div className="card-table">
                <div className="table-responsive-sm">
                    <table>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-divider" />
            <div className="card-footer">
                <Pagination current={page} total={3} onPageChange={setPage} />
            </div>
        </div>
    );
}

export default AccountPageOrders;
