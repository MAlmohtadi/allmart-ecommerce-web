// application
import MainPage, { InitData } from "../components/main/MainPage";
import mainApi from "../api/main";
import { wrapper } from "../store/store";
import getHomePageInfo from "../store/main/mainHelpers";
import { useLocale } from "../store/locale/localeHooks";

export interface PageProps {
    initData?: InitData;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    //    const locale=useLocale();
    console.log(context);
    const homePageInfo = await mainApi.getHomePageInfo({ locale: context.query.locale||'en_US' });
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
