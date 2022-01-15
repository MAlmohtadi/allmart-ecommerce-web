// application
import languages from '../../i18n';
import { ILanguage } from '../../interfaces/language';
import { LOCALE_NAMESPACE } from './localeReducer';
import { localeChange } from './localeActions';
import { RootState } from '../root/rootTypes';
import { useAppAction, useAppSelector } from '../hooks';

const localeSelector = (state: RootState) => state[LOCALE_NAMESPACE].current;

export const useLocale = () => useAppSelector(localeSelector);

export function useLanguage(): ILanguage;
// eslint-disable-next-line no-redeclare
export function useLanguage<T extends(lang: ILanguage) => any>(selector: T): ReturnType<T>;
// eslint-disable-next-line no-redeclare
export function useLanguage<T extends(lang: ILanguage) => any>(selector?: T): (ILanguage | ReturnType<T>) {
    return useAppSelector((state) => {
        const locale = localeSelector(state);
        const language = languages.find((x) => x.locale === locale);

        if (!language) {
            throw Error(`Language with locale: ${locale} not found!`);
        }

        if (selector) {
            return selector(language);
        }

        return language;
    });
}

export const useDirection = () => useLanguage((language) => language.direction);

export const useMessages = () => useLanguage((language) => language.messages);

export const useLocaleChange = () => useAppAction(localeChange);
