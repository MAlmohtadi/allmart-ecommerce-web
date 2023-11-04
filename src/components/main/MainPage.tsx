// react
import { Fragment, useMemo } from "react";

// third-party
import Head from "next/head";

// application
import mainApi from "../../api/main";
import { useDeferredData } from "../../services/hooks";

import BlockProductsCarouselMain from "../blocks/BlockProductsCarouselMain";

import { IHomePageInfo, ICategory, IAboutUs, IMenu, IFooter, ITranslation, IBanner, ILanguage } from "../../interfaces/main";
import { useLanguage, useLocale } from "../../store/locale/localeHooks";
import BlockSlideShowMain from "../blocks/BlockSlideShowMain";
import BlockCategoriesMain from "../blocks/BlockCategoriesMain";
import BlockHeader from "../shared/BlockHeader";
import FooterMain from "../footer/FooterMain";
import MobileHeaderMain from "../mobile/MobileHeaderMain";
import HeaderMain from "../header/HeaderMain";
import { useRouter } from "next/router";
// import languages from "../../i18n";

export interface InitData {
    homePageInfo?: IHomePageInfo;
    categories: ICategory[];
    aboutUs: IAboutUs;
    banners: IBanner[];
    menuList: IMenu[];
    footer: IFooter;
    translations: ITranslation;
    languages:ILanguage[]
}

export interface HomePageProps {
    initData: InitData; 
}

function MainPage(props: HomePageProps) {
    const { initData } = props;
    const locale = useLocale();
    //    const categories= useMainCategories();
    const route = useRouter();
   
    return (
        <Fragment>
            <header className="site__header d-lg-none">
                <MobileHeaderMain />
            </header>

            <header className="site__header d-lg-block d-none">
                <HeaderMain menuList={initData?.menuList} langueges={initData?.languages}/>
            </header>
            <Head>
                <title>جبران</title>
            </Head>

            <BlockSlideShowMain banners={initData?.banners} />

            <BlockCategoriesMain
                title={initData?.translations?.productsTranslation}
                layout="classic"
                categories={initData?.categories}
            />

            <div id="aboutus" className={`block block--highlighted block-categories block-categories--layout--classic`}>
                <div className="container">
                    <BlockHeader title={initData?.translations?.aboutUsTranslation} />

                    <div className="block-categories__list">
                        <div dangerouslySetInnerHTML={{ __html: initData?.aboutUs?.content }} />
                    </div>
                </div>
            </div>

            {/* <FooterMain footer={homePageInfo?.data?.footer}/> */}

            <footer className="site__footer">
                <FooterMain footer={initData.footer}/>
            </footer>
        </Fragment>
    );
}

export default MainPage;
