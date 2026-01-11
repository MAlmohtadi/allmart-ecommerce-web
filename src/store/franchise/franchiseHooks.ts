import { useSelector } from 'react-redux';
import { FranchiseState } from './franchiseTypes';
import { FRANCHISE_NAMESPACE } from './franchiseReducer';

export function useFranchise(): FranchiseState {
    return useSelector((state: any) => state[FRANCHISE_NAMESPACE] || {
        franchiseId: null,
        franchiseCode: null,
        countryCode: null,
        currencyCode: null,
        currencySymbolAr: null,
        currencySymbolEn: null,
    });
}

