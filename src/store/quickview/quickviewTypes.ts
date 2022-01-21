// application
import { IProduct } from '../../interfaces/product-old';

export interface QuickviewState {
    open: boolean;
    product: IProduct | null;
}
