
// import { useHome } from '../../store/home/homeHooks';
import { useSelector } from 'react-redux';
import { FunctionComponent } from 'react';
import {HomeState} from "./../../store/home/homeTypes";
interface FooterContactsProps {
    homeData: HomeState;
}
// function FooterContacts() {
const FooterContacts: FunctionComponent<FooterContactsProps> = ({ homeData }) => {

    // const homeData = useSelector((state: any) => state?.home);
    return (
        <div className="site-footer__widget footer-contacts">
            <h5 className="footer-contacts__title">{homeData?.translations?.contactUs || ''}</h5>

            <div className="footer-contacts__text">
            {homeData?.translations?.contactMessage || ''}
            </div>

            <ul className="footer-contacts__contacts">
                <li>
                    <i className="footer-contacts__icon far fa-envelope" />
                    info@jubranjo.com
                </li>
            </ul>
        </div>
    );
}

export default FooterContacts;
