// react
// application
import { useAppAction, useAppSelector } from '../hooks';
import { homeFetchThunk, homeInitThunk } from './homeActions';

export const useHome = () => useAppSelector((state) => state.home);

export const useHomeIsLoading = () => useAppSelector((state) => state.home.homeIsLoading);

export const useHomeCategories = () => useAppSelector((state) => state.home.categories);

export const useHomeBanners = () => useAppSelector((state) => state.home.banners);

export const useHomeAdminSettings = () => useAppSelector((state) => state.home.adminSettingsResponse);
export const useHomeInit = () => useAppAction(homeInitThunk);
export const useHomeFetchData = () => useAppAction(homeFetchThunk);
