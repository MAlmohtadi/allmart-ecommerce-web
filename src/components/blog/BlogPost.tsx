// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import BlogCommentsList from './BlogCommentsList';

// data stubs
import dataBlogPostComments from '../../data/blogPostComments';
import dataBlogPosts from '../../data/blogPosts';

export type BlogPostLayout = 'classic' | 'full';

export interface BlogPostProps {
    layout?: BlogPostLayout;
}

function BlogPost(props: BlogPostProps) {
    const { layout = 'classic' } = props;

    const postClasses = classNames('post__content typography', {
        'typography--expanded': layout === 'full',
    });

    const relatedPostsList = dataBlogPosts.slice(0, 2).map((relatedPost) => (
        <div key={relatedPost.id} className="related-posts__item post-card post-card--layout--related">
            <div className="post-card__image">
                <AppLink href="/">
                    <img src={relatedPost.image} alt="" />
                </AppLink>
            </div>
            <div className="post-card__info">
                <div className="post-card__name">
                    <AppLink href="/">{relatedPost.title}</AppLink>
                </div>
                <div className="post-card__date">{relatedPost.date}</div>
            </div>
        </div>
    ));

    return (
        <div className={`block post post--layout--${layout}`}>
            <div className={`post__header post-header post-header--layout--${layout}`}>
                <div className="post-header__categories">
                    <AppLink href="/">Latest news</AppLink>
                </div>
                <h1 className="post-header__title">Morbi Interdum Velit Quis Magna Placerat Lobortis Eget</h1>
                <div className="post-header__meta">
                    <div className="post-header__meta-item">
                        By
                        <AppLink href="/">Jessica Moore</AppLink>
                    </div>
                    <div className="post-header__meta-item"><AppLink href="/">November 30, 2018</AppLink></div>
                    <div className="post-header__meta-item"><AppLink href="/">4 Comments</AppLink></div>
                </div>
            </div>

            <div className="post__featured">
                <AppLink href="/">
                    <img src="/images/posts/post-featured.jpg" alt="" />
                </AppLink>
            </div>

            <div className={postClasses}>
                <p>
                    Vestibulum sagittis justo sit amet nisl semper, et pulvinar elit maximus. Morbi
                    interdum velit quis magna placerat lobortis eget pharetra magna. Nulla
                    tristique sollicitudin turpis, eget maximus risus faucibus non. Nulla
                    vestibulum ipsum risus, vitae maximus nunc bibendum quis.
                </p>
                <p>
                    raesent eu consequat nibh. Quisque
                    <i>ullamcorper</i>
                    , augue eu fringillasodales, leo metus volutpat risus, at suscipit ipsum
                    diam eget sem. Maecenas dictum elit in enim molestie,
                    <AppLink href="/">vel sollicitudin erat ultricies</AppLink>
                    . Sed risus tellus, molestie finibus
                    dui quis, suscipit consequat ex.
                </p>
                <blockquote>
                    <p>
                        Sed a dictum elit. In iaculis porttitor luctus. Maecenas ultricies dolor et
                        semper placerat. Proin at lectus felis.
                    </p>
                    <p><cite>John Mcarthy</cite></p>
                </blockquote>
                <p>
                    Vivamus in nisi at turpis rhoncus feugiat. Mauris scelerisque non ante et
                    ultrices. Donec sit amet sem lobortis, ullamcorper felis at, finibus sem.
                    Curabitur tincidunt neque nunc.
                </p>
                <h3>Nam Eget Blandit Diam</h3>
                <p>
                    Quisque semper magna eget libero maximus, a sollicitudin nunc hendrerit. Cras
                    efficitur, ante vitae fringilla rutrum, mi tortor dapibus metus, in egestas
                    metus erat sit amet orci. Ut faucibus non ante dapibus efficitur. Nam eget
                    blandit diam, imperdiet condimentum neque. Donec risus nisi, aliquet a commodo
                    ac, elementum vitae leo.
                </p>
                <p>
                    Vestibulum sagittis justo sit amet nisl semper, et pulvinar elit maximus. Morbi
                    interdum velit quis magna placerat lobortis eget pharetra magna.
                </p>
                <p>
                    <strong>Nulla fringilla:</strong>
                    <AppLink href="/">Donec aliquet at felis et dignissim</AppLink>
                </p>
                <figure>
                    <AppLink href="/">
                        <img src="/images/posts/post-featured.jpg" alt="" />
                    </AppLink>
                    <figcaption>Nunc viverra, dui nec commodo dignissim, libero arcu.</figcaption>
                </figure>
                <p>
                    Vestibulum non varius lectus. Cras vel elit id ligula laoreet imperdiet. Mauris
                    quis laoreet velit. Suspendisse sed velit nec ante facilisis pharetra.
                </p>
                <p>
                    Phasellus ut elit vestibulum, dignissim mi non, suscipit ex. Praesent eu
                    consequat nibh. Quisque ullamcorper, augue eu fringilla sodales, leo metus
                    volutpat risus,
                    <AppLink href="/">at suscipit ipsum diam eget sem</AppLink>
                    . Maecenas dictum elit in enim molestie,
                    vel sollicitudin erat ultricies. Sed risus tellus, molestie finibus dui quis,
                    suscipit consequat ex.
                </p>
                <hr />
                <h2>Nunc Dapibus Varius Ligula</h2>
                <p>
                    Maecenas ultrices arcu ut feugiat semper. Praesent dictum tincidunt justo, ac
                    tincidunt ante fermentum at. Vestibulum non varius lectus. Cras vel elit id
                    ligula laoreet imperdiet. Mauris quis laoreet velit. Suspendisse sed velit
                    nec ante facilisis pharetra. Duis vitae fermentum elit. Integer ac mattis elit.
                </p>
                <p>
                    Mauris scelerisque non ante et ultrices. Donec sit amet sem lobortis:
                </p>
                <ol>
                    <li>
                        Duis
                        <strong>finibus imperdiet ultricies</strong>
                        . Donec vel pretium turpis. In auctor euismod posuere.
                    </li>
                    <li>
                        Praesent dictum tincidunt justo, ac tincidunt ante fermentum at. Vestibulum
                        non varius lectus. Cras vel elit id ligula laoreet imperdiet.
                    </li>
                    <li>
                        <strong>In iaculis porttitor luctus</strong>
                        . Maecenas ultricies dolor et semper placerat. Proin at lectus felis.
                        Quisque dapibus auctor justo id dictum.
                    </li>
                </ol>
                <p>
                    Ut faucibus non ante dapibus efficitur. Nam eget blandit diam, imperdiet
                    condimentum neque. Donec risus nisi, aliquet a commodo ac, elementum vitae leo.
                </p>
            </div>

            <div className="post__footer">
                <div className="post__tags-share-links">
                    <div className="post__tags tags">
                        <div className="tags__list">
                            <AppLink href="/">Promotion</AppLink>
                            <AppLink href="/">Power Tool</AppLink>
                            <AppLink href="/">Wrench</AppLink>
                            <AppLink href="/">Electrodes</AppLink>
                        </div>
                    </div>
                    <div className="post__share-links share-links">
                        <ul className="share-links__list">
                            <li className="share-links__item share-links__item--type--like"><AppLink href="/">Like</AppLink></li>
                            <li className="share-links__item share-links__item--type--tweet"><AppLink href="/">Tweet</AppLink></li>
                            <li className="share-links__item share-links__item--type--pin"><AppLink href="/">Pin It</AppLink></li>
                            <li className="share-links__item share-links__item--type--counter"><AppLink href="/">4K</AppLink></li>
                        </ul>
                    </div>
                </div>
                <div className="post-author">
                    <div className="post-author__avatar">
                        <AppLink href="/">
                            <img src="/images/avatars/avatar-1.jpg" alt="" />
                        </AppLink>
                    </div>
                    <div className="post-author__info">
                        <div className="post-author__name">
                            <AppLink href="/">Jessica Moore</AppLink>
                        </div>
                        <div className="post-author__about">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            suscipit suscipit mi, non tempor nulla finibus eget. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit.
                        </div>
                    </div>
                </div>
            </div>
            <section className="post__section">
                <h4 className="post__section-title">Related Posts</h4>
                <div className="related-posts">
                    <div className="related-posts__list">
                        {relatedPostsList}
                    </div>
                </div>
            </section>

            <section className="post__section">
                <h4 className="post__section-title">{`Comments (${dataBlogPostComments.total})`}</h4>

                <BlogCommentsList comments={dataBlogPostComments.items} />
            </section>

            <section className="post__section">
                <h4 className="post__section-title">Write A Comment</h4>

                <form>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="comment-first-name">First Name</label>
                            <input type="text" className="form-control" id="comment-first-name" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="comment-last-name">Last Name</label>
                            <input type="text" className="form-control" id="comment-last-name" placeholder="Last Name" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="comment-email">Email Address</label>
                            <input type="email" className="form-control" id="comment-email" placeholder="Email Address" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment-content">Comment</label>
                        <textarea className="form-control" id="comment-content" rows={6} />
                    </div>
                    <div className="form-group mt-4">
                        <button type="submit" className="btn btn-primary btn-lg">Post Comment</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default BlogPost;
