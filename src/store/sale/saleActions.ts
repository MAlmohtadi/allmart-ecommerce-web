// application
import { SALE_CHANGE, SaleChangeAction } from './saleActionTypes';

// eslint-disable-next-line import/prefer-default-export
export function saleChange(isWholeSale: boolean): SaleChangeAction {
    return {
        type: SALE_CHANGE,
        isWholeSale,
    };
}
