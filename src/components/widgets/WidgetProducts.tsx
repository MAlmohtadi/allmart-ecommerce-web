// react
import { Fragment, ReactNode } from 'react';

// application
import AppLink from '../shared/AppLink';
import CurrencyFormat from '../shared/CurrencyFormat';
import url from '../../services/url';
import { IProduct } from '../../interfaces/product';

export interface WidgetProductsProps {
    title: ReactNode;
    products: IProduct[];
}

function WidgetProducts(props: WidgetProductsProps) {
    const { title, products = [] } = props;
    const productsList = products.map((product) => {
        let image;
        let price;

        if (product.images && product.images.length > 0) {
            image = (
                <div className="widget-products__image">
                    <div className="product-image">
                        <AppLink href={url.product(product)} className="product-image__body">
                            <img className="product-image__img" src={product.images[0]} alt="" />
                        </AppLink>
                    </div>
                </div>
            );
        }

        if (product.compareAtPrice) {
            price = (
                <Fragment>
                    <span className="widget-products__new-price"><CurrencyFormat value={product.price} /></span>
                    {' '}
                    <span className="widget-products__old-price"><CurrencyFormat value={product.compareAtPrice} /></span>
                </Fragment>
            );
        } else {
            price = <CurrencyFormat value={product.price} />;
        }

        return (
            <div key={product.id} className="widget-products__item">
                {image}
                <div className="widget-products__info">
                    <div className="widget-products__name">
                        <AppLink href={url.product(product)}>{product.name}</AppLink>
                    </div>
                    <div className="widget-products__prices">
                        {price}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="widget-products widget">
            <h4 className="widget__title">{title}</h4>
            <div className="widget-products__list">
                {productsList}
            </div>
        </div>
    );
}

export default WidgetProducts;
