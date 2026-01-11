import { FranchiseState } from './franchiseTypes';

export function franchiseSet(data: FranchiseState) {
    return {
        type: 'FRANCHISE_SET',
        ...data,
    };
}

export function franchiseClear() {
    return {
        type: 'FRANCHISE_CLEAR',
    };
}

