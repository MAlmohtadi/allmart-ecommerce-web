/* eslint-disable jsx-a11y/alt-text */
// react
import { memo, useState, useEffect } from 'react';

// application
import AppLink from '../shared/AppLink';
import NavPanelMain from './NavPanelMain';
import { ILanguage, IMenu } from '../../interfaces/main';
// import languages from '../../i18n';

export type HeaderLayout = 'default' | 'compact';

export interface HeaderProps {
    layout?: HeaderLayout;
    menuList?: IMenu[],
    langueges?: ILanguage[]
}

function HeaderMain(props: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const { layout = 'default',menuList, langueges} = props;
    let bannerSection;

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });

    if (layout === 'default') {
        bannerSection = (
            <div className="site-header__middle__main container">
                <div className="site-header__logo_main">
                    <AppLink href="/"><img src="/images/logos/logo.png" /></AppLink>
                </div>
                {/* <div className="site-header__search">
                    <Search context="header" />
                </div> */}
            </div>
        );
    }

    const navbarClasses = ['site-header__nav-panel'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }

    return (
        <div className="site-header">
            {bannerSection}
            <div className={navbarClasses.join(' ')}>
                <NavPanelMain layout={layout} menuList={menuList} languages={langueges} />
            </div>
        </div>
    );
}

export default HeaderMain;
