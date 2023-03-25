// third-party
import Head from 'next/head';
import { FormEvent, useRef } from 'react';
import { toast } from 'react-toastify';

import { useAccount, useAccountUpdate, useAccountRemove } from '../../store/account/accountHooks';
import AppLink from '../shared/AppLink';

export default function AccountPageProfile() {
    const account = useAccount();
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const phoneInputRef = useRef<HTMLInputElement | null>(null);
    const phone2ndInputRef = useRef<HTMLInputElement | null>(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);

    const accountUpdate = useAccountUpdate();
    const accountRemove = useAccountRemove();

    function deleteAccount() {
        accountRemove({
            id: account.id,
        });
    }
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
        accountUpdate({
            id: account.id,
            name,
            phone,
            secondaryPhone,
            email,
        });
    }
    if (!account.isLoggedIn) {
        return (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">يجب عليك تسجيل الدخول !</div>
                        <div className="block-empty__actions">
                            <AppLink href="/account/login" className="btn btn-primary btn-sm">
                                تسجيل الدخول
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="card">
            <Head>
                <title>حسابي — خيرات اليوم</title>
            </Head>

            <div className="card-header">
                <h5>معلوماتي</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
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
                                    defaultValue={account.name}
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
                                    defaultValue={account.phone}
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
                                    defaultValue={account.secondaryPhone}
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
                                    defaultValue={account.email}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                تأكيد المعلومات
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-12">
                        <button
                            type="button"
                            className="btn btn-primary mt-2 mt-md-3 mt-lg-4"
                            onClick={deleteAccount}
                            style={{ float: 'left' }}
                        >
                            إلغاء الحساب
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
