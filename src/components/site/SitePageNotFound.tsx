// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import url from '../../services/url';

function SitePageNotFound() {
    return (
        <div className="block">
            <Head>
                <title>404 الصفحة غير موجودة</title>
            </Head>

            <div className="container">
                <div className="not-found">
                    <div className="not-found__404">
                        اوبس! خطأ 404
                    </div>

                    <div className="not-found__content">
                        <h1 className="not-found__title">الصفحة غير موجودة</h1>

                        <p className="not-found__text">
                            لا يمكننا إيجاد الصفحة الذي تريد.
                            <br />
                            حاول استخدام البحث.
                        </p>

                        <form className="not-found__search">
                            <input type="text" className="not-found__search-input form-control" placeholder="البحث عن" />
                            <button type="submit" className="not-found__search-button btn btn-primary">ابحث</button>
                        </form>

                        <p className="not-found__text">
                            او اذهب للرئيسية وابدأ من جديد.
                        </p>

                        <AppLink href={url.home()} className="btn btn-secondary btn-sm">
                            الرئيسية
                        </AppLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageNotFound;
