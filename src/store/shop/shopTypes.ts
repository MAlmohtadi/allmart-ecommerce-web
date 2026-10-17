// application
import { IFilterValues, IListOptions, IProductOptions } from '../../interfaces/list';
import { IProductsList } from '../../interfaces/product';

export const SHOP_NAMESPACE = 'shop';

export interface ShopState {
    init: boolean;
    productsListIsLoading: boolean;
    productsList: IProductsList | null;
    options: IProductOptions & IListOptions;
    filters: IFilterValues;
    isOffer?: boolean
}
