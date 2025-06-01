// react
import { Fragment, useMemo } from 'react';

// third-party
import Head from 'next/head';

import Cookies from "js-cookie";
import { parse } from 'cookie';
// application
import shopApi from '../../api/shop';
// import { IProduct } from '../../interfaces/product';
import { useDeferredData } from '../../services/hooks';
import { useEffect, useState } from 'react';
import {
    ITranslation,
    ILanguage,
} from "../../interfaces/main";
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
// import dataBlogPosts from '../../data/blogPosts';
import { IHomePageResponse } from '../../interfaces/homepage';
import { IProductResponse } from '../../interfaces/product';
import { useSale } from '../../store/sale/saleHooks';
import { useTranslations } from '../../store/home/homeHooks';
import BlockCategoriesCustom from '../blocks/BlockCategoriesCustom';

export interface InitData {
    homepageInfo?: IHomePageResponse;
    featuredProducts?: IProductResponse;
    offerProducts?: IProductResponse;
    translations: ITranslation;
    languages: ILanguage[];
    langId?: number;
}

export interface HomePageProps {
    initData?: InitData;
}

function HomePage(props: HomePageProps) {
    const { initData } = props;
    const isWholeSale = useSale();
    const [langId, setLangId] = useState<number | null>(initData?.langId ?? null);

    console.log("zeeeeeeeooLang: ", langId );
    const homepageInfo = useDeferredData(() => shopApi.getHomePageData({ isWholeSale, langId:langId  }), initData?.homepageInfo);
    const translations = useTranslations();
    console.log('translations', translations);
    const featuredProducts = useDeferredData(
        () => shopApi.getFeaturedProducts({ isWholeSale: false,  langId: langId  }),
        initData?.featuredProducts,
    );
    // useEffect(() => {
    //     if (initData?.homepageInfo && initData?.translations) {
    //         dispatch(homeFetchSuccess({
    //             ...initData.homepageInfo,
    //             translations: initData.translations,
    //             languages: initData.languages,
    //         }));
    //     }
    // }, [initData]);
    useEffect(() => {
        // Only runs on the client
        if (!langId) {
            const cookieLangId = Cookies.get("langId");
            if (cookieLangId) {
                setLangId(parseInt(cookieLangId));
            }
        }
    }, [langId]);
    const offerProducts = useDeferredData(
        () => shopApi.getOfferProducts({
            isWholeSale: false,
            nextPageNumber: 0,
            pageSize: 20,
            sort: 'asc',
            langId: langId ,
        }),
        initData?.offerProducts,
    );

    return (
        <Fragment>
            <Head>
                <title>جبران</title>
            </Head>

            {useMemo(
                () => (
                    <BlockSlideShow homepageInfo={homepageInfo?.data} />
                ),
                [],
            )}

            {/* {useMemo(() => <BlockFeatures layout="boxed" />, [])} */}

            {useMemo(() => (
                <BlockCategoriesCustom
                    title={homepageInfo?.data?.translations?.categories || 'التصنيفات'}
                    layout="classic"
                    categories={homepageInfo.data?.categories}
                />
            ), [])}

            {useMemo(
                () => (
                    <BlockProductsCarousel
                        title={homepageInfo?.data?.translations?.ourProducts || 'منتجاتنا'}
                        layout="grid-5"
                        rows={2}
                        products={featuredProducts.data?.products}
                        loading={featuredProducts.isLoading}
                    />
                ),
                [featuredProducts],
            )}
            {useMemo(
                () => (
                    <BlockProductsCarousel
                        title={homepageInfo?.data?.translations?.specialOffers || 'عروض خاصة'}
                        layout="grid-5"
                        rows={offerProducts.data?.products?.length || 0 > 10 ? 2 : 1}
                        products={offerProducts.data?.products}
                        loading={offerProducts.isLoading}
                    />
                ),
                [offerProducts],
            )}
        </Fragment>
    );
}


export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    const langId = parseInt(cookies.langId || '1');
    console.log("poooooooooooLang: ", langId);
    const isWholeSale = false; // or detect it from cookies/query if needed

    const homepageInfo = await shopApi.getHomePageData({ langId, isWholeSale });
    const featuredProducts = await shopApi.getFeaturedProducts({ langId, isWholeSale });
    const offerProducts = await shopApi.getOfferProducts({ langId, isWholeSale });

    return {
        props: {
            initData: {
                homepageInfo,
                featuredProducts,
                offerProducts,
                translations: {},
                languages: [],
                langId,
            },
        },
    };
}
export default HomePage;
