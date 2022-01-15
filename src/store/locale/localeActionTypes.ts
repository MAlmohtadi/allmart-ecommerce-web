// application
export const LOCALE_CHANGE = 'LOCALE_CHANGE';

export interface LocaleChangeAction {
    type: typeof LOCALE_CHANGE;
    locale: string;
}

export type LocaleAction = LocaleChangeAction;
