// react
import { Fragment } from 'react';

// third-party
import classNames from 'classnames';
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import AsyncAction, { RenderFn } from '../shared/AsyncAction';
import CurrencyFormat from '../shared/CurrencyFormat';
import PageHeader from '../shared/PageHeader';
import Rating from '../shared/Rating';
import url from '../../services/url';
import { useCompare, useCompareRemoveItem } from '../../store/compare/compareHooks';

// data stubs
import theme from '../../data/theme';
import { useCartAddItem } from '../../store/cart/cartHooks';

function ShopPageCompare() {
    const { items } = useCompare();
    const cartAddItem = useCartAddItem();
    const compareRemoveItem = useCompareRemoveItem();
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Comparison', url: '' },
    ];

    let content;

    if (items.length) {
        const attributes: {
            name: string;
            values: {[productId: number]: string};
        }[] = [];

        items.forEach((product) => product.attributes.forEach((productAttribute) => {
            let attribute = attributes.find((x) => x.name === productAttribute.name);

            if (!attribute) {
                attribute = {
                    name: productAttribute.name,
                    values: {},
                };
                attributes.push(attribute);
            }

            attribute.values[product.id] = productAttribute.values.map((x) => x.name).join(', ');
        }));

        const productInfoRow = items.map((product) => {
            let image;

            if (product.images.length > 0) {
                image = (
                    <div className="compare-table__product-image product-image">
                        <div className="product-image__body">
                            <img className="product-image__img" src={`${product.images[0]}`} alt="" />
                        </div>
                    </div>
                );
            }

            return (
                <td key={product.id}>
                    <AppLink href={url.product(product)} className="compare-table__product-link">
                        {image}
                        <div className="compare-table__product-name">{product.name}</div>
                    </AppLink>
                </td>
            );
        });

        const availabilityRow = items.map((product) => {
            let badge;

            if (product.availability === 'in-stock') {
                badge = <span className="compare-table__product-badge badge badge-success">In Stock</span>;
            }

            return <td key={product.id}>{badge}</td>;
        });

        const priceRow = items.map((product) => (
            <td key={product.id}>
                <CurrencyFormat value={product.price} />
            </td>
        ));

        const addToCartRow = items.map((product) => {
            const renderButton: RenderFn = ({ run, loading }) => {
                const classes = classNames('btn btn-primary', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>Add To Cart</button>;
            };

            return (
                <td key={product.id}>
                    <AsyncAction
                        action={() => cartAddItem(product)}
                        render={renderButton}
                    />
                </td>
            );
        });

        const attributeRows = attributes.map((feature, index) => {
            const rows = items.map((product) => (
                <td key={product.id}>{feature.values[product.id]}</td>
            ));

            return (
                <tr key={index}>
                    <th>{feature.name}</th>
                    {rows}
                </tr>
            );
        });

        const removeRow = items.map((product) => {
            const renderButton: RenderFn = ({ run, loading }) => {
                const classes = classNames('btn btn-secondary btn-sm', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>Remove</button>;
            };

            return (
                <td key={product.id}>
                    <AsyncAction
                        action={() => compareRemoveItem(product.id)}
                        render={renderButton}
                    />
                </td>
            );
        });

        content = (
            <div className="block">
                <div className="container">
                    <div className="table-responsive">
                        <table className="compare-table">
                            <tbody>
                                <tr>
                                    <th>المنتج</th>
                                    {productInfoRow}
                                </tr>
                                <tr>
                                    <th>الحالة</th>
                                    {availabilityRow}
                                </tr>
                                <tr>
                                    <th>السعر</th>
                                    {priceRow}
                                </tr>
                                <tr>
                                    <th>إضافة للسلة</th>
                                    {addToCartRow}
                                </tr>
                                {attributeRows}
                                <tr>
                                    <th aria-label="Remove" />
                                    {removeRow}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">You have not chosen any products to compare!</div>
                        <div className="block-empty__actions">
                            <AppLink href="/" className="btn btn-primary btn-sm">Continue</AppLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{`Compare Products Page — ${theme.name}`}</title>
            </Head>

            <PageHeader header="Comparison" breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageCompare;
