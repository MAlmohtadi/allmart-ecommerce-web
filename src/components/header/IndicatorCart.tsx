// react
import { Fragment } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import AsyncAction from '../shared/AsyncAction';
import Cart20Svg from '../../svg/cart-20.svg';
import Cross10Svg from '../../svg/cross-10.svg';
import CurrencyFormat from '../shared/CurrencyFormat';
import Indicator from './Indicator';
import url from '../../services/url';
import { useCart, useCartRemoveItem } from '../../store/cart/cartHooks';

function IndicatorCart() {
    const cart = useCart();
    const cartRemoveItem = useCartRemoveItem();
    let dropdown;
    let totals;

    if (cart.totals.length > 0) {
        totals = cart.totals.map((total, index) => (
            <tr key={index}>
                <th>{total.title}</th>
                <td><CurrencyFormat value={total.price} /></td>
            </tr>
        ));

        totals = (
            <Fragment>
                <tr>
                    <th>Subtotal</th>
                    <td><CurrencyFormat value={cart.subtotal} /></td>
                </tr>
                {totals}
            </Fragment>
        );
    }

    const items = cart.items.map((item) => {
        let options;
        let image;

        if (item.options) {
            options = (
                <ul className="dropcart__product-options">
                    {item.options.map((option, index) => (
                        <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
                    ))}
                </ul>
            );
        }

        image = (
            <div className="product-image dropcart__product-image">
                <div className="product-image__body">
                    <img
                        className="product-image__img"
                        src={item.product?.imageUrl}
                        onError={({ currentTarget }) => {
                            currentTarget.src = 'http://localhost:3000/images/products/defaultImage.png';
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
                    const classes = classNames('dropcart__product-remove btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes}>
                            <Cross10Svg />
                        </button>
                    );
                }}
            />
        );

        return (
            <div key={item.id} className="dropcart__product">
                {image}
                <div className="dropcart__product-info">
                    <div className="dropcart__product-name">
                        {item.product.name}
                    </div>
                    {options}
                    <div className="dropcart__product-meta">
                        <span className="dropcart__product-quantity">{item.quantity}</span>
                        {' × '}
                        <span className="dropcart__product-price"><CurrencyFormat value={item.price} /></span>
                    </div>
                </div>
                {removeButton}
            </div>
        );
    });

    if (cart.quantity) {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__products-list">
                    {items}
                </div>

                <div className="dropcart__totals">
                    <table>
                        <tbody>
                            {totals}
                            <tr>
                                <th>Total</th>
                                <td><CurrencyFormat value={cart.total} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="dropcart__buttons">
                    <AppLink href={url.cart()} className="btn btn-secondary">View Cart</AppLink>
                    <AppLink href={url.checkout()} className="btn btn-primary">Checkout</AppLink>
                </div>
            </div>
        );
    } else {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__empty">
                    Your shopping cart is empty!
                </div>
            </div>
        );
    }

    return (
        <Indicator url="/shop/cart" dropdown={dropdown} value={cart.quantity} icon={<Cart20Svg />} />
    );
}

export default IndicatorCart;
