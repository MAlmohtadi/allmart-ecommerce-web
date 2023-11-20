// application
import AppLink from "../shared/AppLink";
import Departments from "./Departments";
import IndicatorSearch from "./IndicatorSearch";
import LogoSmallSvg from "../../svg/logo-small.svg";
import NavLinksMain from "./NavLinksMain";
import DropdownLanguage from "./DropdownLanguage";
import { ILanguage, IMenu } from "../../interfaces/main";
import { useRouter } from "next/router";

export type NavPanelLayout = "default" | "compact";

export interface NavPanelProps {
    layout?: NavPanelLayout;
    menuList?: IMenu[];
    languages?: ILanguage[];
}

function NavPanelMain(props: NavPanelProps) {
    const { layout = "default", menuList, languages } = props;
    let logo = null;
    let departments = null;
    let searchIndicator;

    if (layout === "compact") {
        // @ts-ignore
        logo = (
            <div className="nav-panel__logo">
                <AppLink href="/">
                    <LogoSmallSvg />
                </AppLink>
            </div>
        );

        searchIndicator = <IndicatorSearch />;
    }

    if (layout === "default") {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        departments = (
            <div className="nav-panel__departments">
                <Departments />
            </div>
        );
    }

    return (
        <div className="nav-panel">
            <div className="nav-panel__container container">
                <div className="nav-panel__row__main">
                    {logo}

                    <div className="nav-panel__nav-links nav-links">
                        <NavLinksMain menuList={menuList} />
                    </div>
                    <div className="nav-panel__nav-links nav-links">
                        <DropdownLanguage languages={languages} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavPanelMain;
