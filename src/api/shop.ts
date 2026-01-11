/* eslint-disable @typescript-eslint/no-unused-vars,arrow-body-style */
// noinspection ES6UnusedImports
import qs from 'query-string';
import { IProductOptions } from '../interfaces/list';

import Cookies from "js-cookie";
import { IHomePageResponse } from '../interfaces/homepage';
import { IProductResponse, IProduct } from '../interfaces/product';
import { ICoupon } from '../interfaces/coupon';
import { ICheckoutInfo, IDeliveryInfo } from '../interfaces/checkout-info';
import { IOrderProduct, IOrderSummary } from '../interfaces/order';
import { IAccount } from '../store/account/accountTypes';
import { apiRequest, apiRequestSSR } from '../utils/api-interceptor';
import FranchiseContext from '../utils/franchise-context';

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
    langId?: number
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
    langId?: number;
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
// BASE_URL is now handled by api-interceptor.ts
// const BASE_URL = 'http://localhost:8080/api'; // Kept for reference, not used
const BASE_URL = "https://jubran.jubran-api.com/api";

export interface FranchiseResponse {
    id: number;
    code: string;
    name: string;
    countryCode: string;
    currencyCode: string;
    currencySymbolAr: string;
    currencySymbolEn: string;
}

const shopApi = {
    /**
     * Get franchise by country code (client-side)
     * Response format: FranchiseResponse (direct from API, not wrapped)
     */
    getFranchiseByCountry: (countryCode: string): Promise<FranchiseResponse> => {
        return apiRequest(`/franchise/getByCountry?countryCode=${countryCode}`, {
            method: 'GET',
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(`Failed to get franchise: ${response.statusText}`);
            }
            const result: FranchiseResponse = await response.json();
            
            // Store franchise info in cookies (from API response)
            if (result.id && result.code && result.currencyCode) {
                FranchiseContext.setFranchiseId(result.id);
                FranchiseContext.setFranchiseCode(result.code);
                FranchiseContext.setCountryCode(result.countryCode);
                FranchiseContext.setCurrencyCode(result.currencyCode);
                FranchiseContext.setCurrencySymbols(
                    result.currencySymbolAr || 'د.أ',
                    result.currencySymbolEn || 'JD'
                );
            }
            
            return result;
        });
    },

    /**
     * Get franchise by country code (SSR version)
     * Response format: FranchiseResponse (direct from API, not wrapped)
     */
    getFranchiseByCountrySSR: (countryCode: string, cookieString?: string): Promise<FranchiseResponse> => {
        return apiRequestSSR(`/franchise/getByCountry?countryCode=${countryCode}`, cookieString, {
            method: 'GET',
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(`Failed to get franchise: ${response.statusText}`);
            }
            const result: FranchiseResponse = await response.json();
            return result;
        });
    },

    /**
     * Get all active franchises (public endpoint)
     * Response format: FranchiseResponse[] (array of franchises)
     */
    getActiveFranchises: (): Promise<FranchiseResponse[]> => {
        console.log('[API] getActiveFranchises: Starting API call');
        return apiRequest(`/franchise/getActiveFranchises`, {
            method: 'GET',
        }).then(async (response) => {
            console.log('[API] getActiveFranchises: Response received', {
                ok: response.ok,
                status: response.status,
                statusText: response.statusText
            });
            if (!response.ok) {
                console.error('[API] getActiveFranchises: Response not OK');
                throw new Error(`Failed to get active franchises: ${response.statusText}`);
            }
            const result: FranchiseResponse[] = await response.json();
            console.log('[API] getActiveFranchises: Success, got', result.length, 'franchises');
            return result;
        }).catch((error) => {
            console.error('[API] getActiveFranchises: Error caught', {
                message: error?.message,
                status: error?.status,
                requiresCountrySelection: error?.requiresCountrySelection,
                error
            });
            throw error;
        });
    },

    /**
     * Returns array of categories (client-side).
     */
    getHomePageData: (options: GetSaleOptions = {}): Promise<IHomePageResponse> => {
        options.langId = options.langId || parseInt(Cookies.get("langId") || "1", 10);
        return apiRequest(`/home/getHomeInfo?${qs.stringify(options)}`, {
            method: 'GET',
        }).then((response) => response.json());
    },

    /**
     * Returns array of categories (SSR version).
     */
    getHomePageDataSSR: (options: GetSaleOptions = {}, cookieString?: string): Promise<IHomePageResponse> => {
        const { parse } = require('cookie');
        const langId = cookieString 
            ? parseInt(parse(cookieString).langId || '1', 10)
            : 1;
        options.langId = langId;
        return apiRequestSSR(`/home/getHomeInfo?${qs.stringify(options)}`, cookieString, {
            method: 'GET',
        }).then((response) => response.json());
    },
    /**
     * Returns array of categories.
     */
    getAboutUsContent: (): Promise<any> => {
        const langId = parseInt(Cookies.get("langId") || "1", 10);
        return apiRequest(`/page/content/getAboutUs?langId=${langId}`, {
            method: 'GET',
        }).then((response) => response.json());
    },

    getSocialLinks: (): Promise<any> => {
        return apiRequest(`/page/content/getSocialLinks`, {
            method: 'GET',
        }).then((response) => response.json());
    },
    /**
     * Returns array of featured products (client-side).
     */
    getFeaturedProducts: (options: GetSaleOptions = {}): Promise<IProductResponse> => {
        console.log('[API] getFeaturedProducts: Starting API call', options);
        options.langId = options.langId || parseInt(Cookies.get("langId") || "1", 10);
        return apiRequest(`/products/getFeaturedProducts`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => {
            console.log('[API] getFeaturedProducts: Response received', {
                ok: response.ok,
                status: response.status
            });
            return response.json();
        }).catch((error) => {
            console.error('[API] getFeaturedProducts: Error caught', {
                message: error?.message,
                status: error?.status,
                requiresCountrySelection: error?.requiresCountrySelection,
                error,
                stackTrace: new Error().stack
            });
            throw error;
        });
    },

    /**
     * Returns array of featured products (SSR version).
     */
    getFeaturedProductsSSR: (options: GetSaleOptions = {}, cookieString?: string): Promise<IProductResponse> => {
        const { parse } = require('cookie');
        const langId = cookieString 
            ? parseInt(parse(cookieString).langId || '1', 10)
            : 1;
        options.langId = langId;
        return apiRequestSSR(`/products/getFeaturedProducts`, cookieString, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Returns array of offer products (client-side).
     */
    getOfferProducts: (options: GetSaleOptions = {}): Promise<IProductResponse> => {
        console.log('[API] getOfferProducts: Starting API call', options);
        options.langId = options.langId || parseInt(Cookies.get("langId") || "1", 10);
        return apiRequest(`/offers/getOfferProdcuts`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => {
            console.log('[API] getOfferProducts: Response received', {
                ok: response.ok,
                status: response.status
            });
            return response.json();
        }).catch((error) => {
            console.error('[API] getOfferProducts: Error caught', {
                message: error?.message,
                status: error?.status,
                requiresCountrySelection: error?.requiresCountrySelection,
                error,
                stackTrace: new Error().stack
            });
            throw error;
        });
    },

    /**
     * Returns array of offer products (SSR version).
     */
    getOfferProductsSSR: (options: GetSaleOptions = {}, cookieString?: string): Promise<IProductResponse> => {
        const { parse } = require('cookie');
        const langId = cookieString 
            ? parseInt(parse(cookieString).langId || '1', 10)
            : 1;
        options.langId = langId;
        return apiRequestSSR(`/offers/getOfferProdcuts`, cookieString, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },
    /**
    * User login (public endpoint).
    */
    login: (options: AccountOptions = {}): Promise<IAccount | Error> => {
        return apiRequest(`/user/login`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    updateAccount: (options: AccountOptions = {}): Promise<IAccount> => {
        return apiRequest(`/user/update`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * User registration (public endpoint).
     */
    registerAccount: (options: AccountOptions = {}): Promise<IAccount> => {
        return apiRequest(`/user/register`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    removeAccount: (options: AccountOptions = {}): Promise<void> => {
        return apiRequest(`/user/deleteUserInfo`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },
    /**
    * Return products list (client-side).
    */
    getProductsList: (options: IProductOptions = {}): Promise<IProductResponse> => {
        options.langId = options.langId || parseInt(Cookies.get("langId") || "1", 10);
        return apiRequest(`/products/getProducts`, {
            method: 'POST',
            body: JSON.stringify(options).replaceAll('subcategoryId', 'subCategoryId'),
        }).then((response) => response.json());
    },

    /**
     * Return products list (SSR version).
     */
    getProductsListSSR: (options: IProductOptions = {}, cookieString?: string): Promise<IProductResponse> => {
        const { parse } = require('cookie');
        const langId = cookieString 
            ? parseInt(parse(cookieString).langId || '1', 10)
            : 1;
        options.langId = langId;
        return apiRequestSSR(`/products/getProducts`, cookieString, {
            method: 'POST',
            body: JSON.stringify(options).replaceAll('subcategoryId', 'subCategoryId'),
        }).then((response) => response.json());
    },

    /**
     * Return search products list (client-side).
     */
    getSearchProductsList: (options: IProductOptions = {}): Promise<IProductResponse> => {
        options.langId = options.langId || parseInt(Cookies.get("langId") || "1", 10);
        return apiRequest(`/products/searchProducts`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Return search products list (SSR version).
     */
    getSearchProductsListSSR: (options: IProductOptions = {}, cookieString?: string): Promise<IProductResponse> => {
        const { parse } = require('cookie');
        const langId = cookieString 
            ? parseInt(parse(cookieString).langId || '1', 10)
            : 1;
        options.langId = langId;
        return apiRequestSSR(`/products/searchProducts`, cookieString, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Return offer products list (client-side).
     */
    getOfferProductsList: (options: IProductOptions = {}): Promise<IProductResponse> => {
        options.langId = options.langId || parseInt(Cookies.get("langId") || "1", 10);
        return apiRequest(`/offers/getOfferProdcuts`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Return offer products list (SSR version).
     */
    getOfferProductsListSSR: (options: IProductOptions = {}, cookieString?: string): Promise<IProductResponse> => {
        const { parse } = require('cookie');
        const langId = cookieString 
            ? parseInt(parse(cookieString).langId || '1', 10)
            : 1;
        options.langId = langId;
        return apiRequestSSR(`/offers/getOfferProdcuts`, cookieString, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },
    /**
     * Add to wishlist.
     */
    addToWishlist: (options: WishListOptions): Promise<boolean> => {
        return apiRequest(`/favorite/add`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.ok);
    },

    /**
     * Remove from wishlist.
     */
    removeFromWishlist: (options: WishListOptions): Promise<boolean> => {
        return apiRequest(`/favorite/delete`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.ok);
    },

    /**
     * Remove all from wishlist.
     */
    removeAllWishlist: (options: WishListOptions): Promise<boolean> => {
        return apiRequest(`/favorite/delete`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.ok);
    },

    /**
     * Return wishlist products (client-side).
     */
    getWishListProducts: (options: WishListOptions): Promise<IProduct[]> => {
        options.langId = options.langId || parseInt(Cookies.get("langId") || "1", 10);
        return apiRequest(`/favorite/getFavoriteProducts`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },
    /**
     * Apply coupon.
     */
    applyCoupon: (options: CouponOptions): Promise<ICoupon & Error> => {
        return apiRequest(`/coupons/getCouponByCode`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Get checkout info.
     */
    getCheckoutInfo: (): Promise<ICheckoutInfo> => {
        return apiRequest(`/checkout/getCheckoutInfo`, {
            method: 'GET',
        }).then((response) => response.json());
    },

    /**
     * Get delivery info.
     */
    getDeliveryInfo: (options: DeliveryInfo): Promise<IDeliveryInfo> => {
        return apiRequest(`/checkout/getDeliveryInfo`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },
    /**
     * Add order.
     */
    addOrder: (options: OrderOptions): Promise<IOrderSummary & Error> => {
        return apiRequest(`/orders/addOrder`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Return user orders.
     */
    getUserOrders: (options: UserOrdersOptions): Promise<IOrderSummary[]> => {
        return apiRequest(`/orders/getUserOrders`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Return order products.
     */
    getOrderProducts: (options: OrderProductsOptions): Promise<IOrderProduct[]> => {
        return apiRequest(`/orders/getOrderProducts`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Update order products.
     */
    updateOrderProducts: (options: OrderBaseOptions): Promise<IOrderProduct[]> => {
        return apiRequest(`/orders/updateOrderProducts`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Cancel order.
     */
    cancelOrder: (options: OrderProductsOptions): Promise<IOrderSummary> => {
        return apiRequest(`/orders/cancelOrder`, {
            method: 'POST',
            body: JSON.stringify(options),
        }).then((response) => response.json());
    },

    /**
     * Get gallery images.
     */
    getGalleryImages: (): Promise<Images[]> => {
        return apiRequest(`/gallery/getAll`, {
            method: 'GET',
        }).then((response) => response.json());
    },
};

export default shopApi;
