// third-party
import classNames from 'classnames';

// application
import AppLink from './AppLink';
import url from '../../services/url';
import { IPost } from '../../interfaces/post';

export type PostCardLayout = 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm';

export interface PostCardProps {
    post: IPost;
    layout?: PostCardLayout;
}

function PostCard(props: PostCardProps) {
    const { post, layout } = props;
    const cardClasses = classNames(
        'post-card',
        {
            'post-card--layout--grid': layout && ['grid-nl', 'grid-lg'].includes(layout),
            'post-card--layout--list': layout && ['list-nl', 'list-sm'].includes(layout),
            'post-card--size--nl': layout && ['grid-nl', 'list-nl'].includes(layout),
            'post-card--size--lg': layout === 'grid-lg',
            'post-card--size--sm': layout === 'list-sm',
        },
    );
    const categories = post.categories.map((category, index) => (
        <AppLink key={index} href={url.blogCategory()}>{category}</AppLink>
    ));

    return (
        <div className={cardClasses}>
            <div className="post-card__image">
                <AppLink href={url.blogPost()}>
                    <img src={post.image} alt="" />
                </AppLink>
            </div>
            <div className="post-card__info">
                <div className="post-card__category">
                    {categories}
                </div>
                <div className="post-card__name">
                    <AppLink href={url.blogPost()}>
                        {post.title}
                    </AppLink>
                </div>
                <div className="post-card__date">{post.date}</div>
                <div className="post-card__content">
                    In one general sense, philosophy is associated with wisdom,
                    intellectual culture and a search for knowledge.
                    In that sense, all cultures...
                </div>
                <div className="post-card__read-more">
                    <AppLink href="/" className="btn btn-secondary btn-sm">
                        Read More
                    </AppLink>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
