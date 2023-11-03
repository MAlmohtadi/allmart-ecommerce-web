// react
import { Fragment, PropsWithChildren, useEffect } from "react";

// third-party
import { ToastContainer } from "react-toastify";

// application
import Footer from "./footer/Footer";
import Header, { HeaderLayout } from "./header/Header";
import MobileHeader from "./mobile/MobileHeader";
import MobileMenu from "./mobile/MobileMenu";
import { useRouter } from "next/router";
import MobileMenuMain from "./mobile/MobileMenuMain";
import HeaderMain from "./header/HeaderMain";
import MobileHeaderMain from "./mobile/MobileHeaderMain";
import FooterMain from "./footer/FooterMain";
import { useMain } from "../store/main/mainHooks";
import mainApi from "../api/main";
import { useDeferredData } from "../services/hooks";
import { useLocale } from "../store/locale/localeHooks";
// import Quickview from './shared/Quickview';

export interface LayoutProps extends PropsWithChildren<{}> {
    headerLayout: HeaderLayout;
}

function Layout(props: LayoutProps) {
    const { children, headerLayout } = props;
    const route = useRouter();

    return (
        <Fragment>
            <ToastContainer autoClose={5000} hideProgressBar />

            {/* <Quickview /> */}

            {route.pathname !== "/" && <MobileMenu />}

            <div className="site">
                {route.pathname !== "/" && (
                    <header className="site__header d-lg-none">
                        <MobileHeader />
                    </header>
                )}

                <header className="site__header d-lg-block d-none">{route.pathname !== "/" && <Header />}</header>

                <div className="site__body">{children}</div>

                {route.pathname !== "/" && (
                    <footer className="site__footer">
                        <Footer />
                    </footer>
                )}
            </div>
        </Fragment>
    );
}

export default Layout;
