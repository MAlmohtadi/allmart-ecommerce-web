// react
import { Fragment, useMemo, useState } from "react";

// third-party
import { FormattedMessage } from "react-intl";

// application
import Dropdown from "./Dropdown";
// import languages from '../../i18n';
// import { ILanguage } from "../../interfaces/language";
import { useLanguage, useLocaleChange } from "../../store/locale/localeHooks";
import { ILanguage } from "../../interfaces/main";
import classNames from "classnames";

// application
import AppLink from "../shared/AppLink";
import ArrowRoundedDown9x6Svg from "../../svg/arrow-rounded-down-9x6.svg";
import MenuMain from "./MenuMain";
import { useRouter } from "next/router";
interface DropdownLanguageItem {
    title: string;
    language: ILanguage;
    icon: string;
}
interface LanguagesProps {
    languages?: ILanguage[];
}
function DropdownLanguage(props: LanguagesProps) {
    const { languages } = props;
    const [currenLocale, setCurrentLocale] = useState("Language");
    const localeChange = useLocaleChange();
    const route=useRouter()
    const subMenu = languages?.map((item, index) => {
        return {  name: item.showText,locale: item.locale };
    });
    const classes = classNames("nav-links__item");
    const onClick = (item: any) => {
        route.push('?locale='+item.locale)
        localeChange(item.locale.split('_')[0])
        setCurrentLocale(item.name);
    };
    return (
        <ul className="nav-links__list">
            {" "}
            <li key="language" className={classes}>
                <AppLink href={"/"}>
                    <span>
                        {currenLocale}

                        <ArrowRoundedDown9x6Svg className="nav-links__arrow" />
                    </span>
                </AppLink>
                <div className="nav-links__menu">
                    <MenuMain items={subMenu} onClick={onClick} />
                </div>
            </li>
        </ul>
    );
}

export default DropdownLanguage;
