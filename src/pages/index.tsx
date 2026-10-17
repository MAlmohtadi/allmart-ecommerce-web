// @ts-nocheck
// application
import MainPage, { InitData } from "../components/main/MainPage";
import mainApi, { DEFAULT_LOCALE, normalizeHomePageInfo } from "../api/main";
import { wrapper } from "../store/store";
import getHomePageInfo, { defaultLocaleRedirect } from "../store/main/mainHelpers";
import { useLocale } from "../store/locale/localeHooks";

export interface PageProps {
    initData: InitData;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { locale = DEFAULT_LOCALE } = context.query;
    let homePageInfo = await mainApi.getHomePageInfo({ locale: locale });
    if (!homePageInfo) {
        // unknown/inactive ?locale (or the API failed for it): show the Arabic page instead of a 500
        if (locale !== DEFAULT_LOCALE) {
            return defaultLocaleRedirect("/");
        }
        homePageInfo = normalizeHomePageInfo(null);
    }
    await getHomePageInfo(store);
    return {
        props: {
            initData: {
                ...homePageInfo,
            },
        },
    };
});

function Page(props: PageProps) {
    const { initData } = props;

    return <MainPage initData={initData} />;
}

export default Page;
