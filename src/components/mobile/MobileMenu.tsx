// react
import { memo } from 'react';

// third-party
import classNames from 'classnames';

// application
import Cross20Svg from '../../svg/cross-20.svg';
import MobileLinks from './MobileLinks';
import { useCurrencyChange } from '../../store/currency/currencyHooks';
import { useLocaleChange } from '../../store/locale/localeHooks';
import { useMobileMenu, useMobileMenuClose } from '../../store/mobile-menu/mobileMenuHooks';

// data stubs
import dataMobileMenu from '../../data/mobileMenu';
import dataShopCurrencies from '../../data/shopCurrencies';
import { IMobileMenuLink } from '../../interfaces/menus/mobile-menu';
import { useDeferredData } from '../../services/hooks';
import shopApi from '../../api/shop';
import { useSale } from '../../store/sale/saleHooks';
import { useHome, useHomeCategories, useHomeIsLoading } from '../../store/home/homeHooks';

function MobileMenu() {
    const mobileMenu = useMobileMenu();
    const mobileMenuClose = useMobileMenuClose();
    const localeChange = useLocaleChange();
    const currencyChange = useCurrencyChange();
    const homeData = useHome();
    const { categories } = homeData;
    const classes = classNames('mobilemenu', {
        'mobilemenu--open': mobileMenu.open,
    });

    const handleItemClick = (item: IMobileMenuLink) => {
        if (item.data) {
            if (item.data.type === 'language') {
                localeChange(item.data.locale);
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

    // const categories = useHomeCategories();
    // const homeIsLoading = useHomeIsLoading();
    // const categoriesMenuData = [
    //     {
    //         title: 'التصنيفات',
    //         url: '/',
    //         type: 'link',
    //         children: [],
    //     },
    // ];
    // const customMenuDataPreperation = () => {
    //     let object = [];
    //     if (!homeData.init && homeData.homeIsLoading) {
    //         return [];
    //     } if (homeData.init && !homeData.homeIsLoading && dataMobileMenu.length < 5) {
    //         categories.map((category) => {
    //             if (category.subCategories.length) {
    //                 object = category.subCategories.map((subCategory) => ({
    //                     title: `${subCategory.name}`,
    //                     type: 'link',
    //                     url: `/categories/${category.id}/sub-category/${subCategory.id}`,
    //                 }));
    //             }
    //             categoriesMenuData[0].children.push({
    //                 title: `${category.name}`,
    //                 url: `/categories/${category.id}`,
    //                 type: 'link',
    //                 children: [...object],
    //             });
    //         });
    //         dataMobileMenu.push(categoriesMenuData[0]);
    //     }
    // };

    const customMenuDataPreperation = () => {
        let object: any[] = [];
        if (!homeData.init && homeData.homeIsLoading) {
            return;
        }

        const categoryMenu = dataMobileMenu.find((item) => item.title === 'التصنيفات');
        if (
            categoryMenu
            && categoryMenu.children
            && Array.isArray(categoryMenu.children)
            && !categoryMenu?.children.length
        ) {
            categories.map((category) => {
                if (category.subCategories.length) {
                    object = category.subCategories.map((subCategory) => ({
                        title: `${subCategory.name}`,
                        type: 'link',
                        url: `/categories/${category.id}/sub-category/${subCategory.id}`,
                    }));
                }
                return categoryMenu.children.push({
                    title: `${category.name}`,
                    type: 'link',
                    url: `/categories/${category.id}`,
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
                    <MobileLinks links={dataMobileMenu} onItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    );
}

export default memo(MobileMenu);
