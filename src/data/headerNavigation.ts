import { INav } from '../interfaces/menus/nav';

const dataHeaderNavigation: INav = [
    {
        title: 'الرئيسية',
        url: '/',
    },
    {
        title: 'طلباتي',
        url: '/account/orders',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'جميع الطلبات', url: '/account/orders' },
                { title: 'الطلبات الحالية', url: '/account/orders/current' },
                { title: 'الطلبات السابقة', url: '/account/orders/previous' },
            ],
        },
    },
    {
        title: 'التصنيفات',
        url: '/',
        submenu: {
            type: 'menu',
            menu: [],
        },
    },
    {
        title: 'عروض خاصة',
        url: '/shop/offers',
    },
    {
        title: 'معرض الصور',
        url: '/shop/gallery',
    },
    {
        title: 'من نحن',
        url: '/site/about-us',
    },
];

export default dataHeaderNavigation;
