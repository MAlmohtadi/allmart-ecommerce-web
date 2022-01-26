// react
import { useCallback } from 'react';
// application
import { IListOptions } from '../../interfaces/list';
import { SHOP_NAMESPACE, ShopState } from './shopTypes';
import { shopResetFiltersThunk, shopSetFilterValueThunk, shopSetOptionValueThunk } from './shopActions';
import { useAppAction, useAppSelector } from '../hooks';

export function useShopSelector<T extends(state: ShopState) => any>(selector: T): ReturnType<T> {
    return useAppSelector((state) => selector(state[SHOP_NAMESPACE]));
}

export const useShop = () => useShopSelector((state) => state);

export const useShopProductsListIsLoading = () => useShopSelector((state) => state.productsListIsLoading);

export const useShopProductsList = () => useShopSelector((state) => state.productsList);

export const useShopOptions = () => useShopSelector((state) => state.options);

export const useShopFilters = () => useShopSelector((state) => state.productsList?.filters || []);

export const useShopFilterValues = () => useShopSelector((state) => state.filters);

export const useShopResetFiltersThunk = () => useAppAction(shopResetFiltersThunk);

export const useShopSetOptionValueThunk = () => useAppAction(shopSetOptionValueThunk);

export const useShopSetFilterValueThunk = () => useAppAction(shopSetFilterValueThunk);

export function useSetOption(
    option: keyof IListOptions,
    filterValueFn: (data: any) => any,
) {
    const callback = useCallback(filterValueFn, []);
    const shopSetOptionValue = useShopSetOptionValueThunk();

    return useCallback((data) => {
        shopSetOptionValue(option, callback(data)).then();
    }, [shopSetOptionValue, option, callback]);
}
