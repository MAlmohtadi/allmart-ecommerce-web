// react
import { Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import url from '../../services/url';

// data stubs
import theme from '../../data/theme';

export default function AccountPageOrderDetails() {
    return (
        <Fragment>
            <Head>
                <title>{`Order Details — ${theme.name}`}</title>
            </Head>

            <div className="card">
                <div className="order-header">
                    <div className="order-header__actions">
                        <AppLink href={url.accountOrders()} className="btn btn-xs btn-secondary">
                            Back to list
                        </AppLink>
                    </div>
                    <h5 className="order-header__title">Order #3857</h5>
                    <div className="order-header__subtitle">
                        Was placed on
                        {' '}
                        <mark className="order-header__date">19 October, 2020</mark>
                        {' '}
                        and is currently
                        {' '}
                        <mark className="order-header__status">On hold</mark>
                        .
                    </div>
                </div>
                <div className="card-divider" />
                <div className="card-table">
                    <div className="table-responsive-sm">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                <tr>
                                    <td>Electric Planer Brandix KL370090G 300 Watts × 2</td>
                                    <td>$1,398.00</td>
                                </tr>
                                <tr>
                                    <td>Undefined Tool IRadix DPS3000SY 2700 watts × 1</td>
                                    <td>$849.00</td>
                                </tr>
                                <tr>
                                    <td>Brandix Router Power Tool 2017ERXPK × 3</td>
                                    <td>$3,630.00</td>
                                </tr>
                            </tbody>
                            <tbody className="card-table__body card-table__body--merge-rows">
                                <tr>
                                    <th>Subtotal</th>
                                    <td>$5,877.00</td>
                                </tr>
                                <tr>
                                    <th>Store Credit</th>
                                    <td>$-20.00</td>
                                </tr>
                                <tr>
                                    <th>Shipping</th>
                                    <td>$25.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <td>$5,882.00</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row mt-3 no-gutters mx-n2">
                <div className="col-sm-6 col-12 px-2">
                    <div className="card address-card address-card--featured">
                        <div className="address-card__body">
                            <div className="address-card__badge address-card__badge--muted">Shipping Address</div>
                            <div className="address-card__name">Helena Garcia</div>
                            <div className="address-card__row">
                                Random Federation
                                <br />
                                115302, Moscow
                                <br />
                                ul. Varshavskaya, 15-2-178
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">Phone Number</div>
                                <div className="address-card__row-content">38 972 588-42-36</div>
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">Email Address</div>
                                <div className="address-card__row-content">stroyka@example.com</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                    <div className="card address-card address-card--featured">
                        <div className="address-card__body">
                            <div className="address-card__badge address-card__badge--muted">Billing Address</div>
                            <div className="address-card__name">Helena Garcia</div>
                            <div className="address-card__row">
                                Random Federation
                                <br />
                                115302, Moscow
                                <br />
                                ul. Varshavskaya, 15-2-178
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">Phone Number</div>
                                <div className="address-card__row-content">38 972 588-42-36</div>
                            </div>
                            <div className="address-card__row">
                                <div className="address-card__row-title">Email Address</div>
                                <div className="address-card__row-content">stroyka@example.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
