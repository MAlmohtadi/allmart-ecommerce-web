import { FranchiseState } from './franchiseTypes';

const initialState: FranchiseState = {
    franchiseId: null,
    franchiseCode: null,
    countryCode: null,
    currencyCode: null,
    currencySymbolAr: null,
    currencySymbolEn: null,
};

export const FRANCHISE_NAMESPACE = 'franchise';

export default function franchiseReducer(
    state = initialState,
    action: any
): FranchiseState {
    switch (action.type) {
        case 'FRANCHISE_SET':
            return {
                ...state,
                franchiseId: action.franchiseId,
                franchiseCode: action.franchiseCode,
                countryCode: action.countryCode,
                currencyCode: action.currencyCode,
                currencySymbolAr: action.currencySymbolAr,
                currencySymbolEn: action.currencySymbolEn,
            };
        case 'FRANCHISE_CLEAR':
            return initialState;
        default:
            return state;
    }
}

