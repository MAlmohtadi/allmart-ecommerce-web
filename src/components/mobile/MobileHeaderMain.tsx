// react
import {
    useEffect,
    useRef,
    useState,
    memo,
} from 'react';


// application
import AppLink from '../shared/AppLink';
import LogSvg from './LogoSvg';
import Menu18x14Svg from '../../svg/menu-18x14.svg';
import url from '../../services/url';
import { useMobileMenuOpen } from '../../store/mobile-menu/mobileMenuHooks';

function MobileHeaderMain() {
    const mobileMenuOpen = useMobileMenuOpen();

    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 70) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });

    const mobileNvbarClasses = ['mobile-header'];
    if (scrolled) {
        mobileNvbarClasses.push('scrolled-mobile');
    }
    return (
        <div className={mobileNvbarClasses.join(' ')}>
            <div className="mobile-header__panel">
                <div className="container">
                    <div className="mobile-header__body">
                       
                        <AppLink href={url.home()} className="mobile-header__logo">
                            <LogSvg />
                        </AppLink>
                        <div className="mobile-header__indicators">
                        <button type="button" className="mobile-header__menu-button" onClick={mobileMenuOpen}>
                            <Menu18x14Svg />
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(MobileHeaderMain);
