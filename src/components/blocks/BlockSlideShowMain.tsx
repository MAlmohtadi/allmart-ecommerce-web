// react
import { useEffect, useRef } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import departmentsService from '../../services/departmentsService';
import StroykaSlick from '../shared/StroykaSlick';
import { useMedia } from '../../services/hooks';
// import { IHomePageResponse } from '../../interfaces/homepage';
import url from '../../services/url';
import { IBanner } from '../../interfaces/main';

export interface BlockSlideShowProps {
    withDepartments?: boolean;
    banners?: IBanner[];
}

const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
};

function BlockSlideShowMain(props: BlockSlideShowProps) {
    const { withDepartments = false, banners=[] } = props;
    const departmentsAreaRef = useRef<HTMLDivElement | null>(null);
    const isDesktop = useMedia('(min-width: 992px)');

    useEffect(() => () => {
        departmentsService.area = null;
    }, []);

    useEffect(() => {
        departmentsService.area = departmentsAreaRef.current;
    }, [isDesktop, departmentsAreaRef]);

    const blockClasses = classNames(
        'block-slideshow block',
        {
            'block-slideshow--layout--full': !withDepartments,
            'block-slideshow--layout--with-departments': withDepartments,
        },
    );

    const layoutClasses = classNames(
        'col-12',
        {
            'col-lg-12': !withDepartments,
            'col-lg-9': withDepartments,
        },
    );
    var slidesList;
    // a banner without an image (null, or a legacy ".../null" URL) would only be an empty slide with a dot
    const bannersWithImage = (banners || []).filter((slide) => slide.imageUrl && !/\/null$/.test(slide.imageUrl));
    if(bannersWithImage.length> 0){
        slidesList = bannersWithImage.map((slide, index) => {
        // the API already returns an encoded https URL: do not encode it again, only escape it for a CSS string
        const image = slide.imageUrl.replace(/["\\]/g, '\\$&');
        // inline so the shared slideshow scss offsets (-190px / -70px / top center) do not apply
        const imageStyle = {
            backgroundImage: `url("${image}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };

        return (
            <div key={index} className="block-slideshow__slide">
                <div
                    className="block-slideshow__slide-image block-slideshow__slide-image--desktop"
                    style={imageStyle}
                />
                <div
                    className="block-slideshow__slide-image block-slideshow__slide-image--mobile"
                    style={imageStyle}
                />
            </div>
            );
        });
    }

    return (
        <>
        {slidesList &&
        <div className={blockClasses}>
            <div className="container">
                <div className="row">
                    <div className={layoutClasses}>
                        <div className="block-slideshow__body">
                            <StroykaSlick {...slickSettings}>
                                {slidesList}
                            </StroykaSlick>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    );
}

export default BlockSlideShowMain;
