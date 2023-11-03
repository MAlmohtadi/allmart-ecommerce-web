// application
import { IFooter, IInformationSection, ILink } from '../../interfaces/main';
import AppLink from '../shared/AppLink';

type FunctionComponentProps = {
    title: string;
    links?: ILink[];
};

function FooterLinksMain(props: IInformationSection) {
    const { headTitle, links = [] } = props;

    const linksList = links && links.map((item, index) => (
        <li key={index} className="footer-links__item">
            <AppLink href={item.link} className="footer-links__link">
                {item.name}
            </AppLink>
        </li>
    ));

    return (
        <div className="site-footer__widget footer-links">
            <h5 className="footer-links__title">{headTitle}</h5>
            <ul className="footer-links__list">
                {linksList}
            </ul>
        </div>
    );
}

export default FooterLinksMain;
