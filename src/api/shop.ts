/* eslint-disable @typescript-eslint/no-unused-vars,arrow-body-style */
// noinspection ES6UnusedImports
import qs from 'query-string';
import { getCategories, getCategoryBySlug } from '../fake-server/endpoints/categories';
import { IShopCategory } from '../interfaces/category';
// import { IProduct, IProductsList } from '../interfaces/product-old';
import { IFilterValues, IListOptions, IProductOptions } from '../interfaces/list';
import {
    getDiscountedProducts,
    getFeaturedProducts,
    getLatestProducts,
    getPopularProducts,
    getProductBySlug,
    getProductsList,
    getRelatedProducts,
    getSuggestions,
    getTopRatedProducts,
} from '../fake-server/endpoints/products';
import { IHomePageResponse } from '../interfaces/hompage';
import { IProductResponse, IProduct } from '../interfaces/product';
import { IAccount } from '../interfaces/account';
import { ICoupon } from '../interfaces/coupon';
import { ICheckoutInfo } from '../interfaces/checkout-info';
// import { IProductsList, IProduct } from '../interfaces/product-old';

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

export interface OrderOptions {
    couponCode: string,
    couponDiscount: number,
    deliveryDate: string,
    deliveryPeriod: string,
    deliveryPrice: number,
    isWholeSale: boolean,
    location: string,
    notes: string,
    orderedProducts: [
        {
            id: number,
            isOffer: boolean,
            offerPrice: number,
            offerQuantity: number,
            offerType: number,
            orderId?: number,
            price: number,
            productId: number,
            quantity: number
        }
    ],
    totalPrice: number,
    typeOfPayment: number,
    userId: number
}

const BASE_URL = 'http://jubranapi.us-east-1.elasticbeanstalk.com/api';
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
        return fetch(`${BASE_URL}/home/getHomeInfo?${qs.stringify(options)}`)
            .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
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
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    updateAccoount: (options: AccountOptions = {}): Promise<IAccount> => {
        return fetch(`${BASE_URL}/user/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    registerAccoount: (options: AccountOptions = {}): Promise<IAccount> => {
        return fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    removeAccoount: (options: AccountOptions = {}): Promise<void> => {
        return fetch(`${BASE_URL}/user/deleteUserInfo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /**
    * get checkout Info.
    */
    getCheckoutInfo: (): Promise<ICheckoutInfo> => {
        return fetch(`${BASE_URL}/checkout/getCheckoutInfo`)
            .then((response) => response.json());
    },
    /**
    * add order.
    */
    addOrder: (options: OrderOptions): Promise<ICheckoutInfo & Error> => {
        return fetch(`${BASE_URL}/orders/addOrder`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
        })
            .then((response) => response.json());
    },
    /**
     * Returns array of categories.
     */
    getCategories: (options: GetCategoriesOptions = {}): Promise<IShopCategory[]> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories.json?depth=2
         *
         * where:
         * - 2 = options.depth
         */
        // return fetch(`https://example.com/api/categories.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getCategories(options);
    },
    /**
     * Returns category by slug.
     */
    getCategoryBySlug: (slug: string, options: GetCategoryBySlugOptions = {}): Promise<IShopCategory> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories/power-tools.json?depth=2
         *
         * where:
         * - power-tools = slug
         * - 2           = options.depth
         */
        // return fetch(`https://example.com/api/categories/${slug}.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getCategoryBySlug(slug, options);
    },
    /**
     * Returns product.
     */
    getProductBySlug: (slug: string): Promise<IProduct> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products/screwdriver-a2017.json
         *
         * where:
         * - screwdriver-a2017 = slug
         */
        // return fetch(`https://example.com/api/products/${slug}.json`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getProductBySlug(slug);
    },
    /**
     * Returns array of related products.
     */
    getRelatedProducts: (slug: string, options: GetRelatedProductsOptions = {}): Promise<IProduct[]> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/screwdriver-a2017/related.json&limit=3
         *
         * where:
         * - screwdriver-a2017 = slug
         * - limit             = options.limit
         */
        // return fetch(`https://example.com/api/products/${slug}/related.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getRelatedProducts(slug, options);
    },
    /**
     * Returns an array of top rated products.
     */
    getTopRatedProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/top-rated-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/top-rated-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getTopRatedProducts(options);
    },
    /**
     * Returns an array of discounted products.
     */
    getDiscountedProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/discounted-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/discounted-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getDiscountedProducts(options);
    },
    /**
     * Returns an array of most popular products.
     */
    getPopularProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/popular-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getPopularProducts(options);
    },
    /**
     * Returns search suggestions.
     */
    getSuggestions: (query: string, options: GetSuggestionsOptions = {}): Promise<IProduct[]> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
         *
         * where:
         * - screwdriver = query
         * - 5           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/search/suggestions.json?${qs.stringify({ ...options, query })}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getSuggestions(query, options);
    },
};

export default shopApi;
