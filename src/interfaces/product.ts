import { IFilter } from './filter';
import { IFilterableList, IPaginatedList } from './list';

export interface IProduct{
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
    nextPageNumber: number;
    products: IProduct[];
    productsRemainingCount: number;
}

export type IProductsList = IPaginatedList<IProduct> & IFilterableList<IProduct, IFilter>;
