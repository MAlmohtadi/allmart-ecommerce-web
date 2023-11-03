// react
// application
import { useAppAction, useAppSelector } from '../hooks';
import { mainFetchThunk, mainInitThunk } from './mainActions';
import { MainState, MAIN_NAMESPACE } from './mainTypes';

export function useMainSelector<T extends(state: MainState) => any>(selector: T): ReturnType<T> {
    return useAppSelector((state) => selector(state[MAIN_NAMESPACE]));
}
export const useMain = () => useMainSelector((state) => state);

export const useMainIsLoading = () => useMainSelector((state) => state.isLoading);

export const useMainCategories = () => useMainSelector((state) => state.categories);
export const useMainMenuList = () => useMainSelector((state) => state.menuList);
export const useMainBanners = () => useMainSelector((state) => state.banners);


export const useMainInit = () => useAppAction(mainInitThunk);
export const useMainFetchData = () => useAppAction(mainFetchThunk);
