// react
import { Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';

function SiteCancelAccount() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Cancel Acount', url: '' },
    ];

    return (
        <Fragment>
            <Head>
                <title>{`Cancel Acount — ${theme.name}`}</title>
            </Head>

            <PageHeader breadcrumb={breadcrumb} />
            <div>
                <div style={{ textAlign: 'center', paddingTop: 10, fontSize: 50 }}>
                    Delete your account on Jubran app
                </div>
                <div style={{ textAlign: 'center', fontSize: 25 }}>
                    This will erase all your user data from Jubran app
                </div>
                <hr />

                <div style={{ textAlign: 'center' }}>Step 1 - Go to you account:</div>

                <div style={{ textAlign: 'center', fontSize: 25 }}>
                    <img src="http://d2lvg8bewfotlm.cloudfront.net/account-image.jpg" width="300" height="500" alt="" />
                </div>
                <div style={{ textAlign: 'center', fontSize: 25 }}>Step 2 - Choose cancel account</div>
                <div style={{ textAlign: 'center' }}>
                    <img src="http://d2lvg8bewfotlm.cloudfront.net/cancel-account.jpeg" width="300" height="500" alt="" />
                </div>
            </div>
        </Fragment>
    );
}

export default SiteCancelAccount;
