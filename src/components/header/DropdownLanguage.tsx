// @ts-nocheck
// react
import { Fragment, useMemo, useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
// third-party
import { FormattedMessage } from "react-intl";

// application
import Dropdown from "./Dropdown";
// import languages from '../../i18n';
// import { ILanguage } from "../../interfaces/language";
import { useLanguage, useLocaleChange, useSyncedLocalStorage } from "../../store/locale/localeHooks";
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
    languages?: ILanguage[] | null;
    inline?: boolean; // If true, render without <ul> wrapper (for use inside existing <ul>)
}
function DropdownLanguage(props: LanguagesProps) {
    const { languages, inline = false } = props;
    const [direction, setDirection] = useSyncedLocalStorage<"ltr" | "rtl">(
        "direction",
        "ltr"
      );
    const localeChange = useLocaleChange();
    const router = useRouter();
    const { locale = "ar_JO" } = router.query;
    const [currenLocale, setCurrentLocale] = useState(locale.startsWith("ar_") ? "اللغة" : "Language");
    
    // Fallback languages if not provided from props
    const fallbackLanguages: ILanguage[] = [
        { id: 1, name: "العربية", showText: "العربية", isActive: true, locale: "ar_JO", direction: "rtl" },
        { id: 2, name: "English", showText: "English", isActive: true, locale: "en_US", direction: "ltr" }
    ];
    
    const langs = languages && Array.isArray(languages) && languages.length > 0 ? languages : fallbackLanguages;
    const subMenu = langs.map((item, index) => {
        return { name: item.showText, locale: item.locale, direction: item.direction, langId: item.id};
    });
    // console.log("langs:" +Array.isArray(languages), languages);
    const classes = classNames("nav-links__item");
    const onClick = (item: any) => {
        let basePath = router.asPath.includes("#") ? router.asPath.split("#")[0] : router.asPath.split("?")[0];
        console.log("direction in set:", item.direction);
        Cookies.set("langId", item.langId.toString(), { path: "/" });
        console.log("item dr:", item);
        
        // CRITICAL: Update direction immediately before navigation
        setDirection(item.direction);
        // Also update document directly for immediate effect
        if (typeof document !== 'undefined') {
            document.documentElement.dir = item.direction;
        }
        
        // localStorage.setItem("langId", item.id);
        // localStorage.setItem("direction", item.direction);
        // router.push(basePath + "?locale=" + item.locale);
        localeChange(item.locale.split("_")[0]);
        setCurrentLocale(!locale.startsWith("ar_") ? "اللغة" : "Language");
        
        router.push(`${basePath}?locale=${item.locale}`).then(() => {
            router.reload();
        });
    };

    const content = (
        <>
            <AppLink>
                <span>{currenLocale}</span>
                <ArrowRoundedDown9x6Svg className="nav-links__arrow" />
            </AppLink>
            <div className="nav-links__menu">
                <MenuMain items={subMenu} onClick={onClick} />
            </div>
        </>
    );

    // If inline prop is true (eshop NavPanel), return just the content
    // The parent <li> already exists in NavPanel
    if (inline) {
        return content;
    }

    // Standalone - return full structure with <ul> and <li> (for exportation)
    return (
        <ul className="nav-links__list">
            {" "}
            <li key="language" className={classes}>
                {content}
            </li>
        </ul>
    );
}

export default DropdownLanguage;
