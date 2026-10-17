// application
export const SALE_CHANGE = 'SALE_CHANGE';

export interface SaleChangeAction {
    type: typeof SALE_CHANGE;
    isWholeSale: boolean;
}

export type SaleAction = SaleChangeAction;
