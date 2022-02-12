// application
import { FormEvent, Fragment, useRef } from 'react';
import { toast } from 'react-toastify';
import AppLink from '../shared/AppLink';
import Indicator from './Indicator';
import Person20Svg from '../../svg/person-20.svg';
import url from '../../services/url';
import { useAccount, useAccountLogin, useAccountLogout } from '../../store/account/accountHooks';

function IndicatorAccount() {
    const phoneInputRef = useRef<HTMLInputElement | null>(null);
    const account = useAccount();
    const accountLogin = useAccountLogin();
    const accountLogout = useAccountLogout();
    function submitHandler(event: FormEvent) {
        event.preventDefault();
        const enteredPhone = phoneInputRef.current?.value;
        if (enteredPhone && enteredPhone.match('[0-9]{10}')) {
            accountLogin({ phone: enteredPhone });
        } else {
            toast.error('رقم الهاتف غير صحيح', { theme: 'colored' });
        }
    }
    const dropdown = (
        <div className="account-menu">
            {!account.isLoggedIn && (
                <form className="account-menu__form" noValidate={false} onSubmit={submitHandler}>
                    <div className="account-menu__form-title">تسجيل الدخول إلى حسابك</div>
                    <div className="form-group">
                        <label htmlFor="header-mobile" className="sr-only">
                            رقم الهاتف
                        </label>
                        <input
                            required
                            id="header-mobile"
                            type="tel"
                            className="form-control form-control-sm"
                            placeholder="رقم الهاتف"
                            ref={phoneInputRef}
                        />
                    </div>
                    <div className="form-group account-menu__form-button">
                        <button type="submit" className="btn btn-primary btn-sm">
                            دخول
                        </button>
                    </div>
                    <div className="account-menu__form-link">
                        <AppLink href={url.accountSignUp()}>انشاء حساب</AppLink>
                    </div>
                </form>
            )}
            <div className="account-menu__divider" />
            {account.isLoggedIn && (
                <Fragment>
                    <AppLink href={url.accountProfile()} className="account-menu__user">
                        <div className="account-menu__user-info">
                            <div className="account-menu__user-name">{account.name}</div>
                            <div className="account-menu__user-email">{account.email}</div>
                        </div>
                    </AppLink>
                    <div className="account-menu__divider" />
                    <ul className="account-menu__links">
                        <li>
                            <AppLink href={url.accountProfile()}>حسابي</AppLink>
                        </li>
                        <li>
                            <AppLink href={url.accountOrders()}>طلباتي</AppLink>
                        </li>
                    </ul>
                    <div className="account-menu__divider" />
                    <ul className="account-menu__links">
                        <li>
                            <AppLink onClick={accountLogout}>تسجيل الخروج</AppLink>
                        </li>
                    </ul>
                </Fragment>
            )}
        </div>
    );

    return <Indicator url={url.accountSignIn()} dropdown={dropdown} icon={<Person20Svg />} />;
}

export default IndicatorAccount;
