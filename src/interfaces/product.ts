export interface IProductCustom {
    id: number;
    imageUrl: string;
    isFavorite: boolean;
    isOffer: boolean;
    isStockAvailable: boolean;
    maxQuantity: number;
    name: string;
    offerPrice: number;
    offerQuantity: number;
    offerType: number;
    price: number;
    quantityMultiplier: number;

}
export interface IProductResponse {
    nextPageNumber?: number;
    products: IProductCustom[];
    productsRemainingCount?: number;
}
