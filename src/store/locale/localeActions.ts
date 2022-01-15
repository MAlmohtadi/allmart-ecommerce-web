// application
import { LOCALE_CHANGE, LocaleChangeAction } from './localeActionTypes';

// eslint-disable-next-line import/prefer-default-export
export function localeChange(locale: string): LocaleChangeAction {
    return {
        type: LOCALE_CHANGE,
        locale,
    };
}
