// react
import {
    Fragment, ChangeEvent, useEffect, useState, useRef, FormEvent,
} from 'react';

// third-party
import Head from 'next/head';
import { useRouter } from 'next/router';

// application
import { toast } from 'react-toastify';
import AppLink from '../shared/AppLink';
import Collapse, { CollapseRenderFn } from '../shared/Collapse';
import CurrencyFormat from '../shared/CurrencyFormat';
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';

// data stubs
import dataShopPayments from '../../data/shopPayments';
import { useCart, useCartApplyCoupon, useCartClear } from '../../store/cart/cartHooks';
import { useAccount } from '../../store/account/accountHooks';
import { ICheckoutInfo, IDelivery, IPeriod } from '../../interfaces/checkout-info';
import { useHomeAdminSettings } from '../../store/home/homeHooks';
import shopApi from '../../api/shop';
import { useDeferredData } from '../../services/hooks';
import { useSale } from '../../store/sale/saleHooks';
import MapPicker from '../shared/MapPicker';

export type RenderPaymentFn = CollapseRenderFn<HTMLLIElement, HTMLDivElement>;

export interface CheckoutProps {
    initData?: ICheckoutInfo;
}

function ShopPageCheckout(props: CheckoutProps) {
    const { initData } = props;
    const router = useRouter();
    const cart = useCart();
    const account = useAccount();
    const isWholeSale = useSale();
    const adminSettings = useHomeAdminSettings();
    const [currentPayment, setCurrentPayment] = useState('cash');
    const [deliveryPlace, setDeliveryPlace] = useState('');
    const [deliveryDate, setDeliveryDate] = useState<IDelivery>();
    const [deliveryPeriod, setDeliveryPeriod] = useState<IPeriod>();
    const noteInputRef = useRef<HTMLInputElement | null>(null);
    const deliveryInfo = useDeferredData(() => shopApi.getCheckoutInfo(), initData);
    const clearCart = useCartClear();
    const [location, setLocation] = useState({ lat: -34.397, lng: 150.644 });
    const onChangeLocation = (lat:number, lng:number) => {
        setLocation({ lat, lng });
    };
    const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setCurrentPayment(event.target.value);
        }
    };
    const couponRef = useRef<HTMLInputElement | null>(null);

    const applyCoupon = useCartApplyCoupon();

    const submitCoupon = (e: FormEvent) => {
        e.preventDefault();
        if (!couponRef.current || !couponRef.current.value) {
            toast.error('الرجاء تعبئة كود الخصم', { theme: 'colored' });
        } else {
            applyCoupon(couponRef.current?.value);
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

    const selectDay = async (id: string = '') => {
        const deliveryDate = deliveryInfo.data?.deliveryInfo.find((item) => `${item.id}` === id);
        setDeliveryDate(deliveryDate);
    };

    const selectPeriod = async (id: string = '') => {
        // @ts-ignore
        const period = deliveryDate.periods.find((item) => `${item.id}` === id);
        setDeliveryPeriod(period);
    };

    const onSubmit = () => {
        if (deliveryDate && deliveryPeriod) {
            const orderedProducts = cart.items.map((item) => ({
                id: item.product.id,
                isOffer: item.product.isOffer,
                offerPrice: item.product.offerPrice,
                offerQuantity: item.product.offerQuantity,
                offerType: item.product.offerType,
                price: item.product.price,
                productId: item.product.id,
                quantity: item.quantity,
            }));
            const discount = cart.totals.find((item) => item.type === 'discount')?.price;
            const deliveryPrice = (deliveryPlace === '1' ? deliveryPeriod.othersPrice : deliveryPeriod.price) || 0;
            shopApi
                .addOrder({
                    deliveryDate: deliveryDate.displayName,
                    couponCode: cart.coupon?.code || '',
                    couponDiscount: discount || 0,
                    location: `${location.lat},${location.lng}`,
                    deliveryPeriod: deliveryPeriod.name,
                    deliveryPrice,
                    typeOfPayment: currentPayment === 'cash' ? 0 : 1,
                    notes: noteInputRef.current?.value || '',
                    // @ts-ignore
                    orderedProducts,
                    totalPrice: cart.total + deliveryPrice,
                    userId: account.id || 0,
                    isWholeSale,
                })
                .then(async () => {
                    await router.replace('/shop/checkout/success');
                    await clearCart();
                })
                .catch((e) => {
                    toast.error(e.message, { theme: 'colored' });
                });
        } else if (adminSettings?.chooseDeliveryEnabled) {
            let message = 'يجب اختيار التالي:';
            message = !deliveryDate ? `${message}\n\n - يوم التوصيل` : message;
            message = adminSettings.choose_delivery_period_enabled !== false && !deliveryPeriod
                ? `${message}\n\n - وقت التوصيل`
                : message;
            toast.error(message, { theme: 'colored' });
        }
    };
    const totals = cart.totals.map((total, index) => {
        let { price } = total;
        if (total.type === 'shipping') {
            if (!adminSettings?.choose_delivery_period_enabled === false) {
                return null;
            }
            // @ts-ignore
            price = deliveryPlace === '1' ? deliveryPeriod?.othersPrice : deliveryPeriod?.price;
        }
        return (
            <tr key={index}>
                <th>{total.title}</th>
                <td>
                    <CurrencyFormat value={price} />
                </td>
            </tr>
        );
    });

    const cartItems = cart.items.map((item) => (
        <tr key={item.id}>
            <td>{`${item.product.name} × ${item.quantity}`}</td>
            <td>
                <CurrencyFormat value={item.total} />
            </td>
        </tr>
    ));

    const cartTable = (
        <table className="checkout__totals">
            <thead className="checkout__totals-header">
                <tr>
                    <th>المنتج</th>
                    <th>السعر</th>
                </tr>
            </thead>
            <tbody className="checkout__totals-products">{cartItems}</tbody>
            {totals.length > 0 && (
                <tbody className="checkout__totals-subtotals">
                    <tr>
                        <th>المجموع</th>
                        <td>
                            <CurrencyFormat value={cart.subtotal} />
                        </td>
                    </tr>
                    {totals}
                </tbody>
            )}
            <tfoot className="checkout__totals-footer">
                <tr>
                    <th>المبلغ الإجمالي</th>
                    <td>
                        <CurrencyFormat value={cart.total + (deliveryPlace === '1' ? deliveryPeriod.othersPrice : deliveryPeriod.price)} />
                    </td>
                </tr>
            </tfoot>
        </table>
    );

    const payments = dataShopPayments.map((payment) => {
        const renderPayment: RenderPaymentFn = ({ setItemRef }) => (
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
        { title: 'الرئيسية', url: url.home() },
        { title: 'سلة التسوق', url: url.cart() },
        { title: 'تنفيذ الطلب', url: '' },
    ];

    if (!account.isLoggedIn) {
        return (
            <Fragment>
                <Head>
                    <title>المفضلة - جبران</title>
                </Head>

                <PageHeader header="تنفيذ الطلب" breadcrumb={breadcrumb} />

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
        <Fragment>
            <Head>
                <title>تنفيذ الطلب - جبران</title>
            </Head>

            <PageHeader header="تنفيذ الطلب" breadcrumb={breadcrumb} />

            <div className="checkout block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 col-xl-7">
                            <div className="card mb-lg-0">
                                <div className="card-body">
                                    <h3 className="card-title">معلومات التوصيل</h3>
                                    <div className="form-group">
                                        <label htmlFor="checkout-city">مكان التوصيل</label>
                                        <select
                                            id="checkout-city"
                                            className="form-control"
                                            value={deliveryPlace}
                                            onChange={(selected) => setDeliveryPlace(selected?.target.value)}
                                        >
                                            <option defaultChecked>اختر مكان التوصيل ...</option>
                                            <option value="0">عمان</option>
                                            <option value="1">محافظات أخري</option>
                                        </select>
                                    </div>
                                    {deliveryPlace && (
                                        <div className="form-group">
                                            <label htmlFor="checkout-day">يوم التوصيل</label>
                                            <select
                                                id="checkout-day"
                                                className="form-control"
                                                // value={deliveryDay?.displayName}
                                                onChange={(selected) => selectDay(selected?.target.value)}
                                            >
                                                <option defaultChecked>اختر يوم التوصيل ...</option>
                                                {!deliveryInfo.isLoading
                                                    // @ts-ignore
                                                    && deliveryInfo.data.deliveryInfo.map((item) => (
                                                        <option value={`${item.id}`}>{item.displayName}</option>
                                                    ))}
                                            </select>
                                        </div>
                                    )}
                                    {adminSettings?.choose_delivery_period_enabled !== false && deliveryDate && (
                                        <div className="form-group">
                                            <label htmlFor="checkout-period">وقت التوصيل</label>
                                            <select
                                                id="checkout-period"
                                                className="form-control"
                                                onChange={(selected) => selectPeriod(selected?.target.value)}
                                            >
                                                <option defaultChecked>اختر وقت التوصيل ...</option>
                                                {deliveryDate.periods.map((item) => (
                                                    <option value={`${item.id}`}>
                                                        {`${item.name} /  ${
                                                            deliveryPlace === '1' ? item.othersPrice : item.price
                                                        } JOD`}

                                                    </option>
                                                ))}
                                            </select>
                                            <span className="text-muted">يتم حساب سعر التوصيل حسب التالي:</span>
                                            {' '}
                                            <span className="text-muted">المكان، اليوم، الوقت</span>
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label htmlFor="checkout-comment">
                                            ملاحظات الطلب
                                            {' '}
                                            <span className="text-muted">(اختياري)</span>
                                        </label>
                                        <textarea
                                            // @ts-ignore
                                            ref={noteInputRef}
                                            id="checkout-comment"
                                            className="form-control"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <form className="cart__coupon-form" onSubmit={submitCoupon}>
                                            <label htmlFor="input-coupon-code" className="sr-only">
                                                Password
                                            </label>
                                            <input
                                                ref={couponRef}
                                                type="text"
                                                className="form-control"
                                                id="input-coupon-code"
                                                placeholder="كود الخصم"
                                            />
                                            <button type="submit" className="btn btn-primary">
                                                تأكيد الكود
                                            </button>
                                        </form>
                                    </div>
                                    <div className="form-group">
                                        <MapPicker
                                            isMarkerShown
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfG3eAQBGOIiySuJxu273SGFAJ73Z0f98&v=3.exp&libraries=geometry,drawing,places"
                                            location={location}
                                            onChangeLocation={onChangeLocation}
                                            loadingElement={<div style={{ height: '100%' }} />}
                                            containerElement={<div style={{ height: '400px' }} />}
                                            mapElement={<div style={{ height: '100%' }} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">طلبك</h3>

                                    {cartTable}

                                    <div className="payment-methods">
                                        <ul className="payment-methods__list">{payments}</ul>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-xl btn-block"
                                        onClick={onSubmit}
                                    >
                                        تأكيد
                                    </button>
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
