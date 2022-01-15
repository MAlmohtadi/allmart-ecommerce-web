// application
import { COMPARE_NAMESPACE } from './compareReducer';
import { compareAddItem, compareRemoveItem } from './compareActions';
import { useAppAction, useAppSelector } from '../hooks';

export const useCompare = () => useAppSelector((state) => state[COMPARE_NAMESPACE]);

export const useCompareAddItem = () => useAppAction(compareAddItem);

export const useCompareRemoveItem = () => useAppAction(compareRemoveItem);
