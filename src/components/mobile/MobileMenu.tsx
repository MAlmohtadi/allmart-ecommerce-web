// react
import { memo } from 'react';

// third-party
import classNames from 'classnames';

// application
import Cross20Svg from '../../svg/cross-20.svg';
import MobileLinks from './MobileLinks';
import { useCurrencyChange } from '../../store/currency/currencyHooks';
import { useLanguage, useLocaleChange, useSyncedLocalStorage } from "../../store/locale/localeHooks";
import { useMobileMenu, useMobileMenuClose } from '../../store/mobile-menu/mobileMenuHooks';

import Cookies from "js-cookie";
import { useRouter } from "next/router";
// data stubs
import {getMobileMenu} from '../../data/mobileMenu';
import dataShopCurrencies from '../../data/shopCurrencies';
import { IMobileMenuLink } from '../../interfaces/menus/mobile-menu';
import { useHome } from '../../store/home/homeHooks';

function MobileMenu() {
    const mobileMenu = useMobileMenu();
    const mobileMenuClose = useMobileMenuClose();
    const localeChange = useLocaleChange();
    const currencyChange = useCurrencyChange();
    const homeData = useHome();
    const [direction, setDirection] = useSyncedLocalStorage<"ltr" | "rtl">(
        "direction",
        "ltr"
        );
    const router = useRouter();
    const { categories } = homeData;
    const classes = classNames('mobilemenu', {
        'mobilemenu--open': mobileMenu.open,
    });

    const handleItemClick = (item: IMobileMenuLink) => {
        if (item.data) {
            
            console.log("lang click22:", item.data);
            if (item.data.type === 'language') {
                console.log("lang click:", item.data);
                let basePath = router.asPath.includes("#") ? router.asPath.split("#")[0] : router.asPath.split("?")[0];
                
                Cookies.set("langId", item?.data?.langId.toString(), { path: "/" });
                
                // CRITICAL: Update direction immediately before navigation
                setDirection(item?.data?.direction);
                // Also update document directly for immediate effect
                if (typeof document !== 'undefined') {
                    document.documentElement.dir = item?.data?.direction;
                }
                
                router.push(`${basePath}`).then(() => {
                    router.reload();
                });
                
                // localeChange(item.data.locale);
                mobileMenuClose();
            }
            if (item.data.type === 'currency') {
                const currency = dataShopCurrencies.find((x) => x.code === item.data.code);

                if (currency) {
                    currencyChange(currency);
                    mobileMenuClose();
                }
            }
        }
        if (item.type === 'link') {
            mobileMenuClose();
        }
    };

    const customMenuDataPreperation = () => {
        let object: any[] = [];
        if (!homeData.init && homeData.homeIsLoading) {
            return;
        }

        const categoryMenu = getMobileMenu(homeData.translations, homeData.languages).find((item) => item.title === 'التصنيفات');
        if (
            categoryMenu
            && categoryMenu.children
            && Array.isArray(categoryMenu.children)
            && !categoryMenu?.children.length
        ) {
            // @ts-ignore
            categories.map((category) => {
                if (category.subCategories.length) {
                    object = category.subCategories.map((subCategory) => ({
                        title: `${subCategory.name}`,
                        type: 'link',
                        url: `/eshop/categories/${category.id}/sub-category/${subCategory.id}`,
                    }));
                }
                // @ts-ignore
                return categoryMenu.children.push({
                    title: `${category.name}`,
                    type: 'button',
                    url: `/eshop/categories/${category.id}`,
                    children: [...object],
                });
            });
        }
    };
    customMenuDataPreperation();

    return (
        <div className={classes}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div className="mobilemenu__backdrop" onClick={mobileMenuClose} />
            <div className="mobilemenu__body">
                <div className="mobilemenu__header">
                    <div className="mobilemenu__title">القائمة</div>
                    <button type="button" className="mobilemenu__close" onClick={mobileMenuClose}>
                        <Cross20Svg />
                    </button>
                </div>
                <div className="mobilemenu__content">
                    <MobileLinks links={getMobileMenu(homeData?.translations, homeData?.languages)} onItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    );
}

export default memo(MobileMenu);
