// third-party
import Head from 'next/head';
import {
    useEffect,
    useState,
} from 'react';
// application

import shopApi from '../../api/shop';

// data stubs
import theme from '../../data/theme';

function SitePageAboutUs() {
    const [content, setContent] = useState('');
    const pageContent = async () => {
        const pageContentData = await shopApi.getAboutUsContent();
        setContent(pageContentData.content);
    };

    useEffect(() => {
        pageContent();
    }, []);

    return (
        <div className="block about-us">
            <Head>
                <title>{`About Us — ${theme.name}`}</title>
            </Head>

            <div className="about-us__image" style={{ backgroundImage: 'url("/images/aboutus.jpg")' }} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="about-us__body">
                            <h1 className="about-us__title">من نحن</h1>
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageAboutUs;
