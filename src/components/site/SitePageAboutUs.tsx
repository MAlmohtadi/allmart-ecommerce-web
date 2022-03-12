// third-party
import Head from 'next/head';
import {
    useEffect,
    useState,
} from 'react';
// application
import AppLink from '../shared/AppLink';
import StroykaSlick from '../shared/StroykaSlick';
import url from '../../services/url';

import { useDeferredData } from '../../services/hooks';
import shopApi from '../../api/shop';

// data stubs
import theme from '../../data/theme';

const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 379,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};


function SitePageAboutUs() {
    const [content, setContent] = useState('');
    const teto = async () => {
        const tat = await shopApi.getAboutUsContent();
        setContent(tat.content);
        }
   // const pageContent: string = teto();
   useEffect(() => {
    teto();
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
                            <div  dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageAboutUs;
