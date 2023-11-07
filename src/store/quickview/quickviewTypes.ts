// application
// import { IProduct } from '../../interfaces/product';

import { IProduct, ITranslation } from "../../interfaces/main";

export interface QuickviewState {
    open: boolean;
    product: IProduct | null;
    translations: ITranslation | null
}
