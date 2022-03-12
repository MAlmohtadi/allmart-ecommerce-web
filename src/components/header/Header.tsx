/* eslint-disable jsx-a11y/alt-text */
// react
import { memo, useState, useEffect } from 'react';

// application
import AppLink from '../shared/AppLink';
import NavPanel from './NavPanel';
import Search from './Search';

export type HeaderLayout = 'default' | 'compact';

export interface HeaderProps {
    layout?: HeaderLayout;
}

function Header(props: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const { layout = 'default' } = props;
    let bannerSection;

    const handleScroll=() => {
        const offset=window.scrollY;
        if(offset > 200 ){
          setScrolled(true);
        }
        else{
          setScrolled(false);
        }
      }

      useEffect(() => {
        window.addEventListener('scroll',handleScroll)
      })

    if (layout === 'default') {
        bannerSection = (
            <div className="site-header__middle container">
                <div className="site-header__logo">
                    <AppLink href="/"><img src="/images/logos/logo.png" /></AppLink>
                </div>
                <div className="site-header__search">
                    <Search context="header" />
                </div>
            </div>
        );
    }
    let navbarClasses=['site-header__nav-panel'];
    if(scrolled){
        navbarClasses.push('scrolled');
      }
    return (
        <div className="site-header ">
            {bannerSection}
            <div className={navbarClasses.join(" ")}>
                <NavPanel layout={layout} />
            </div>
        </div>
    );
}

export default memo(Header);
