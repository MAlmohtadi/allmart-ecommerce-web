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
    categoryId: string;
}
// const BASE_URL = "http://localhost:8080/api";
const BASE_URL = "https://jubran.jubran-api.com/api";

// the exportation site falls back to Arabic when the requested ?locale is not usable
export const DEFAULT_LOCALE = "ar_JO";

/**
 * Gives every list/section the exportation pages read a safe empty value, so a language without
 * a footer, translations, menu or about-us entry renders an empty section instead of crashing.
 * Uses null (never undefined) so the result can be returned from getServerSideProps.
 */
export function normalizeHomePageInfo(data?: Partial<IHomePageInfo> | null): IHomePageInfo {
    return {
        ...data,
        categories: data?.categories ?? [],
        languages: data?.languages ?? [],
        banners: data?.banners ?? [],
        menuList: data?.menuList ?? [],
        footer: data?.footer ?? {},
        translations: data?.translations ?? ({} as ITranslation),
        aboutUs: data?.aboutUs ?? (null as unknown as IAboutUs),
        catalogUrl: data?.catalogUrl ?? (null as unknown as string),
    };
}

// an error response (unknown locale, bad categoryId, API failure) becomes an empty list instead of crashing the page
function productListOrEmpty(response: Response): Promise<IProduct[]> {
    if (!response.ok) {
        return Promise.resolve([]);
    }
    return response.json().then((data) => (Array.isArray(data) ? data : []));
}

const mainApi = {
    /**
     * Returns the home page info, or null when the API rejects the locale (HTTP 400) or fails,
     * so the caller can fall back to DEFAULT_LOCALE instead of rendering a 500.
     */
    getHomePageInfo: (options: Language): Promise<IHomePageInfo | null> => {
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
        })
            .then((response) => (response.ok ? response.json() : null))
            .then((data) => (data ? normalizeHomePageInfo(data) : null))
            .catch(() => null);

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
        }).then((response) => {
            var tt = response.json();
            // console.log("bbbb:", tt)
            return response.json()});

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
        })
            .then(productListOrEmpty)
            .catch(() => []);
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
        })
            .then(productListOrEmpty)
            .catch(() => []);
    },
};

export default mainApi;
