/* eslint-disable @typescript-eslint/no-unused-vars,arrow-body-style */
// noinspection ES6UnusedImports
import qs from "query-string";

import {
    IAboutUs,
    ICategory,
    IProduct,
    IBanner,
    ILanguage,
    IHomePageInfo,
    IMenu,
    ITranslation,
    IFooter,
} from "../interfaces/main";

export interface Language {
    locale: string
    // langId:string;
}
export interface ProductByCategory {
    locale: string;
    // langId:string;
    categoryId: number;
}
const BASE_URL = "https://jubran.jubran-api.com/api";
const mainApi = {
    /**
     * Returns array of HomePage.
     */
    getHomePageInfo: (options: Language): Promise<IHomePageInfo> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories.json?isWholeSale=true
         *
         * where:
         * - true = options.isWholeSale
         */
        return fetch(`${BASE_URL}/exportation/getHomePageInfo?${qs.stringify(options)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
    },
    /**
     * Returns array of Translations.
     */
    getTranslations: (options: Language): Promise<ITranslation> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories.json?langId=1
         *
         * where:
         * - 1 = options.langId
         */
        return fetch(`${BASE_URL}/exportation/getTranslations?${qs.stringify(options)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
    },
     /**
     * Returns array of Translations.
     */
     getFooter: (options: Language): Promise<IFooter> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories.json?langId=1
         *
         * where:
         * - 1 = options.langId
         */
        return fetch(`${BASE_URL}/exportation/getFooter?${qs.stringify(options)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
    },
    /**
     * Returns array of Translations.
     */
    getMenu: (options: Language): Promise<IMenu[]> => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories.json?isWholeSale=true
         *
         * where:
         * - true = options.isWholeSale
         */
        return fetch(`${BASE_URL}/exportation/getMenu?${qs.stringify(options)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
    },
    /**
     * Returns array of categories.
     */
    getCategories: (options: Language): Promise<ICategory[]> => {
        return fetch(`${BASE_URL}/exportation/getCategories?${qs.stringify(options)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());
    },
    /**
     * Returns array of Banner.
     */
    getBanners: (options: Language): Promise<IBanner[]> => {
        return fetch(`${BASE_URL}/exportation/getBanners?${qs.stringify(options)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());
    },
    /**
     * Returns array of about us section.
     */
    getAboutUsContent: (options: Language): Promise<IAboutUs> => {
        return fetch(`${BASE_URL}/exportation/getAboutUs?${qs.stringify(options)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());
    },
    /**
     * Returns array of languages.
     */
    getLanguages: (): Promise<ILanguage[]> => {
        return fetch(`${BASE_URL}/exportation/getLanguages`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());
    },
    /**
     * Returns array of product.
     */
    getProductByCategory: (options: ProductByCategory): Promise<IProduct[]> => {
        return fetch(`${BASE_URL}/exportation/getProductByCategory?${qs.stringify(options)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());
    },
    /**
     * Returns array of product.
     */
    getAllProduct: (options: Language): Promise<IProduct[]> => {
        return fetch(`${BASE_URL}/exportation/getAllProducts?${qs.stringify(options)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());
    },
};

export default mainApi;
