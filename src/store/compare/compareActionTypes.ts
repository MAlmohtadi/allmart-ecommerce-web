// application
import { AppAction } from '../types';
import { IProduct } from '../../interfaces/product';

export const COMPARE_ADD_ITEM = 'COMPARE_ADD_ITEM';
export const COMPARE_REMOVE_ITEM = 'COMPARE_REMOVE_ITEM';

export interface CompareAddItemAction {
    type: typeof COMPARE_ADD_ITEM;
    product: IProduct;
}

export interface CompareRemoveItemAction {
    type: typeof COMPARE_REMOVE_ITEM;
    productId: number;
}

export type CompareAction =
    CompareAddItemAction |
    CompareRemoveItemAction;

export type CompareThunkAction<T = void> = AppAction<CompareAction, T>;
