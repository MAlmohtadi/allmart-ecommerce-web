// react
import {
    FormEvent, Fragment, useEffect, useRef,
} from 'react';

// third-party
import Head from 'next/head';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';
import { useAccount, useAccountLogin, useAccountRegister } from '../../store/account/accountHooks';

export default function AccountPageLogin() {
    const breadcrumb = [
        { title: 'الرئيسية', url: '' },
        { title: 'الحساب', url: '/account/dashboard' },
    ];
    const route = useRouter();
    const account = useAccount();

    useEffect(() => {
        if (account.isLoggedIn) {
            route.back();
        }
    }, [account.isLoggedIn]);
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const phoneInputRef = useRef<HTMLInputElement | null>(null);
    const phone2ndInputRef = useRef<HTMLInputElement | null>(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const loginPhoneInputRef = useRef<HTMLInputElement | null>(null);

    const accountRegister = useAccountRegister();
    const accountLogin = useAccountLogin();

    function submitHandler(event: FormEvent) {
        event.preventDefault();
        const name = nameInputRef.current?.value;
        const phone = phoneInputRef.current?.value;
        const secondaryPhone = phone2ndInputRef.current?.value;
        const email = emailInputRef.current?.value;

        if (!(phone && phone.match('[0-9]{10}'))) {
            toast.error('رقم الهاتف غير صحيح', { theme: 'colored' });
            return;
        }
        if (secondaryPhone && secondaryPhone.length > 0 && !secondaryPhone.match('[0-9]{10}')) {
            toast.error('رقم الهاتف الثاني غير صحيح', { theme: 'colored' });
            return;
        }
        if (!(name && name.length > 0)) {
            toast.error('يجب ادخال اسم صحيح', { theme: 'colored' });
            return;
        }
        if (email && email.length > 0 && !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            toast.error('يجب ادخال ايميل صحيح', { theme: 'colored' });
            return;
        }
        accountRegister({
            name, phone, secondaryPhone, email,
        });
    }
    function loginHandler(event: FormEvent) {
        event.preventDefault();
        const phone = loginPhoneInputRef.current?.value;
        if (!(phone && phone.match('[0-9]{10}'))) {
            toast.error('رقم الهاتف غير صحيح', { theme: 'colored' });
            return;
        }
        accountLogin({ phone });
    }
    return (
        <Fragment>
            <Head>
                <title>{`Login — ${theme.name}`}</title>
            </Head>

            <PageHeader header="الحساب" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex">
                            <div className="card flex-grow-1 mb-md-0">
                                <div className="card-body">
                                    <h3 className="card-title">تسجيل الدخول بالهاتف</h3>
                                    <form onSubmit={loginHandler}>
                                        <div className="form-group">
                                            <label htmlFor="login-phone">رقم الهاتف</label>
                                            <input
                                                ref={loginPhoneInputRef}
                                                id="login-phone"
                                                type="tel"
                                                className="form-control"
                                                placeholder="رقم الهاتف"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                            تسجيل الدخول
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex mt-4 mt-md-0">
                            <div className="card flex-grow-1 mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">انشاء حساب</h3>
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label htmlFor="name">الاسم</label>
                                            <input
                                                ref={nameInputRef}
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                required
                                                placeholder="الاسم *"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">رقم الهاتف</label>
                                            <input
                                                ref={phoneInputRef}
                                                id="phone"
                                                type="tel"
                                                required
                                                className="form-control"
                                                placeholder="رقم الهاتف *"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone-2">رقم الهاتف الثاني</label>
                                            <input
                                                ref={phone2ndInputRef}
                                                id="phone-2"
                                                type="tel"
                                                className="form-control"
                                                placeholder="رقم الهاتف الثاني (إختياري)"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-email">الايميل</label>
                                            <input
                                                ref={emailInputRef}
                                                id="register-email"
                                                type="text"
                                                className="form-control"
                                                placeholder="الايميل (إختياري)"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                            تأكيد المعلومات
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
