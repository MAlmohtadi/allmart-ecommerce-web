import { ILinkProps } from '../interfaces/menus/link-props';

const url = {
    home: (): ILinkProps => ({
        href: '/',
    }),

    catalog: () => '/shop/catalog',

    gallery: () => '/shop/gallery',

    cart: (): ILinkProps => ({
        href: '/shop/cart',
    }),

    checkout: (): ILinkProps => ({
        href: '/shop/checkout',
    }),
    product: (product: { slug: string }): ILinkProps => ({
        href: '/shop/products/[slug]',
        as: `/shop/products/${product.slug}`,
    }),

    wishlist: (): ILinkProps => ({
        href: '/shop/wishlist',
    }),

    blogCategory: (): ILinkProps => ({
        href: '/blog/category-classic',
    }),

    blogPost: (): ILinkProps => ({
        href: '/blog/post-classic',
    }),

    accountSignIn: (): ILinkProps => ({
        href: '/account/login',
    }),

    accountSignUp: (): ILinkProps => ({
        href: '/account/login',
    }),

    accountSignOut: (): ILinkProps => ({
        href: '/account/login',
    }),

    accountDashboard: (): ILinkProps => ({
        href: '/account/dashboard',
    }),

    accountProfile: (): ILinkProps => ({
        href: '/account/profile',
    }),

    accountOrders: (): ILinkProps => ({
        href: '/account/orders',
    }),

    accountOrder: (id: number): ILinkProps => ({
        href: '/account/orders/[orderId]',
        as: `/account/orders/${id}`,
    }),

    accountAddresses: (): ILinkProps => ({
        href: '/account/addresses',
        as: '/account/addresses',
    }),

    accountAddress: (address: { id: number }): ILinkProps => ({
        href: '/account/addresses/[addressId]',
        as: `/account/addresses/${address.id}`,
    }),

    accountPassword: (): ILinkProps => ({
        href: '/account/password',
        as: '/account/password',
    }),
    category: (categoryId: number): ILinkProps => ({
        href: '/eshop/categories/[categoryId]',
        as: `/eshop/categories/${categoryId}`,
    }),
    categoryWithSubCategory: (categoryId: number, subCategoryId: number): ILinkProps => ({
        href: '/eshop/categories/[categoryId]/sub-category/[subCategoryId]',
        as: `/eshop/categories/${categoryId}/sub-category/${subCategoryId}`,
    }),
    contacts: (): ILinkProps => ({
        href: '/site/contact-us',
    }),
    offers: (): ILinkProps => ({
        href: '/shop/offers',
    }),

    terms: (): ILinkProps => ({
        href: '/site/terms',
    }),
};

export default url;
