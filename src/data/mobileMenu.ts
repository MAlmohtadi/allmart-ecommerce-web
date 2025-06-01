import { IMobileMenu } from '../interfaces/menus/mobile-menu';
import { IEshopTranslation, ILanguage } from '../interfaces/main';

export function getMobileMenu(translations: IEshopTranslation | null, languages: ILanguage[] | null): IMobileMenu {
    return [
        {
            type: 'link',
            title: translations?.home || 'الرئيسية',
            url: '/',
        },
        {
            type: 'button',
            title: translations?.orders || 'طلباتي',
            url: '/account/orders',
            children: [
                { type: 'link', title: translations?.allOrders || 'جميع الطلبات', url: '/account/orders' },
                { type: 'link', title: translations?.currentOrders || 'الطلبات الحالية', url: '/account/orders/current' },
                { type: 'link', title: translations?.oldOrders || 'الطلبات السابقة', url: '/account/orders/previous' },
            ],
        },
        {
            title: translations?.categories || 'التصنيفات',
            url: '/',
            type: 'button',
            children: [],
        },
        {
            type: 'link',
            title: translations?.specialOffers || 'عروض خاصة',
            url: '/shop/offers',
        },
        {
            type: 'link',
            title: translations?.imageGallery || 'معرض الصور',
            url: '/shop/gallery',
        },
        {
            type: 'link',
            title: translations?.aboutUs || 'من نحن',
            url: '/site/about-us',
        },
        {
            type: 'link',
            title: translations?.myAccount || 'حسابي',
            url: '/account/profile',
        },
        {
            type: 'button',
            title:  'Language',
            children: languages ? languages.map((lang) => ({
                type: 'button',
                title: lang.name,
                data: { type: 'language', locale: lang.locale },
            })) : [], 
            // children: [
            //     { type: 'button', title: 'English', data: { type: 'language', locale: 'en' } },
            //     { type: 'button', title: 'العربية', data: { type: 'language', locale: 'ar' } },
            // ],
        },
    ];
}