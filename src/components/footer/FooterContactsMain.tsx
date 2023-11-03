import { ICallUsSection, IFooter } from "../../interfaces/main";


function FooterContactsMain(footer: IFooter) {
    return (
        <div className="site-footer__widget footer-contacts">


            <h5 className="footer-contacts__title">{footer.callUsSection?.headTitle}</h5>
            <div className="footer-contacts__text">{footer.callUsSection?.description}</div>

           { footer.callUsSection?.email&& <ul className="footer-contacts__contacts">
                <li>
                    <i className="footer-contacts__icon far fa-envelope" />
                    {footer.callUsSection?.email}
                </li>
            </ul>}
        </div>
    );
}

export default FooterContactsMain;
