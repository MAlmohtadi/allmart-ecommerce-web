// application
import Fi24Hours48Svg from '../../svg/fi-24-hours-48.svg';
import FiFreeDelivery48Svg from '../../svg/fi-free-delivery-48.svg';
import FiPaymentSecurity48Svg from '../../svg/fi-payment-security-48.svg';
import FiTag48Svg from '../../svg/fi-tag-48.svg';

export type BlockFeaturesLayout = 'classic' | 'boxed';

export interface BlockFeaturesProps {
    layout?: BlockFeaturesLayout;
}

function BlockFeatures(props: BlockFeaturesProps) {
    const { layout = 'classic' } = props;

    return (
        <div className={`block block-features block-features--layout--${layout}`}>
            <div className="container">
                <div className="block-features__list">
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <FiFreeDelivery48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">Free Shipping</div>
                            <div className="block-features__subtitle">For orders from $50</div>
                        </div>
                    </div>
                    <div className="block-features__divider" />
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <Fi24Hours48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">Support 24/7</div>
                            <div className="block-features__subtitle">Call us anytime</div>
                        </div>
                    </div>
                    <div className="block-features__divider" />
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <FiPaymentSecurity48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">100% Safety</div>
                            <div className="block-features__subtitle">Only secure payments</div>
                        </div>
                    </div>
                    <div className="block-features__divider" />
                    <div className="block-features__item">
                        <div className="block-features__icon">
                            <FiTag48Svg />
                        </div>
                        <div className="block-features__content">
                            <div className="block-features__title">Hot Offers</div>
                            <div className="block-features__subtitle">Discounts up to 90%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlockFeatures;
