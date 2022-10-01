/* eslint-disable */
// react
import { Fragment,
    useEffect,
    useState, } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';

import shopApi from '../../api/shop';
// data stubs
import theme from '../../data/theme';

function SiteSocial() {
    const breadcrumb = [
        { title: 'الرئيسية', url: '' },
        { title: 'صفحات التواصل', url: '' },
    ];
    
    const [socialLinks, setSocialLinks] = useState([]);
    const getSocialLinks = async () => {
        const socialLinksData = await shopApi.getSocialLinks();
        setSocialLinks(socialLinksData);
    };

    useEffect(() => {
        getSocialLinks();
    }, []);
    return (
        <Fragment>
            <Head>
                <title>{`صفحات التواصل — ${theme.name}`}</title>
            </Head>

            <PageHeader header="صفحات التواصل" breadcrumb={breadcrumb} />
            <div className="block">
                <div className="container" style={{textAlign:"center"}}>
                    <div className="contact-us__container">
                   {socialLinks &&  socialLinks.map((socialItem) => 
                     <div style={{borderColor: "black", display: "inline-block", marginRight: "65px",  marginLeft: "65px", padding:"20px", marginTop:"30px"}}>
                     <a href={socialItem['link']} target="_blank" rel="noreferrer">
                         <div className="brand-name" style={{fontSize: "25px"}}>{socialItem['title']}</div>
                        <img src={socialItem['imageLink']} style={{borderRadius: "50%", width:"130px"}}  />
                     </a>
                 </div>
                    )}
                           
                    
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SiteSocial;
