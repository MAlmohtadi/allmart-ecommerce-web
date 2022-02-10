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
        title: 'عروض خاصة',
        url: '/shop/offers',
    },
    {
        title: 'التصنيفات',
        url: '/',
        submenu: {
            type: 'menu',
            menu: [],
        },
    },
];

export default dataHeaderNavigation;
