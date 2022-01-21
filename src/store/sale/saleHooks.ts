// application
import { SALE_NAMESPACE } from './saleReducer';
import { saleChange } from './saleActions';
import { RootState } from '../root/rootTypes';
import { useAppAction, useAppSelector } from '../hooks';

const saleSelector = (state: RootState) => state[SALE_NAMESPACE].isWholeSale;

export const useSale = () => useAppSelector(saleSelector);

export const useSaleChange = () => useAppAction(saleChange);
