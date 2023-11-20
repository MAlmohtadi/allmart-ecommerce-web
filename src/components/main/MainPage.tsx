// react
import { Fragment, useMemo } from "react";

// third-party
import Head from "next/head";

import {
    IHomePageInfo,
    ICategory,
    IAboutUs,
    IMenu,
    IFooter,
    ITranslation,
    IBanner,
    ILanguage,
} from "../../interfaces/main";
import BlockSlideShowMain from "../blocks/BlockSlideShowMain";
import BlockCategoriesMain from "../blocks/BlockCategoriesMain";
import BlockHeader from "../shared/BlockHeader";
import FooterMain from "../footer/FooterMain";
import MobileHeaderMain from "../mobile/MobileHeaderMain";
import HeaderMain from "../header/HeaderMain";
import AppLink from "../shared/AppLink";
import MobileMenuMain from "../mobile/MobileMenuMain";

export interface InitData {
    homePageInfo?: IHomePageInfo;
    categories: ICategory[];
    catalogUrl: string;
    aboutUs: IAboutUs;
    banners: IBanner[];
    menuList: IMenu[];
    footer: IFooter;
    translations: ITranslation;
    languages: ILanguage[];
}

export interface HomePageProps {
    initData: InitData;
}

function MainPage(props: HomePageProps) {
    const { initData } = props;

    return (
        <Fragment>
            <header className="site__header d-lg-none">
                <MobileMenuMain menuList={initData?.menuList} langueges={initData?.languages} />
                <MobileHeaderMain />
            </header>

            <header className="site__header d-lg-block d-none">
                <HeaderMain menuList={initData?.menuList} langueges={initData?.languages} />
            </header>
            <Head>
                <title>جبران</title>
            </Head>

            <BlockSlideShowMain banners={initData?.banners} />
            <div className={`block block--highlighted block-categories block-categories--layout--classic`}>
                <div className="container">
                    <AppLink href={initData?.catalogUrl} target="_blank" className="btn btn-primary btn-xl btn-block">
                        {initData?.translations?.downloadCatalogTranslation}
                    </AppLink>
                </div>
            </div>
            <div
                id="products"
                className={`block block--highlighted block-categories block-categories--layout--classic`}
            >
                <div className="container">
                    <BlockCategoriesMain
                        title={initData?.translations?.productsTranslation}
                        layout="classic"
                        categories={initData?.categories}
                    />
                </div>
            </div>
            <div id="aboutus" className={`block block-categories block-categories--layout--classic`}>
                <div className="container">
                    <BlockHeader title={initData?.translations?.aboutUsTranslation} />

                    <div className="block-categories__list">
                        <div dangerouslySetInnerHTML={{ __html: initData?.aboutUs?.content }} />
                    </div>
                </div>
            </div>

            {/* <FooterMain footer={homePageInfo?.data?.footer}/> */}

            <footer className="site__footer block--highlighted ">
                <FooterMain footer={initData.footer} />
            </footer>
        </Fragment>
    );
}

export default MainPage;
