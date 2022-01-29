// application
import { IFilterValues, IListOptions } from '../../interfaces/list';
import { IProductsList } from '../../interfaces/product';

export const SHOP_NAMESPACE = 'shop';

export interface ShopState {
    init: boolean;
    productsListIsLoading: boolean;
    productsList: IProductsList | null;
    options: IListOptions;
    filters: IFilterValues;
}
