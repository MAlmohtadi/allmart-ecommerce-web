// react
import { ReactNode, Fragment } from 'react';

// third-party
import classNames from 'classnames';
import { useRouter } from 'next/router';

// application
import AppLink from '../shared/AppLink';
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';
import { useHome } from '../../store/home/homeHooks';

export interface AccountLayoutProps {
    children?: ReactNode;
}

function AccountLayout(props: AccountLayoutProps) {
     const homeData = useHome();
     const translations = homeData?.translations
    const { children } = props;
    const router = useRouter();

    const breadcrumb = [
        { title: translations?.home || 'الرئيسية', url: url.home() },
        { title: translations?.myAccount || 'حسابي', url: url.accountDashboard() },
    ];

    const items = [
        { title: translations?.myInformation || 'معلوماتي', link: url.accountProfile() },
        { title: translations?.orders || 'الطلبات', link: url.accountOrders() },
    ].map((item, index) => {
        const isActive = router.pathname === item.link.href;
        const classes = classNames('account-nav__item', {
            'account-nav__item--active': isActive,
        });

        return (
            <li key={index} className={classes}>
                <AppLink href={item.link}>{item.title}</AppLink>
            </li>
        );
    });

    return (
        <Fragment>
            <PageHeader header={translations?.myAccount} breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3 d-flex">
                            <div className="account-nav flex-grow-1">
                                <h4 className="account-nav__title">{translations?.browse}</h4>
                                <ul>{items}</ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 mt-4 mt-lg-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AccountLayout;
