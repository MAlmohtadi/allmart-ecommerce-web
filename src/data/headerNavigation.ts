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
                { title: 'الطلبات الحالية', url: '/account/orders' },
                { title: 'الطلبات السابقة', url: '/account/orders' },
            ],
        },
    },
    {
        title: 'عروض خاصة',
        url: '/shop/offers',
    },
];

export default dataHeaderNavigation;
