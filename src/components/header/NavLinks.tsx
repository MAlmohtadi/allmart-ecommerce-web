// react
import { MouseEvent as ReactMouseEvent } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import ArrowRoundedDown9x6Svg from '../../svg/arrow-rounded-down-9x6.svg';
import Megamenu from './Megamenu';
import Menu from './Menu';
import { useDirection } from '../../store/locale/localeHooks';

// data stubs
import dataHeaderNavigation from '../../data/headerNavigation';
import { IHomePageResponse } from '../../interfaces/homepage';
import { useHome } from '../../store/home/homeHooks';

export interface InitData {
    homepageInfo?: IHomePageResponse;
}
export interface NavLinksProps {
    initData?: InitData;
}
function NavLinks() {
    const direction = useDirection();
    const homeData = useHome();
    const { categories } = homeData;

    const customMenuDataPreperation = () => {
        let object : any[] = [];
        if (!homeData.init && homeData.homeIsLoading) {
            return;
        }

        const categoryMenu = dataHeaderNavigation.find((item) => item.title === 'التصنيفات');

        if (categoryMenu && categoryMenu.submenu
            && Array.isArray(categoryMenu.submenu.menu)
            && !categoryMenu?.submenu?.menu.length) {
            categories?.map((category) => {
                if (category.subCategories.length) {
                    object = category.subCategories.map((subCategory) => ({
                        title: `${subCategory.name}`,
                        url: `/eshop/categories/${category.id}/sub-category/${subCategory.id}`,
                    }));
                }
                // @ts-ignore:
                return categoryMenu?.submenu?.menu?.push({
                    title: `${category.name}`,
                    url: `/eshop/categories/${category.id}`,
                    children: [...object],
                });
            });
        }
    };
    customMenuDataPreperation();
    const handleMouseEnter = (event: ReactMouseEvent) => {
        const item = event.currentTarget as HTMLElement;
        const megamenu = item.querySelector('.nav-links__megamenu') as HTMLElement;

        if (megamenu) {
            const container = megamenu.offsetParent;
            const containerWidth = container!.getBoundingClientRect().width;
            const megamenuWidth = megamenu.getBoundingClientRect().width;
            const itemOffsetLeft = item.offsetLeft;

            if (direction === 'rtl') {
                const itemPosition = containerWidth - (itemOffsetLeft + item.getBoundingClientRect().width);

                const megamenuPosition = Math.round(Math.min(itemPosition, containerWidth - megamenuWidth));

                megamenu.style.left = '';
                megamenu.style.right = `${megamenuPosition}px`;
            } else {
                const megamenuPosition = Math.round(Math.min(itemOffsetLeft, containerWidth - megamenuWidth));

                megamenu.style.right = '';
                megamenu.style.left = `${megamenuPosition}px`;
            }
        }
    };

    const linksList = dataHeaderNavigation.map((item, index) => {
        let arrow;
        let submenu;

        if (item.submenu) {
            arrow = <ArrowRoundedDown9x6Svg className="nav-links__arrow" />;
        }

        if (item.submenu && item.submenu.type === 'menu') {
            submenu = (
                <div className="nav-links__menu">
                    <Menu items={item.submenu.menu} />
                </div>
            );
        }

        if (item.submenu && item.submenu.type === 'megamenu') {
            submenu = (
                <div className={`nav-links__megamenu nav-links__megamenu--size--${item.submenu.menu.size}`}>
                    <Megamenu menu={item.submenu.menu} />
                </div>
            );
        }

        const classes = classNames('nav-links__item', {
            'nav-links__item--with-submenu': item.submenu,
        });

        return (
            <li key={index} className={classes} onMouseEnter={handleMouseEnter}>
                <AppLink href={item.url} {...item.props}>
                    <span>
                        {item.title}
                        {arrow}
                    </span>
                </AppLink>
                {submenu}
            </li>
        );
    });

    return (
        <ul className="nav-links__list">
            {linksList}
        </ul>
    );
}

export default NavLinks;
