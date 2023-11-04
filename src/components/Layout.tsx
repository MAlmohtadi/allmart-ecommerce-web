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
import { useLocale, useLocaleChange } from "../store/locale/localeHooks";
import Quickview from "./shared/Quickview";
// import Quickview from './shared/Quickview';

export interface LayoutProps extends PropsWithChildren<{}> {
    headerLayout: HeaderLayout;
}

function Layout(props: LayoutProps) {
    const { children, headerLayout } = props;
    const route = useRouter();
    const localeChange = useLocaleChange();
    useEffect(() => {
        if (route.pathname !== "/" && !route.pathname.startsWith("/categories")) {
            localeChange("ar");
        } else {
            const { locale = "en" } = route.query;
            localeChange(locale.split("_")[0]);
        }
    });
    return (
        <Fragment>
            <ToastContainer autoClose={5000} hideProgressBar />

            <Quickview />

            {route.pathname !== "/" && !route.pathname.startsWith("/categories") && <MobileMenu />}

            <div className="site">
                {route.pathname !== "/" && !route.pathname.startsWith("/categories") && (
                    <header className="site__header d-lg-none">
                        <MobileHeader />
                    </header>
                )}

                <header className="site__header d-lg-block d-none">
                    {route.pathname !== "/" && !route.pathname.startsWith("/categories") && <Header />}
                </header>

                <div className="site__body">{children}</div>

                {route.pathname !== "/" && !route.pathname.startsWith("/categories") && (
                    <footer className="site__footer">
                        <Footer />
                    </footer>
                )}
            </div>
        </Fragment>
    );
}

export default Layout;
