// react
import { useRef } from 'react';

// third-party
import Slick, { Settings } from 'react-slick';

// application
import BlockHeader from '../shared/BlockHeader';
import PostCard from '../shared/PostCard';
import StroykaSlick from '../shared/StroykaSlick';
import { IPost } from '../../interfaces/post';

export type BlockPostsLayout = 'list-sm' | 'grid-nl';

export interface BlockPostsProps {
    title: string;
    layout?: BlockPostsLayout;
    posts?: IPost[];
}

export interface BlockPostsSlickProps {
    [layout: string]: Settings;
}

const slickSettings: BlockPostsSlickProps = {
    'grid-nl': {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    },
    'list-sm': {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    },
};

function BlockPosts(props: BlockPostsProps) {
    const {
        title,
        layout = 'list-sm',
        posts = [],
    } = props;
    const slickRef = useRef<Slick | null>(null);

    const handleNextClick = () => {
        if (slickRef.current) {
            slickRef.current.slickNext();
        }
    };

    const handlePrevClick = () => {
        if (slickRef.current) {
            slickRef.current.slickPrev();
        }
    };

    const postsList = posts.map((post) => <PostCard key={post.id} post={post} />);

    return (
        <div className={`block block-posts block-posts--layout--${layout}`} data-layout={layout}>
            <div className="container">
                <BlockHeader
                    arrows
                    title={title}
                    onNext={handleNextClick}
                    onPrev={handlePrevClick}
                />

                <div className="block-posts__slider">
                    <StroykaSlick
                        ref={slickRef}
                        {...slickSettings[layout]}
                    >
                        {postsList}
                    </StroykaSlick>
                </div>
            </div>
        </div>
    );
}

export default BlockPosts;
