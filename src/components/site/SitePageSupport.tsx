// react
import { Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';

function SitePageSupport() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Support', url: '' },
    ];

    return (
        <Fragment>
            <Head>
                <title>{`Support — ${theme.name}`}</title>
            </Head>

            <PageHeader breadcrumb={breadcrumb} />
            <div>
                <div style={{ textAlign: 'center', paddingTop: 40, fontSize: 60 }}> Contact support email </div>

                <div style={{ textAlign: 'center', fontSize: 35 }}> info@bountiestodayjo.com </div>
            </div>
        </Fragment>
    );
}

export default SitePageSupport;
