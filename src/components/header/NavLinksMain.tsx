// react
import { MouseEvent as ReactMouseEvent } from "react";

// third-party
import classNames from "classnames";

// application
import AppLink from "../shared/AppLink";
import ArrowRoundedDown9x6Svg from "../../svg/arrow-rounded-down-9x6.svg";

import { useDirection, useLocale } from "../../store/locale/localeHooks";

import { IHomePageInfo, IMenu } from "../../interfaces/main";
import MenuMain from "./MenuMain";
import { useRouter } from "next/router";

export interface InitData {
    mainPageInfo?: IHomePageInfo;
}
export interface NavLinksProps {
    initData?: InitData;
    menuList?: IMenu[];
}
function NavLinksMain(props: NavLinksProps) {
    const direction = useDirection();
    const { menuList } = props;
    const router = useRouter();
    const { locale = "ar_JO" } = router.query;
    const handleMouseEnter = (event: ReactMouseEvent) => {
        const item = event.currentTarget as HTMLElement;
        const megamenu = item.querySelector(".nav-links__megamenu") as HTMLElement;

        if (megamenu) {
            const container = megamenu.offsetParent;
            const containerWidth = container!.getBoundingClientRect().width;
            const megamenuWidth = megamenu.getBoundingClientRect().width;
            const itemOffsetLeft = item.offsetLeft;

            if (direction === "rtl") {
                const itemPosition = containerWidth - (itemOffsetLeft + item.getBoundingClientRect().width);

                const megamenuPosition = Math.round(Math.min(itemPosition, containerWidth - megamenuWidth));

                megamenu.style.left = "";
                megamenu.style.right = `${megamenuPosition}px`;
            } else {
                const megamenuPosition = Math.round(Math.min(itemOffsetLeft, containerWidth - megamenuWidth));

                megamenu.style.right = "";
                megamenu.style.left = `${megamenuPosition}px`;
            }
        }
    };

    const linksList = menuList?.map((item, index) => {
        let arrow;
        let subMenu;

        if (item.subMenu) {
            arrow = <ArrowRoundedDown9x6Svg className="nav-links__arrow" />;

            subMenu = (
                <div className="nav-links__menu">
                    <MenuMain items={item.subMenu} />
                </div>
            );
        }

        const classes = classNames("nav-links__item", {
            "nav-links__item--with-submenu": item.subMenu,
        });
        let href = item.isSamePageLink ? `${item.link}` : `${item.link}?locale=${locale}`;
        return (
            <li key={index} className={classes} onMouseEnter={handleMouseEnter}>
                <AppLink href={href}>
                    <span>
                        {item.name}
                        {arrow}
                    </span>
                </AppLink>
                {subMenu}
            </li>
        );
    });

    return <ul className="nav-links__list">{linksList}</ul>;
}

export default NavLinksMain;
