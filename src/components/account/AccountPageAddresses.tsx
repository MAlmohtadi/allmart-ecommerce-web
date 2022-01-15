// react
import { Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import url from '../../services/url';

// data stubs
import dataAccountAddresses from '../../data/accountAddresses';
import theme from '../../data/theme';

export default function AccountPageAddresses() {
    const addresses = dataAccountAddresses.map((address) => (
        <Fragment key={address.id}>
            <div className="addresses-list__item card address-card">
                {address.default && <div className="address-card__badge">Default</div>}

                <div className="address-card__body">
                    <div className="address-card__name">{`${address.firstName} ${address.lastName}`}</div>
                    <div className="address-card__row">
                        {address.country}
                        <br />
                        {address.postcode}
                        ,
                        {address.city}
                        <br />
                        {address.address}
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">Phone Number</div>
                        <div className="address-card__row-content">{address.phone}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">Email Address</div>
                        <div className="address-card__row-content">{address.email}</div>
                    </div>
                    <div className="address-card__footer">
                        <AppLink href={url.accountAddress(address)}>Edit</AppLink>
                        &nbsp;&nbsp;
                        <AppLink href="/">Remove</AppLink>
                    </div>
                </div>
            </div>
            <div className="addresses-list__divider" />
        </Fragment>
    ));

    return (
        <div className="addresses-list">
            <Head>
                <title>{`Address List — ${theme.name}`}</title>
            </Head>

            <AppLink href="/" className="addresses-list__item addresses-list__item--new">
                <div className="addresses-list__plus" />
                <div className="btn btn-secondary btn-sm">Add New</div>
            </AppLink>

            <div className="addresses-list__divider" />
            {addresses}
        </div>
    );
}
