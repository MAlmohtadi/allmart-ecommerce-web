// application
import { QUICKVIEW_NAMESPACE } from './quickviewReducer';
import { quickviewClose, quickviewOpen } from './quickviewActions';
import { useAppAction, useAppSelector } from '../hooks';

export const useQuickview = () => useAppSelector((state) => state[QUICKVIEW_NAMESPACE]);

export const useQuickviewOpen = () => useAppAction(quickviewOpen);

export const useQuickviewClose = () => useAppAction(quickviewClose);
