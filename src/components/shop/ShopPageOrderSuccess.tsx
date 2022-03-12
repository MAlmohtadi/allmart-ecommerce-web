// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import Check100Svg from '../../svg/check-100.svg';

export default function ShopPageOrderSuccess() {
    return (
        <div className="block order-success">
            <Head>
                <title>تم اكمال الطلب - جبران</title>
            </Head>

            <div className="container">
                <div className="order-success__body">
                    <div className="order-success__header">
                        <Check100Svg className="order-success__icon" />
                        <h1 className="order-success__title">شكرا لك</h1>
                        <div className="order-success__subtitle">لقد تم استقبال طلبك</div>
                        <div className="order-success__actions">
                            <AppLink href="/" className="btn btn-xs btn-secondary">
                                الذهاب للرئيسية
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
