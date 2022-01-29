// react
// application
import { useAppAction, useAppSelector } from '../hooks';
import { homeFetchThunk, homeInitThunk } from './homeActions';
import { HomeState, HOME_NAMESPACE } from './homeTypes';

export function useHomeSelector<T extends(state: HomeState) => any>(selector: T): ReturnType<T> {
    return useAppSelector((state) => selector(state[HOME_NAMESPACE]));
}
export const useHome = () => useHomeSelector((state) => state);

export const useHomeIsLoading = () => useHomeSelector((state) => state.homeIsLoading);

export const useHomeCategories = () => useHomeSelector((state) => state.categories);

export const useHomeBanners = () => useHomeSelector((state) => state.banners);

export const useHomeAdminSettings = () => useHomeSelector((state) => state.adminSettingsResponse);

export const useHomeInit = () => useAppAction(homeInitThunk);
export const useHomeFetchData = () => useAppAction(homeFetchThunk);
