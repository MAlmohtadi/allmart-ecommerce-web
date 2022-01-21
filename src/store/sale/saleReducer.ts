// application
import { SALE_CHANGE, SaleAction } from './saleActionTypes';
import { SaleState } from './saleTypes';
import { withClientState } from '../client';

const initialState: SaleState = {
    isWholeSale: false,
};

export const SALE_NAMESPACE = 'sale';

function saleBaseReducer(state = initialState, action: SaleAction): SaleState {
    if (action.type === SALE_CHANGE) {
        return {
            ...state,
            isWholeSale: action.isWholeSale,
        };
    }

    return state;
}

const localeReducer = withClientState(saleBaseReducer, SALE_NAMESPACE);

export default localeReducer;
