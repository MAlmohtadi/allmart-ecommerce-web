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

    const slidesList = banners?.map((slide, index) => {
        const image = slide.imageUrl;

        return (
            <div key={index} className="block-slideshow__slide">
                <div
                    className="block-slideshow__slide-image block-slideshow__slide-image--desktop"
                    style={{
                        backgroundImage: `url('${image}')`,
                        backgroundRepeat: 'round',
                    }}
                />
                <div
                    className="block-slideshow__slide-image block-slideshow__slide-image--mobile"
                    style={{
                        backgroundImage: `url('${image}')`,
                        backgroundRepeat: 'round',
                    }}
                />
            </div>
        );
    });

    return (
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
    );
}

export default BlockSlideShowMain;
