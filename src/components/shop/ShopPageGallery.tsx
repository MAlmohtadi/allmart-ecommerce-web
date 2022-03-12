// react
import {
    Fragment,
    useCallback,
    useMemo,
    useState,
} from 'react';

// third-party
import Head from 'next/head';
// application
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';
import AppLink from '../shared/AppLink';

export interface Images {
    id: number;
    imageName: string;
    imageUrl: string;
    order: number;
}

export interface InitData {
    gallery?: Images[];
}
export interface ShopPageGalleryProps {
    initData?: InitData;
}

function ShopPageCategory(props: ShopPageGalleryProps) {
    const { initData } = props;

    const images = initData?.gallery.map((image, index) => (
        <div
            key={index}
            style={{
                flex: '50%',
                maxWidth: '50%',
                padding: '0 4px',
            }}
        >
            <img
                style={{
                    marginTop: '8px',
                    verticalAlign: 'middle',
                    width: '100%',
                    boxShadow: '0 1px 16px rgba(#000, .04)',
                    aspectRatio: '3/2',
                }}
                src={image.imageUrl}
                alt={`${image.imageName}`}
            />
        </div>
    ));
    const breadcrumb = [
        { title: 'الرئيسية', url: url.home() },
        { title: 'معرض الصور', url: url.accountDashboard() },
    ];
    return (
        <Fragment>
            <Head>
                <title>معرض الصور - جبران</title>
            </Head>
            <PageHeader header="معرض الصور" breadcrumb={breadcrumb} />

            <div className="block block--highlighted block-categories block-categories--layout--compact">
                <div className="container">
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '0 4px',
                    }}
                    >
                        {images}
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default ShopPageCategory;
