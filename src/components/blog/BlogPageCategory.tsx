// react
import { useState, Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import BlogSidebar from './BlogSidebar';
import PageHeader from '../shared/PageHeader';
import Pagination from '../shared/Pagination';
import PostCard, { PostCardLayout } from '../shared/PostCard';

// data stubs
import dataBlogPosts from '../../data/blogPosts';
import theme from '../../data/theme';

export type BlogPageCategoryLayout = 'classic' | 'grid' | 'list';

export type BlogPageCategorySidebarPosition = 'start' | 'end';

export interface BlogPageCategoryProps {
    layout?: BlogPageCategoryLayout;
    sidebarPosition?: BlogPageCategorySidebarPosition;
}

function BlogPageCategory(props: BlogPageCategoryProps) {
    const { layout = 'classic', sidebarPosition = 'start' } = props;
    const [page, setPage] = useState(1);

    const breadcrumb = [
        { title: 'Home', url: '/' },
        { title: 'Blog', url: '/' },
        { title: 'Latest News', url: '/' },
    ];

    let sidebarStart;
    let sidebarEnd;

    const sidebar = <BlogSidebar position={sidebarPosition} />;

    if (sidebarPosition === 'start') {
        sidebarStart = <div className="col-12 col-lg-4 order-1 order-lg-0">{sidebar}</div>;
    } else if (sidebarPosition === 'end') {
        sidebarEnd = <div className="col-12 col-lg-4">{sidebar}</div>;
    }

    const postsList = dataBlogPosts.map((post) => {
        const layoutMap: {[layout: string]: PostCardLayout} = {
            classic: 'grid-lg',
            grid: 'grid-nl',
            list: 'list-nl',
        };

        return (
            <div key={post.id} className="posts-list__item">
                <PostCard post={post} layout={layoutMap[layout]} />
            </div>
        );
    });

    return (
        <Fragment>
            <Head>
                <title>{`Blog Category Page — ${theme.name}`}</title>
            </Head>

            <PageHeader header="Latest News" breadcrumb={breadcrumb} />

            <div className="container">
                <div className="row">
                    {sidebarStart}
                    <div className="col-12 col-lg-8">
                        <div className="block">
                            <div className="posts-view">
                                <div className={`posts-view__list posts-list posts-list--layout--${layout}`}>
                                    <div className="posts-list__body">
                                        {postsList}
                                    </div>
                                </div>
                                <div className="posts-view__pagination">
                                    <Pagination
                                        current={page}
                                        siblings={2}
                                        total={10}
                                        onPageChange={setPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {sidebarEnd}
                </div>
            </div>
        </Fragment>
    );
}

export default BlogPageCategory;
