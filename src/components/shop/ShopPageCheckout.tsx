// react
import {
    Fragment,
    ChangeEvent,
    useEffect,
    useState,
} from 'react';

// third-party
import Head from 'next/head';
import { useRouter } from 'next/router';

// application
import AppLink from '../shared/AppLink';
import Check9x7Svg from '../../svg/check-9x7.svg';
import Collapse, { CollapseRenderFn } from '../shared/Collapse';
import CurrencyFormat from '../shared/CurrencyFormat';
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';

// data stubs
import dataShopPayments from '../../data/shopPayments';
import theme from '../../data/theme';
import { useCart } from '../../store/cart/cartHooks';

export type RenderPaymentFn = CollapseRenderFn<HTMLLIElement, HTMLDivElement>;

function ShopPageCheckout() {
    const router = useRouter();
    const cart = useCart();
    const [currentPayment, setCurrentPayment] = useState('bank');

    const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setCurrentPayment(event.target.value);
        }
    };

    useEffect(() => {
        if (cart.stateFrom === 'client' && cart.items.length < 1) {
            const linkProps = url.cart();

            router.replace(linkProps.href, linkProps.as).then();
        }
    }, [cart.stateFrom, cart.items.length, router]);

    if (cart.items.length < 1) {
        return null;
    }

    const totals = cart.totals.map((total, index) => (
        <tr key={index}>
            <th>{total.title}</th>
            <td><CurrencyFormat value={total.price} /></td>
        </tr>
    ));

    const cartItems = cart.items.map((item) => (
        <tr key={item.id}>
            <td>{`${item.product.name} × ${item.quantity}`}</td>
            <td><CurrencyFormat value={item.total} /></td>
        </tr>
    ));

    const cartTable = (
        <table className="checkout__totals">
            <thead className="checkout__totals-header">
                <tr>
                    <th>Product</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody className="checkout__totals-products">
                {cartItems}
            </tbody>
            {totals.length > 0 && (
                <tbody className="checkout__totals-subtotals">
                    <tr>
                        <th>Subtotal</th>
                        <td><CurrencyFormat value={cart.subtotal} /></td>
                    </tr>
                    {totals}
                </tbody>
            )}
            <tfoot className="checkout__totals-footer">
                <tr>
                    <th>Total</th>
                    <td><CurrencyFormat value={cart.total} /></td>
                </tr>
            </tfoot>
        </table>
    );

    const payments = dataShopPayments.map((payment) => {
        const renderPayment: RenderPaymentFn = ({ setItemRef, setContentRef }) => (
            <li className="payment-methods__item" ref={setItemRef}>
                <label className="payment-methods__item-header">
                    <span className="payment-methods__item-radio input-radio">
                        <span className="input-radio__body">
                            <input
                                type="radio"
                                className="input-radio__input"
                                name="checkout_payment_method"
                                value={payment.key}
                                checked={currentPayment === payment.key}
                                onChange={handlePaymentChange}
                            />
                            <span className="input-radio__circle" />
                        </span>
                    </span>
                    <span className="payment-methods__item-title">{payment.title}</span>
                </label>
                <div className="payment-methods__item-container" ref={setContentRef}>
                    <div className="payment-methods__item-description text-muted">{payment.description}</div>
                </div>
            </li>
        );

        return (
            <Collapse
                key={payment.key}
                open={currentPayment === payment.key}
                toggleClass="payment-methods__item--active"
                render={renderPayment}
            />
        );
    });

    const breadcrumb = [
        { title: 'Home', url: url.home() },
        { title: 'Shopping Cart', url: url.cart() },
        { title: 'Checkout', url: '' },
    ];

    return (
        <Fragment>
            <Head>
                <title>{`Checkout — ${theme.name}`}</title>
            </Head>

            <PageHeader header="Checkout" breadcrumb={breadcrumb} />

            <div className="checkout block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="alert alert-primary alert-lg">
                                Returning customer?
                                {' '}
                                <AppLink href={url.accountSignIn()}>
                                    Click here to login
                                </AppLink>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 col-xl-7">
                            <div className="card mb-lg-0">
                                <div className="card-body">
                                    <h3 className="card-title">Billing details</h3>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="checkout-first-name">First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="checkout-first-name"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="checkout-last-name">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="checkout-last-name"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="checkout-company-name">
                                            Company Name
                                            {' '}
                                            <span className="text-muted">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="checkout-company-name"
                                            placeholder="Company Name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="checkout-country">Country</label>
                                        <select id="checkout-country" className="form-control">
                                            <option>Select a country...</option>
                                            <option>United States</option>
                                            <option>Russia</option>
                                            <option>Italy</option>
                                            <option>France</option>
                                            <option>Ukraine</option>
                                            <option>Germany</option>
                                            <option>Australia</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="checkout-street-address">Street Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="checkout-street-address"
                                            placeholder="Street Address"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="checkout-address">
                                            Apartment, suite, unit etc.
                                            {' '}
                                            <span className="text-muted">(Optional)</span>
                                        </label>
                                        <input type="text" className="form-control" id="checkout-address" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="checkout-city">Town / City</label>
                                        <input type="text" className="form-control" id="checkout-city" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="checkout-state">State / County</label>
                                        <input type="text" className="form-control" id="checkout-state" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="checkout-postcode">Postcode / ZIP</label>
                                        <input type="text" className="form-control" id="checkout-postcode" />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="checkout-email">Email address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="checkout-email"
                                                placeholder="Email address"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="checkout-phone">Phone</label>
                                            <input type="text" className="form-control" id="checkout-phone" placeholder="Phone" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="form-check">
                                            <span className="form-check-input input-check">
                                                <span className="input-check__body">
                                                    <input className="input-check__input" type="checkbox" id="checkout-create-account" />
                                                    <span className="input-check__box" />
                                                    <Check9x7Svg className="input-check__icon" />
                                                </span>
                                            </span>
                                            <label className="form-check-label" htmlFor="checkout-create-account">
                                                Create an account?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-divider" />
                                <div className="card-body">
                                    <h3 className="card-title">Shipping Details</h3>

                                    <div className="form-group">
                                        <div className="form-check">
                                            <span className="form-check-input input-check">
                                                <span className="input-check__body">
                                                    <input className="input-check__input" type="checkbox" id="checkout-different-address" />
                                                    <span className="input-check__box" />
                                                    <Check9x7Svg className="input-check__icon" />
                                                </span>
                                            </span>
                                            <label className="form-check-label" htmlFor="checkout-different-address">
                                                Ship to a different address?
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="checkout-comment">
                                            Order notes
                                            {' '}
                                            <span className="text-muted">(Optional)</span>
                                        </label>
                                        <textarea id="checkout-comment" className="form-control" rows={4} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">Your Order</h3>

                                    {cartTable}

                                    <div className="payment-methods">
                                        <ul className="payment-methods__list">
                                            {payments}
                                        </ul>
                                    </div>

                                    <div className="checkout__agree form-group">
                                        <div className="form-check">
                                            <span className="form-check-input input-check">
                                                <span className="input-check__body">
                                                    <input className="input-check__input" type="checkbox" id="checkout-terms" />
                                                    <span className="input-check__box" />
                                                    <Check9x7Svg className="input-check__icon" />
                                                </span>
                                            </span>
                                            <label className="form-check-label" htmlFor="checkout-terms">
                                                I have read and agree to the website
                                                <AppLink href={url.terms()}>
                                                    terms and conditions
                                                </AppLink>
                                                *
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-xl btn-block">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ShopPageCheckout;
