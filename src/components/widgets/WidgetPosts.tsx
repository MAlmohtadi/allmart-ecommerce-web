// application
import AppLink from '../shared/AppLink';
import url from '../../services/url';
import { IPost } from '../../interfaces/post';

export interface WidgetPostsProps {
    posts?: IPost[];
}

function WidgetPosts(props: WidgetPostsProps) {
    const { posts = [] } = props;
    const postImage = (post: IPost) => post.image.replace(/\.jpg$/, '-thumbnail.jpg');

    const postsList = posts.map((post) => (
        <div key={post.id} className="widget-posts__item">
            <div className="widget-posts__image">
                <AppLink href={url.blogPost()}>
                    <img src={postImage(post)} alt="" />
                </AppLink>
            </div>
            <div className="widget-posts__info">
                <div className="widget-posts__name">
                    <AppLink href={url.blogPost()}>{post.title}</AppLink>
                </div>
                <div className="widget-posts__date">{post.date}</div>
            </div>
        </div>
    ));

    return (
        <div className="widget-posts widget">
            <h4 className="widget__title">Latest Posts</h4>
            <div className="widget-posts__list">
                {postsList}
            </div>
        </div>
    );
}

export default WidgetPosts;
