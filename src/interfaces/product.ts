// import { IBrand } from './brand';
// import { IFilter } from './filter';
// import { IFilterableList, IPaginatedList } from './list';
// import { IShopCategory } from './category';

// export interface IProductAttributeValue {
//     slug: string;
//     name: string;
// }

// export interface IProductAttribute {
//     slug: string;
//     name: string;
//     values: IProductAttributeValue[];
//     featured: boolean;
// }

export interface IProduct {
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
    products: IProduct[];
    productsRemainingCount?: number;
}
