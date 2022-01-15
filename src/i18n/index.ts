// application
import enMessages from './messages/en.json';
import ruMessages from './messages/ru.json';
import rtlMessages from './messages/rtl.json';
import { ILanguage } from '../interfaces/language';

const languages: ILanguage[] = [
    {
        locale: 'en',
        code: 'EN',
        name: 'English',
        icon: '/images/languages/language-1.png',
        direction: 'ltr',
        messages: enMessages,
    },
    {
        locale: 'ru',
        code: 'RU',
        name: 'Russian',
        icon: '/images/languages/language-2.png',
        direction: 'ltr',
        messages: ruMessages,
    },
    {
        locale: 'ar',
        code: 'RTL',
        name: 'RTL',
        icon: '/images/languages/language-3.png',
        direction: 'rtl',
        messages: rtlMessages,
    },
];

export default languages;
