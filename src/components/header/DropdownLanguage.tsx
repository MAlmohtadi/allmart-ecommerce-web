// @ts-nocheck
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

    const localeChange = useLocaleChange();
    const router = useRouter();
    const { locale = "ar_JO" } = router.query;
    const [currenLocale, setCurrentLocale] = useState(locale.startsWith("ar_") ? "اللغة" : "Language");
    const subMenu = languages?.map((item, index) => {
        return { name: item.showText, locale: item.locale };
    });
    const classes = classNames("nav-links__item");
    const onClick = (item: any) => {
        let basePath = router.asPath.includes("#") ? router.asPath.split("#")[0] : router.asPath.split("?")[0];

        router.push(basePath + "?locale=" + item.locale);
        localeChange(item.locale.split("_")[0]);
        setCurrentLocale(!locale.startsWith("ar_") ? "اللغة" : "Language");
    };

    return (
        <ul className="nav-links__list">
            {" "}
            <li key="language" className={classes}>
                <AppLink>
                    <span>{currenLocale}</span>

                    <ArrowRoundedDown9x6Svg className="nav-links__arrow" />
                </AppLink>
                <div className="nav-links__menu">
                    <MenuMain items={subMenu} onClick={onClick} />
                </div>
            </li>
        </ul>
    );
}

export default DropdownLanguage;
