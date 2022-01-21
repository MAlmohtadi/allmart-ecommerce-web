
export interface IBanner {
    id: number;
    imageUrl: string;
    isClickable: boolean;
    isOfferTab: boolean;
    categoryId: number;
    subCategoryId: number;
    order: number;
}
export interface ISubCategory {
    id: number,
    isRetail: boolean,
    isWholeSale: boolean,
    name: string,
    order: number
}
export interface ICategory {
    id: number,
    imageUrl: string,
    isRetail: boolean,
    isWholeSale: boolean,
    name: string,
    order: number,
    subCategories: ISubCategory[]
}

export interface IAdminSettingsResponse {
    chooseDeliveryEnabled: boolean,
    choose_delivery_period_enabled?: boolean,
    deliveryInSameDayEnabled: boolean,
    id: number,
    maxTotalPriceRetail: number,
    maxTotalPriceWholeSale: number,
    minTotalPriceRetail: number,
    minTotalPriceWholeSale: number,
    userId: number,
    visaOnDeliveryEnabled: boolean,
    wholeSaleEnabled: boolean
}
export interface IHomePageResponse {
    categories: ICategory[],
    banners: IBanner[],
    adminSettingsResponse: IAdminSettingsResponse
}
