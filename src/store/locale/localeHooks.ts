// application
import languages from '../../i18n';
import { ILanguage } from '../../interfaces/language';
import { LOCALE_NAMESPACE } from './localeReducer';
import { localeChange } from './localeActions';
import { RootState } from '../root/rootTypes';
import { useAppAction, useAppSelector } from '../hooks';
import { useEffect, useState } from "react";
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



export function useSyncedLocalStorage<T = string>(
    key: string,
    defaultValue: T
  ): [T, (value: T) => void] {
    const readValue = () => {
      if (typeof window === "undefined") return defaultValue;
      const stored = localStorage.getItem(key);
      try {
        return stored ? (JSON.parse(stored) as T) : defaultValue;
      } catch {
        return defaultValue;
      }
    };
  
    const [value, setValue] = useState<T>(readValue);
  
    const updateValue = (newValue: T) => {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
      window.dispatchEvent(new Event("local-storage-change"));
    };
  
    useEffect(() => {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === key) {
          setValue(event.newValue ? JSON.parse(event.newValue) : defaultValue);
        }
      };
  
      const handleLocalChange = () => {
        setValue(readValue());
      };
  
      window.addEventListener("storage", handleStorage);
      window.addEventListener("local-storage-change", handleLocalChange);
  
      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("local-storage-change", handleLocalChange);
      };
    }, [key]);
  
    return [value, updateValue];
  }