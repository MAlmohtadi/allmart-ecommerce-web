// application
import AppLink from '../shared/AppLink';
import { IComment } from '../../interfaces/comment';

export interface BlogCommentsListProps {
    comments?: IComment[];
    level?: number;
}

function BlogCommentsList(props: BlogCommentsListProps) {
    const { level = 0, comments = [] } = props;

    const commentsList = comments.map((comment) => {
        let children;

        if (comment.children && comment.children.length) {
            children = (
                <div>
                    <BlogCommentsList comments={comment.children} level={level + 1} />
                </div>
            );
        }

        return (
            <li key={comment.id} className="comments-list__item">
                <div className="comment">
                    <div className="comment__avatar">
                        <AppLink href="/"><img src={comment.avatar} alt="" /></AppLink>
                    </div>
                    <div className="comment__content">
                        <div className="comment__header">
                            <div className="comment__author">
                                <AppLink href="/">{comment.author}</AppLink>
                            </div>
                            <div className="comment__reply">
                                <button type="button" className="btn btn-xs btn-light">Reply</button>
                            </div>
                        </div>
                        <div className="comment__text">{comment.text}</div>
                        <div className="comment__date">{comment.date}</div>
                    </div>
                </div>
                {children}
            </li>
        );
    });

    return (
        <ol className={`comments-list comments-list--level--${level}`}>
            {commentsList}
        </ol>
    );
}

export default BlogCommentsList;
