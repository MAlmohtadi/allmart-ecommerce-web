// application
// import { IProduct } from '../../interfaces/product';

import { IProduct } from "../../interfaces/main";

export interface QuickviewState {
    open: boolean;
    product: IProduct | null;
}
