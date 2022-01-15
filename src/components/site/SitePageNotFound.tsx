// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import url from '../../services/url';

// data stubs
import theme from '../../data/theme';

function SitePageNotFound() {
    return (
        <div className="block">
            <Head>
                <title>{`404 Page Not Found — ${theme.name}`}</title>
            </Head>

            <div className="container">
                <div className="not-found">
                    <div className="not-found__404">
                        Oops! Error 404
                    </div>

                    <div className="not-found__content">
                        <h1 className="not-found__title">Page Not Found</h1>

                        <p className="not-found__text">
                            We can&apos;t seem to find the page you&apos;re looking for.
                            <br />
                            Try to use the search.
                        </p>

                        <form className="not-found__search">
                            <input type="text" className="not-found__search-input form-control" placeholder="Search Query..." />
                            <button type="submit" className="not-found__search-button btn btn-primary">Search</button>
                        </form>

                        <p className="not-found__text">
                            Or go to the home page to start over.
                        </p>

                        <AppLink href={url.home()} className="btn btn-secondary btn-sm">
                            Go To Home Page
                        </AppLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageNotFound;
