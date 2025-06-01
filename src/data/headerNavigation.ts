import { INav } from '../interfaces/menus/nav';
import {
    IEshopTranslation,
    ILanguage,
} from "../interfaces/main";

export function getHeaderNavigation(translations: IEshopTranslation | null): INav {
    return [
        {
            title: translations?.home || '',
            url: '/',
        },
        {
            title: translations?.orders || '',
            url: '/account/orders',
            submenu: {
                type: 'menu',
                menu: [
                    { title: translations?.allOrders || ' الطلبات', url: '/account/orders' },
                    { title: translations?.currentOrders || ' الحالية', url: '/account/orders/current' },
                    { title: translations?.oldOrders || ' السابقة', url: '/account/orders/previous' },
                ],
            },
        },
        {
            title: translations?.categories || '',
            url: '/',
            submenu: {
                type: 'menu',
                menu: [],
            },
        },
        {
            title: translations?.specialOffers || ' خاصة',
            url: '/shop/offers',
        },
        {
            title: translations?.imageGallery || ' الصور',
            url: '/shop/gallery',
        },
        {
            title: translations?.aboutUs || 'من ',
            url: '/site/about-us',
        },
    ];
}

// const dataHeaderNavigation: INav = [
//     {
//         title: 'الرئيسية',
//         url: '/',
//     },
//     {
//         title: 'طلباتي',
//         url: '/account/orders',
//         submenu: {
//             type: 'menu',
//             menu: [
//                 { title: 'جميع الطلبات', url: '/account/orders' },
//                 { title: 'الطلبات الحالية', url: '/account/orders/current' },
//                 { title: 'الطلبات السابقة', url: '/account/orders/previous' },
//             ],
//         },
//     },
//     {
//         title: 'التصنيفات',
//         url: '/',
//         submenu: {
//             type: 'menu',
//             menu: [],
//         },
//     },
//     {
//         title: 'عروض خاصة',
//         url: '/shop/offers',
//     },
//     {
//         title: 'معرض الصور',
//         url: '/shop/gallery',
//     },
//     {
//         title: 'من نحن',
//         url: '/site/about-us',
//     },
// ];

export default getHeaderNavigation;
