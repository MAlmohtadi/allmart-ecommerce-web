/* eslint-disable jsx-a11y/alt-text */
// react
import { memo } from 'react';

// application
import AppLink from '../shared/AppLink';
import NavPanel from './NavPanel';
import Search from './Search';

export type HeaderLayout = 'default' | 'compact';

export interface HeaderProps {
    layout?: HeaderLayout;
}

function Header(props: HeaderProps) {
    const { layout = 'default' } = props;
    let bannerSection;

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

    return (
        <div className="site-header">
            {bannerSection}
            <div className="site-header__nav-panel">
                <NavPanel layout={layout} />
            </div>
        </div>
    );
}

export default memo(Header);
