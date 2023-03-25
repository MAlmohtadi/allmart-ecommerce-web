/* eslint-disable @typescript-eslint/no-unused-vars,arrow-body-style */
// noinspection ES6UnusedImports
import qs from 'query-string';
import { isMobile } from 'react-device-detect';
import { IProductOptions } from '../interfaces/list';

import { IHomePageResponse } from '../interfaces/homepage';
import { IProductResponse, IProduct } from '../interfaces/product';
import { ICoupon } from '../interfaces/coupon';
import { ICheckoutInfo, IDeliveryInfo } from '../interfaces/checkout-info';
import { IOrderProduct, IOrderSummary } from '../interfaces/order';
import { IAccount } from '../store/account/accountTypes';

export interface GetCategoriesOptions {
    depth?: number;
}

export interface GetCategoryBySlugOptions {
    depth?: number;
}

export interface GetRelatedProductsOptions {
    limit?: number;
}

export interface GetProductsOptions {
    limit?: number;
    category?: string;
}

export type GetSuggestionsOptions = {
    limit?: number;
    category?: string;
};
export interface GetSaleOptions {
    isWholeSale?: boolean;
    categoryId?: number,
    nextPageNumber?: number,
    pageSize?: number,
    sort?: string,
    subCategoryId?: number,
    userId?: number
}
export interface AccountOptions {
    phone?: string;
    email?: string;
    name?: string;
    secondaryPhone?: string;
    appleId?: string;
    facebookId?: string;
    id?: number;
}
export interface WishListOptions {
    isWholeSale?: boolean;
    userId?: number;
    productId?: number;
}
export interface CouponOptions {
    code: string;
    userId?: number;
}
export interface Error {
    isBussinessError?: boolean;
    message?: string;
}

export interface UserOrdersOptions {
    isCurrentOrders: boolean,
    isOlderOrders: boolean,
    isWholeSale: boolean,
    userId: number

}

export interface OrderProductsOptions {
    orderId: number,
    userId: number;
    isWholeSale?: boolean,
}

export interface OrderBaseOptions {
    couponDiscount: number,
    isWholeSale: boolean,
    orderId: number,
    orderedProducts: [
        {
            id: number,
            isOffer: boolean,
            offerPrice: number,
            offerQuantity: number,
            offerType: number,
            orderId?: number,
            price: number,
            productId?: number,
            quantity: number
        }
    ],
    totalPrice: number,
    userId: number
}

export interface OrderOptions extends OrderBaseOptions {
    couponCode: string,
    deliveryDate: string,
    deliveryPeriod: string,
    deliveryPrice: number,
    location: string,
    notes: string,
    typeOfPayment: number,
}

export interface Images {
    id: number;
    imageName: string;
    imageUrl: string;
    order: number;
}

export interface DeliveryInfo {
    lat: number;
    lng: number;
}
const BASE_URL = 'https://bountiestoday.us-east-1.elasticbeanstalk.com/api';
const shopApi = {

    /**
     * Returns array of categories.
     */
    getHomePageData: (options: GetSaleOptions = {}): Promise<IHomePageResponse> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories.json?isWholeSale=true
         *
         * where:
         * - true = options.isWholeSale
         */
        return fetch(`${BASE_URL}/home/getHomeInfo?${qs.stringify(options)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
        })
            .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
    },
    /**
     * Returns array of categories.
     */
    getAboutUsContent: (): Promise<any> => {
        return fetch(`${BASE_URL}/page/content/getAboutUs`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
        })
            .then((response) => response.json());
    },

    getSocialLinks: (): Promise<any> => {
        return fetch(`${BASE_URL}/page/content/getSocialLinks`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
        })
            .then((response) => response.json());
    },
    /**
     * Returns array of featured products.
     */
    getFeaturedProducts: (options: GetSaleOptions = {}): Promise<IProductResponse> => {
        return fetch(`${BASE_URL}/products/getFeaturedProducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /**
     * Returns array of offer products.
     */
    getOfferProducts: (options: GetSaleOptions = {}): Promise<IProductResponse> => {
        return fetch(`${BASE_URL}/offers/getOfferProdcuts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /**
    * Returns array of offer products.
    */
    login: (options: AccountOptions = {}): Promise<IAccount | Error> => {
        return fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    updateAccount: (options: AccountOptions = {}): Promise<IAccount> => {
        return fetch(`${BASE_URL}/user/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    registerAccount: (options: AccountOptions = {}): Promise<IAccount> => {
        return fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    removeAccount: (options: AccountOptions = {}): Promise<void> => {
        return fetch(`${BASE_URL}/user/deleteUserInfo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /**
    * Return products list.
    */
    getProductsList: (options: IProductOptions = {}): Promise<IProductResponse> => {
        return fetch(`${BASE_URL}/products/getProducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /*
     * Return products list.
     */
    getSearchProductsList: (options: IProductOptions = {}): Promise<IProductResponse> => {
        return fetch(`${BASE_URL}/products/searchProducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /*
    * Return products list.
    */
    getOfferProductsList: (options: IProductOptions = {}): Promise<IProductResponse> => {
        return fetch(`${BASE_URL}/offers/getOfferProdcuts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /*
    * add to wishlist.
    */
    addToWishlist: (options: WishListOptions): Promise<boolean> => {
        return fetch(`${BASE_URL}/favorite/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.ok);
    },
    /*
    * remove from wishlist.
    */
    removeFromWishlist: (options: WishListOptions): Promise<boolean> => {
        return fetch(`${BASE_URL}/favorite/delete`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.ok);
    },
    /*
    * remove All from wishlist.
    */
    removeAllWishlist: (options: WishListOptions): Promise<boolean> => {
        return fetch(`${BASE_URL}/favorite/delete`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.ok);
    },
    /**
    * Return wishlist products .
    */
    getWishListProducts: (options: WishListOptions): Promise<IProduct[]> => {
        return fetch(`${BASE_URL}/favorite/getFavoriteProducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /**
    * apply coupon.
    */
    applyCoupon: (options: CouponOptions): Promise<ICoupon & Error> => {
        return fetch(`${BASE_URL}/coupons/getCouponByCode`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /**
    * get checkout Info.
    */
    getCheckoutInfo: (): Promise<ICheckoutInfo> => {
        return fetch(`${BASE_URL}/checkout/getCheckoutInfo`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
        })
            .then((response) => response.json());
    },
    /**
     * get delivery Info.
    */
    getDeliveryInfo: (options: DeliveryInfo): Promise<IDeliveryInfo> => {
        return fetch(`${BASE_URL}/checkout/getDeliveryInfo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /**
    * add order.
    */
    addOrder: (options: OrderOptions): Promise<IOrderSummary & Error> => {
        return fetch(`${BASE_URL}/orders/addOrder`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /*
    * Return user orders.
    */
    getUserOrders: (options: UserOrdersOptions): Promise<IOrderSummary[]> => {
        return fetch(`${BASE_URL}/orders/getUserOrders`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /*
    * Return order products orders.
    */
    getOrderProducts: (options: OrderProductsOptions): Promise<IOrderProduct[]> => {
        return fetch(`${BASE_URL}/orders/getOrderProducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /*
    * update order products orders.
    */
    updateOrderProducts: (options: OrderBaseOptions): Promise<IOrderProduct[]> => {
        return fetch(`${BASE_URL}/orders/updateOrderProducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /*
    * cancel order  orders.
    */
    cancelOrder: (options: OrderProductsOptions): Promise<IOrderSummary> => {
        return fetch(`${BASE_URL}/orders/cancelOrder`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /*
    * cancel order  orders.
    */
    getGalleryImages: (): Promise<Images[]> => {
        return fetch(`${BASE_URL}/gallery/getAll`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                deviceType: isMobile ? 'mobileWeb' : 'desktopWeb',
            },
        })
            .then((response) => response.json());
    },
};

export default shopApi;
