// third-party
import { toast } from 'react-toastify';
// application
import { IProduct } from '../../interfaces/product';
import {
    COMPARE_ADD_ITEM,
    COMPARE_REMOVE_ITEM,
    CompareAddItemAction,
    CompareRemoveItemAction,
    CompareThunkAction,
} from './compareActionTypes';

export function compareAddItemSuccess(product: IProduct): CompareAddItemAction {
    toast.success(`Product "${product.name}" added to compare!`, { theme: 'colored' });

    return {
        type: COMPARE_ADD_ITEM,
        product,
    };
}

export function compareRemoveItemSuccess(productId: number): CompareRemoveItemAction {
    return {
        type: COMPARE_REMOVE_ITEM,
        productId,
    };
}

export function compareAddItem(product: IProduct): CompareThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(compareAddItemSuccess(product));
                resolve();
            }, 500);
        })
    );
}

export function compareRemoveItem(productId: number): CompareThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(compareRemoveItemSuccess(productId));
                resolve();
            }, 500);
        })
    );
}
