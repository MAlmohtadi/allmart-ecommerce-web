// application
import AppLink from '../shared/AppLink';
import { IComment } from '../../interfaces/comment';

export interface WidgetCommentsProps {
    comments?: IComment[];
}

function WidgetComments(props: WidgetCommentsProps) {
    const { comments = [] } = props;
    const commentsList = comments.map((comment) => (
        <li key={comment.id} className="widget-comments__item">
            <div className="widget-comments__author">
                <AppLink href="/">{comment.author}</AppLink>
            </div>
            <div className="widget-comments__content">{comment.text}</div>
            <div className="widget-comments__meta">
                <div className="widget-comments__date">{comment.date}</div>
                <div className="widget-comments__name">
                    On
                    <AppLink href="/" title={comment.postTitle}>{comment.postTitle}</AppLink>
                </div>
            </div>
        </li>
    ));

    return (
        <div className="widget-comments widget">
            <h4 className="widget__title">Latest Comments</h4>
            <ul className="widget-comments__list">
                {commentsList}
            </ul>
        </div>
    );
}

export default WidgetComments;
