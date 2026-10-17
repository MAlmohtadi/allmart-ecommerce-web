// application
import mainApi from '../../api/main';
import shopApi from '../../api/shop';
import { IProduct, ITranslation } from '../../interfaces/main';
// import { IProduct } from '../../interfaces/product';
import {
    QUICKVIEW_CLOSE,
    QUICKVIEW_OPEN,
    QuickviewCloseAction,
    QuickviewOpenAction,
    QuickviewThunkAction,
} from './quickviewActionTypes';

let cancelPreviousRequest = () => {};

export function quickviewOpenSuccess(product: IProduct,translations: ITranslation): QuickviewOpenAction {
    return {
        type: QUICKVIEW_OPEN,
        product,
        translations
    };
}

export function quickviewClose(): QuickviewCloseAction {
    return {
        type: QUICKVIEW_CLOSE,
    };
}

export function quickviewOpen(product: IProduct,translations: ITranslation): QuickviewThunkAction<Promise<void>> {
    return (dispatch) => {
        cancelPreviousRequest();

        return new Promise((resolve) => {
            let canceled = false;
            // sending request to server, timeout is used as a stub
            const timer = setTimeout(() => {
                const myPromise = new Promise(() => {
                    if (canceled) {
                        return;
                    }

                    if (product) {
                        dispatch(quickviewOpenSuccess(product,translations));
                    }

                    resolve();
                  });
            }, 350);

            cancelPreviousRequest = () => {
                canceled = true;
                clearTimeout(timer);
                resolve();
            };
        });
    };
}
