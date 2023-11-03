import { IMobileMenu } from '../interfaces/menus/mobile-menu';

const dataMobileMenu: IMobileMenu = [
    {
        type: 'link',
        title: 'الرئيسية',
        url: '/',
    },
    {
        type: 'button',
        title: 'طلباتي',
        url: '/account/orders',
        children: [
            { type: 'link', title: 'جميع الطلبات', url: '/account/orders' },
            { type: 'link', title: 'الطلبات الحالية', url: '/account/orders/current' },
            { type: 'link', title: 'الطلبات السابقة', url: '/account/orders/previous' },
        ],
    },
    {
        title: 'التصنيفات',
        url: '/',
        type: 'button',
        children: [],
    },
    {
        type: 'link',
        title: 'عروض خاصة',
        url: '/shop/offers',
    },
    {
        type: 'link',
        title: 'معرض الصور',
        url: '/shop/gallery',
    },
    {
        type: 'link',
        title: 'من نحن',
        url: '/site/about-us',
    },
    {
        type: 'link',
        title: 'حسابي',
        url: '/account/profile',
    },
    {
        type: 'button',
        title: 'Language',
        children: [
            { type: 'button', title: 'English', data: { type: 'language', locale: 'en' } },
            { type: 'button', title: 'العربية', data: { type: 'language', locale: 'ar' } },
        ],
    },
];

export default dataMobileMenu;
