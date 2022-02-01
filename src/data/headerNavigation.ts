import { INav } from '../interfaces/menus/nav';

const dataHeaderNavigation: INav = [
    {
        title: 'Home',
        url: '/',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'Home 1', url: '/' },
                { title: 'Home 2', url: '/home-two' },
            ],
        },
    },
    {
        title: 'Megamenu',
        url: '',
        submenu: {
            type: 'megamenu',
            menu: {
                size: 'nl',
                columns: [
                    {
                        size: 6,
                        links: [
                            {
                                title: 'Power Tools',
                                url: '',
                                children: [
                                    { title: 'Engravers', url: '' },
                                    { title: 'Wrenches', url: '' },
                                    { title: 'Wall Chaser', url: '' },
                                    { title: 'Pneumatic Tools', url: '' },
                                ],
                            },
                            {
                                title: 'Machine Tools',
                                url: '',
                                children: [
                                    { title: 'Thread Cutting', url: '' },
                                    { title: 'Chip Blowers', url: '' },
                                    { title: 'Sharpening Machines', url: '' },
                                    { title: 'Pipe Cutters', url: '' },
                                    { title: 'Slotting machines', url: '' },
                                    { title: 'Lathes', url: '' },
                                ],
                            },
                        ],
                    },
                    {
                        size: 6,
                        links: [
                            {
                                title: 'Hand Tools',
                                url: '',
                                children: [
                                    { title: 'Screwdrivers', url: '' },
                                    { title: 'Handsaws', url: '' },
                                    { title: 'Knives', url: '' },
                                    { title: 'Axes', url: '' },
                                    { title: 'Multitools', url: '' },
                                    { title: 'Paint Tools', url: '' },
                                ],
                            },
                            {
                                title: 'Garden Equipment',
                                url: '',
                                children: [
                                    { title: 'Motor Pumps', url: '' },
                                    { title: 'Chainsaws', url: '' },
                                    { title: 'Electric Saws', url: '' },
                                    { title: 'Brush Cutters', url: '' },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
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
    {
        title: 'Buy Theme',
        url: 'https://themeforest.net/item/stroyka-tools-store-react-ecommerce-template/23909258',
        props: {
            target: '_blank',
        },
    },
];

export default dataHeaderNavigation;
