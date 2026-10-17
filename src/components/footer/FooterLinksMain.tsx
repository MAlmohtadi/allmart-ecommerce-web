// application
import { IFooter, IInformationSection, ILink } from '../../interfaces/main';
import AppLink from '../shared/AppLink';

type FunctionComponentProps = {
    title: string;
    links: ILink[];
};
interface Props {
   informationSection?: IInformationSection | null
}
function FooterLinksMain(props: Props) {
    // a language without a footer entry has no information section: render an empty widget
    const { headTitle, links = [] } = props.informationSection ?? ({} as Partial<IInformationSection>);

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
