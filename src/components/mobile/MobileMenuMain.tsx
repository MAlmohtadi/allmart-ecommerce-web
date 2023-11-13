// @ts-nocheck
// react
import { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
// third-party
import classNames from "classnames";

// application
import Cross20Svg from "../../svg/cross-20.svg";
import MobileLinks from "./MobileLinks";
import { useCurrencyChange } from "../../store/currency/currencyHooks";
import { useLocaleChange } from "../../store/locale/localeHooks";
import { useMobileMenu, useMobileMenuClose } from "../../store/mobile-menu/mobileMenuHooks";

// data stubs
import dataMobileMenu from "../../data/mobileMenu";
import dataShopCurrencies from "../../data/shopCurrencies";
import { IMobileMenuLink } from "../../interfaces/menus/mobile-menu";
import { useHome } from "../../store/home/homeHooks";
import { ILanguage, IMenu, ISubMenu } from "../../interfaces/main";
import MobileLinksMain from "./MobileLinksMain";

export interface MobileMenuProps {
    menuList?: IMenu[];
    langueges?: ILanguage[];
}

function MobileMenuMain(props: MobileMenuProps) {
    const { menuList, langueges } = props;
    const mobileMenu = useMobileMenu();
    const mobileMenuClose = useMobileMenuClose();
    const localeChange = useLocaleChange();
    const router = useRouter();
    const { locale = "en_US" } = router.query;
    const [currenLocale, setCurrentLocale] = useState(locale.startsWith("ar_") ? "اللغة" : "Language");
    const [title, setTitle] = useState(locale.startsWith("ar_") ? "القائمة" : "Menu");
    const [menuWithLanguage, setMenuWithLanguage] = useState([...menuList]);
    const addLanguageToMenu = () => {
        // const isLanguageAdded = await menuWithLanguage?.find((item) => item.name === currenLocale);

        // if (!isLanguageAdded) {
        const languageAsMenu: IMenu = {
            isSamePageLink: false,
            name: locale.startsWith("ar_") ? "اللغة" : "Language",
            order: menuList?.length || 0 + 1,
            subMenu: langueges?.map((languege, index) => {
                return {
                    name: languege.showText,
                    isSamePageLink: true,
                    link: router.asPath.split("?")[0] + "?locale=" + languege.locale,
                    order: index,
                };
            }),
        };
        setMenuWithLanguage([...menuList, { ...languageAsMenu }]);
        // }
    };

    const classes = classNames("mobilemenu", {
        "mobilemenu--open": mobileMenu.open,
    });
    useEffect(() => { 
            setTitle(locale.startsWith("ar_") ? "القائمة" : "Menu");
            addLanguageToMenu(); 
    }, [locale]);
    const handleItemClick = (item: ISubMenu) => {
        // if (item.locale) {
        // router.push(router.asPath.split("?")[0] + "?locale=" + item.locale);
        // localeChange(item.locale.split("_")[0]);
        // }
        mobileMenuClose();
    };

    return (
        <div className={classes}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div className="mobilemenu__backdrop" onClick={mobileMenuClose} />
            <div className="mobilemenu__body">
                <div className="mobilemenu__header">
                    <div className="mobilemenu__title">{title}</div>
                    <button type="button" className="mobilemenu__close" onClick={mobileMenuClose}>
                        <Cross20Svg />
                    </button>
                </div>

                <div className="mobilemenu__content">
                    <MobileLinksMain menuList={menuWithLanguage} languages={langueges} onItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    );
}

export default memo(MobileMenuMain);
