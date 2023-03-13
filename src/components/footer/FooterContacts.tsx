function FooterContacts() {
    return (
        <div className="site-footer__widget footer-contacts">
            <h5 className="footer-contacts__title">اتصل بنا</h5>

            <div className="footer-contacts__text">
                لأي اقتراحات ملاحظات اوإقتراحات يرجى التواصل معنا عبر الإيميل
            </div>

            <ul className="footer-contacts__contacts">
                <li>
                    <i className="footer-contacts__icon far fa-envelope" />
                    info@bountiestodayjo.com
                </li>
            </ul>
        </div>
    );
}

export default FooterContacts;
