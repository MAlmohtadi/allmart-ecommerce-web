import { ICurrency } from '../interfaces/currency';

const dataShopCurrencies: ICurrency[] = [
    {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
    },
    {
        code: 'GBP',
        symbol: '£',
        name: 'Pound Sterling',
    },
    {
        code: 'دينار',
        symbol: 'دينار',
        name: 'اردني',
    },
    {
        code: 'RUB',
        symbol: '₽',
        name: 'Russian Ruble',
    },
];

export const dataShopDefaultCurrency: ICurrency = dataShopCurrencies.find((x) => x.code === 'دينار')!;

export default dataShopCurrencies;
