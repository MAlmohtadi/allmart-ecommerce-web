// react
import { useCallback } from 'react';
// third-party
import { useDispatch, useSelector } from 'react-redux';
// application
import { Fn, ThunkActionFn, ThunkReturnType } from './types';
import { RootState } from './root/rootTypes';

export function useAppAction<T extends Fn>(action: T): (...args: Parameters<T>) => (
    T extends ThunkActionFn ? ThunkReturnType<T> : ReturnType<T>
) {
    const dispatch = useDispatch();

    return useCallback((...args: Parameters<T>) => (
        dispatch(action(...args))
    ), []);
}

export function useAppSelector<T extends(state: RootState) => any>(selector: T): ReturnType<T> {
    return useSelector(selector);
}
