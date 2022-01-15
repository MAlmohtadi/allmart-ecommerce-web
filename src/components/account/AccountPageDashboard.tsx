// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import CurrencyFormat from '../shared/CurrencyFormat';
import url from '../../services/url';

// data stubs
import dataAccountAddresses from '../../data/accountAddresses';
import dataAccountOrders from '../../data/accountOrders';
import theme from '../../data/theme';

export default function AccountPageDashboard() {
    const address = dataAccountAddresses[0];
    const orders = dataAccountOrders.slice(0, 3).map((order) => (
        <tr key={order.id}>
            <td>
                <AppLink href={url.accountOrder({ id: 5 })}>
                    #
                    {order.id}
                </AppLink>
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
        <div className="dashboard">
            <Head>
                <title>{`My Account — ${theme.name}`}</title>
            </Head>

            <div className="dashboard__profile card profile-card">
                <div className="card-body profile-card__body">
                    <div className="profile-card__avatar">
                        <img src="/images/avatars/avatar-3.jpg" alt="" />
                    </div>
                    <div className="profile-card__name">Helena Garcia</div>
                    <div className="profile-card__email">stroyka@example.com</div>
                    <div className="profile-card__edit">
                        <AppLink href={url.accountProfile()} className="btn btn-secondary btn-sm">
                            Edit Profile
                        </AppLink>
                    </div>
                </div>
            </div>
            <div className="dashboard__address card address-card address-card--featured">
                {address.default && <div className="address-card__badge">Default Address</div>}
                <div className="address-card__body">
                    <div className="address-card__name">{`${address.firstName} ${address.lastName}`}</div>
                    <div className="address-card__row">
                        {address.country}
                        <br />
                        {address.postcode}
                        ,
                        {address.city}
                        <br />
                        {address.address}
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">Phone Number</div>
                        <div className="address-card__row-content">{address.phone}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">Email Address</div>
                        <div className="address-card__row-content">{address.email}</div>
                    </div>
                    <div className="address-card__footer">
                        <AppLink href={url.accountAddress({ id: 5 })}>Edit Address</AppLink>
                    </div>
                </div>
            </div>
            <div className="dashboard__orders card">
                <div className="card-header">
                    <h5>Recent Orders</h5>
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
                                {orders}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
