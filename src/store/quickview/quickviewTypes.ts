// application
import { IProduct } from '../../interfaces/product';

export interface QuickviewState {
    open: boolean;
    product: IProduct | null;
}
