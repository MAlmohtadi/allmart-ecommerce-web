// react
import { Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';

function SiteSocial() {
    const breadcrumb = [
        { title: 'الرئيسية', url: '' },
        { title: 'صفحات التواصل', url: '' },
    ];

    return (
        <Fragment>
            <Head>
                <title>{`صفحات التواصل — ${theme.name}`}</title>
            </Head>

            <PageHeader header="صفحات التواصل" breadcrumb={breadcrumb} />
            <div className="block">
                <div className="container">
                    <div className="contact-us__container">
                        <div className="social-row">
                            <div>
                                <a href="https://www.facebook.com/jubranjoo" target="_blank" rel="noreferrer">
                                    <div className="brand-name">Facebook</div>
                                    <i className="fab fa-facebook fa-10x blue-color brand-logo" />
                                </a>
                            </div>
                            <div>
                                <a href="https://www.instagram.com/jubran.jo/" target="_blank" rel="noreferrer">
                                    <div className="brand-name">Instagram</div>
                                    <i className="fab fa-instagram fa-10x brand-logo" />
                                </a>
                            </div>
                            <div>
                                <a href="https://vm.tiktok.com/ZSeEnHhVA/" target="_blank" rel="noreferrer">
                                    <div className="brand-name">Tiktok</div>
                                    <i className="fab fa-tiktok fa-10x brand-logo" />
                                </a>
                            </div>
                        </div>
                        <div className="social-row">
                            <div>
                                <a href="https://www.snapchat.com/add/jubran.joo" target="_blank" rel="noreferrer">
                                    <div className="brand-name">Snapchat</div>
                                    <i className="fab fa-snapchat fa-10x fa-snapchat-ghost brand-logo" />
                                </a>
                            </div>
                            <div>
                                <a href="https://youtube.com/channel/UCF-yycoEWjZ3sNy8NElgthQ" target="_blank" rel="noreferrer">
                                    <div className="brand-name">Youtube</div>
                                    <i className="fab fa-youtube  fa-10x brand-logo" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SiteSocial;
