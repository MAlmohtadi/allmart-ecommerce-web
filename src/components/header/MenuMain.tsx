// react
import { Fragment, ReactNode } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import ArrowRoundedRight6x9Svg from '../../svg/arrow-rounded-right-6x9.svg';
import { ILinkMain, INestedLink } from '../../interfaces/menus/linkMain';
import { useRouter } from 'next/router';

export type MenuLayout = 'classic' | 'topbar';

export interface MenuProps<T extends ILinkMain> {
    layout?: MenuLayout;
    withIcons?: boolean;
    items?: T[];
    onClick?: (item: T) => void;
}

function MenuMain<T extends INestedLink>(props: MenuProps<T>) {
    const {
        layout = 'classic',
        withIcons = false,
        items = [],
        onClick = () => {},
    } = props;
    const router = useRouter();
    const { locale = "ar_JO" } = router.query;
    const renderLink = (item: T, content: ReactNode) => {
        let link;

        if (item.link) {
            link = <AppLink href={`${item.link}?locale=${locale}`} onClick={() => onClick && onClick(item)}>{content}</AppLink>;
        } else {
            link = <button type="button" onClick={() => onClick && onClick(item)}>{content}</button>;
        }

        return link;
    };

    const itemsList = items.map((item, index) => {
        let arrow;
        let submenu;
        let icon;

        if (item.children && item.children.length) {
            arrow = <ArrowRoundedRight6x9Svg className="menu__arrow" />;
        }

        if (item.children && item.children.length) {
            submenu = (
                <div className="menu__submenu">
                    <MenuMain items={item.children} />
                </div>
            );
        }


        return (
            <li key={index}>
                {renderLink(item, (
                    <Fragment>
                        {item.name}
                        {arrow}
                    </Fragment>
                ))}
                {submenu}
            </li>
        );
    });

    const classes = classNames(`menu menu--layout--${layout}`, {
        'menu--with-icons': withIcons,
    });

    return (
        <ul className={classes}>
            {itemsList}
        </ul>
    );
}

export default MenuMain;
