// react
import {
    FormEvent, Fragment, useEffect, useRef, useState,
} from 'react';

// third-party
import Head from 'next/head';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import FacebookLogin from 'react-facebook-login';
import PageHeader from '../shared/PageHeader';
import { useHome } from '../../store/home/homeHooks';

// data stubs
import { useAccount, useAccountLogin, useAccountRegister } from '../../store/account/accountHooks';

export default function AccountPageLogin() {
     const homeData = useHome();
     const translations = homeData?.translations
    const breadcrumb = [
        { title:translations?.home || 'الرئيسية', url: '' },
        { title:  translations?.myAccount || 'حسابي', url: '/account/dashboard' },
    ];
    const route = useRouter();
    const account = useAccount();
    const [facebookId, setFacebookId] = useState(undefined);

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
            name, phone, secondaryPhone, email, facebookId,
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
    // @ts-ignore
    const responseFacebook = (response) => {
        accountLogin({ facebookId: response.id });
    };
    // @ts-ignore
    const registerFacebook = (response) => {
        // @ts-ignore
        nameInputRef.current.value = response.name;
        // @ts-ignore
        emailInputRef.current.value = response.email;

        setFacebookId(response.id);
    };

    return (
        <Fragment>
            <Head>
                <title>
                    
                    {translations?.login || 'تسجيل الدخول'}
                </title>
            </Head>

            <PageHeader header={translations?.myAccount} breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex">
                            <div className="card flex-grow-1 mb-md-0">
                                <div className="card-body">
                                    <h3 className="card-title">
                                        {translations?.login || ' تسجيل الدخول بالهاتف'}
                                       
                                        </h3>
                                    <form onSubmit={loginHandler}>
                                        <div className="form-group">
                                            <label htmlFor="login-phone">
                                                {translations?.phoneNumber || 'رقم الهاتف'}
                                           
                                                </label>
                                            <input
                                                ref={loginPhoneInputRef}
                                                id="login-phone"
                                                type="tel"
                                                className="form-control"
                                                placeholder={translations?.phoneNumber || 'رقم الهاتف'}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                        {translations?.login || ' تسجيل الدخول '}
                                        </button>
                                    </form>

                                    <FacebookLogin
                                        size="small"
                                        buttonStyle={{ marginTop: 10, fontSize: '0.875rem', textAlign: 'right' }}
                                        appId="467375114690106"
                                        xfbml
                                        cookie
                                        fields="name,email"
                                        scope="public_profile,email"
                                        // @ts-ignore
                                        callback={responseFacebook}
                                        icon="fa-facebook"
                                        textButton= {translations?.facebookLogin || " تسجيل دخول بإستخدام فيسبوك"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex mt-4 mt-md-0">
                            <div className="card flex-grow-1 mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">
                                    {translations?.register || ' انشاء حساب جديد'}
                                        
                                        </h3>
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label htmlFor="name">الاسم</label>
                                            <input
                                                ref={nameInputRef}
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                required
                                                placeholder={translations?.name || "الاسم *"}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">
                                            {translations?.phoneNumber || 'رقم الهاتف'}</label>
                                            <input
                                                ref={phoneInputRef}
                                                id="phone"
                                                type="tel"
                                                required
                                                className="form-control"
                                                placeholder= {translations?.phoneNumber || "رقم الهاتف *"}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone-2"> {translations?.secondaryPhoneNumber || 'رقم الهاتف الثاني'}</label>
                                            <input
                                                ref={phone2ndInputRef}
                                                id="phone-2"
                                                type="tel"
                                                className="form-control"
                                                placeholder={translations?.secondaryPhoneNumber || 'رقم الهاتف الثاني'}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-email">{translations?.email || 'الايميل'}</label>
                                            <input
                                                ref={emailInputRef}
                                                id="register-email"
                                                type="text"
                                                className="form-control"
                                                placeholder={translations?.email || 'الايميل'}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                            {translations?.email || 'تأكيد المعلومات'}
                                        </button>
                                    </form>
                                    <FacebookLogin
                                        size="small"
                                        buttonStyle={{ marginTop: 10, fontSize: '0.875rem', textAlign: 'right' }}
                                        appId="467375114690106"
                                        xfbml
                                        cookie
                                        fields="name,email"
                                        scope="public_profile,email"
                                        callback={registerFacebook}
                                        icon="fa-facebook"
                                        textButton= {translations?.facebookRegister || " انشاء حساب بإستخدام فيسبوك"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
