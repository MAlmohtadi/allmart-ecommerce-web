// react
import { ReactNode, Fragment } from 'react';

// third-party
import classNames from 'classnames';
import { useRouter } from 'next/router';

// application
import AppLink from '../shared/AppLink';
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';

export interface AccountLayoutProps {
    children?: ReactNode;
}

function AccountLayout(props: AccountLayoutProps) {
    const { children } = props;
    const router = useRouter();

    const breadcrumb = [
        { title: 'Home', url: url.home() },
        { title: 'My Account', url: url.accountDashboard() },
    ];

    const items = [
        { title: 'Dashboard', link: url.accountDashboard() },
        { title: 'Edit Profile', link: url.accountProfile() },
        { title: 'Order History', link: url.accountOrders() },
        { title: 'Order Details', link: url.accountOrder({ id: 5 }) },
        { title: 'Addresses', link: url.accountAddresses() },
        { title: 'Edit Address', link: url.accountAddress({ id: 5 }) },
        { title: 'Password', link: url.accountPassword() },
        { title: 'Logout', link: url.accountSignIn() },
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
            <PageHeader header="My Account" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3 d-flex">
                            <div className="account-nav flex-grow-1">
                                <h4 className="account-nav__title">Navigation</h4>
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
