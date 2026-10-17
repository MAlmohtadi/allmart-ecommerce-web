import { FunctionComponent } from 'react';

import { useSelector } from 'react-redux';
// application
import FooterContacts from './FooterContacts';
import FooterLinks from './FooterLinks';
import ToTop from './ToTop';
import {
    IEshopTranslation,
    ILanguage,
} from "../../interfaces/main";
import AppLink from '../shared/AppLink';

import {HomeState} from "./../../store/home/homeTypes";
interface FooterProps {
    homeData: HomeState;
}
const Footer: FunctionComponent<FooterProps> = ({ homeData }) => {

        

    function getInformationLinks(translations: IEshopTranslation | null) {
        return [
            { title: translations?.privacy || 'سياسة الخصوصية', url: '/site/terms' },
            { title: translations?.support || 'الدعم', url: '/site/support' },
            { title: translations?.cancelAppAccount || 'الغاء الحساب التطبيق', url: '/site/cancel-account' },
            { title: translations?.cancelWebAccount || 'الغاء الحساب المتصفح', url: '/site/cancel-account-web' },
            { title: translations?.socialLinks || 'صفحات التواصل', url: '/site/social-info' },
        ];
    }

    return (
        <div className="site-footer">
            <div className="container">
                <div className="site-footer__widgets">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <FooterContacts homeData={homeData} />
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <FooterLinks title={homeData?.translations?.information || 'معلومات'} items={getInformationLinks(homeData?.translations)} />
                        </div>
                        <div className="col-12 col-md-3 col-lg-2">
                            <div className="site-footer__widget footer-links">
                                <h5 className="footer-links__title"> {homeData?.translations?.downloadApp || 'قم بتحميل التطبيق '} </h5>
                                <ul className="footer-links__list">
                                    <li key="Google Play" className="footer-links__item">
                                        <AppLink
                                            href="https://play.google.com/store/apps/details?id=com.jubranpp.jubran"
                                            className="footer-links__link"
                                        >
                                            <img
                                                style={{
                                                    display: 'block',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    width: '100%',
                                                }}
                                                alt="احصل عليه من Google Play"
                                                src="https://play.google.com/intl/ar/badges/static/images/badges/ar_badge_web_generic.png"
                                            />
                                        </AppLink>
                                    </li>
                                    <li key="App Store" className="footer-links__item">
                                        <AppLink
                                            href="https://apps.apple.com/us/app/jubran/id1594000901"
                                            className="footer-links__link"
                                        >
                                            <img
                                                style={{
                                                    display: 'block',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    width: '90%',
                                                }}
                                                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ar-ar?size=250x83&amp;releaseDate=1624924800&amp;h=5e0c5b783b8e61a7ae296df5c694ca8d"
                                                alt="Download on the App Store"
                                            />
                                        </AppLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ToTop />
        </div>
    );
};

export default Footer;
