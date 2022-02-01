// application
import { IProduct } from '../../interfaces/product';

export interface WishlistState {
    init: boolean ;
    productsListIsLoading: boolean;
    items: IProduct[];
}
