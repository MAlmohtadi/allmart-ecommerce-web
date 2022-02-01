// application
import { IFilterValues } from '../../interfaces/list';
import { SHOP_NAMESPACE, ShopState } from './shopTypes';
import {
    SHOP_FETCH_PRODUCTS_LIST_START,
    SHOP_FETCH_PRODUCTS_LIST_SUCCESS,
    SHOP_HYDRATE,
    SHOP_INIT,
    SHOP_RESET_FILTERS,
    SHOP_SET_FILTER_VALUE,
    SHOP_SET_OPTION_VALUE,
    ShopAction,
    ShopSetFilterValueAction,
} from './shopActionTypes';
import { IProductResponse, IProductsList } from '../../interfaces/product';
import RangeFilterBuilder from '../../fake-server/filters/range';

const initialState: ShopState = {
    init: false,
    productsListIsLoading: true,
    productsList: null,
    options: {
        page: 1,
        limit: 12,
        sort: '',
    },
    filters: {},
};

function shopReducerSetFilterValue(state: ShopState, action: ShopSetFilterValueAction): ShopState {
    const currentFilters = { ...state.filters };
    let filters: IFilterValues;

    if (action.value !== null) {
        filters = { ...currentFilters, [action.filter]: action.value };
    } else {
        delete currentFilters[action.filter];

        filters = { ...currentFilters };
    }
    const [minPrice, maxPrice] = filters.price.split('-');

    return {
        ...state,
        options: {
            ...state.options,
            minPrice,
            maxPrice,
        },
        filters,
    };
}

function mapProductList(state: ShopState, productResponse: IProductResponse): IProductsList {
    const page = state.options.page || 1;
    const limit = state.options.limit || 12;
    const sort = state.options.sort || '';
    const total = productResponse.totalNumberOfProducts;
    const pages = Math.ceil(total / limit);
    const from = (page - 1) * limit + 1;
    const to = Math.max(Math.min(page * limit, total), from);

    const priceFilter = new RangeFilterBuilder('price', 'price');
    priceFilter.max = 100;
    // const filters =
    const productList: IProductsList = {
        items: [...productResponse.products],
        page,
        limit,
        sort,
        total,
        pages,
        from,
        to,
        filters: [priceFilter.build()],
    };
    return productList;
}
function shopReducer(state = initialState, action: ShopAction): ShopState {
    switch (action.type) {
    case SHOP_HYDRATE:
        return action.payload[SHOP_NAMESPACE];
    case SHOP_INIT:
        return {
            ...initialState,
            options: { ...state.options, ...action.options },
            filters: action.filters,
        };
    case SHOP_FETCH_PRODUCTS_LIST_START:
        return { ...state, productsListIsLoading: true };
    case SHOP_FETCH_PRODUCTS_LIST_SUCCESS:
        return {
            ...state,
            productsListIsLoading: false,
            productsList: mapProductList(state, action.productsList),
        };
    case SHOP_SET_OPTION_VALUE:
        return {
            ...state,
            options: { ...state.options, page: 0, [action.option]: action.value },
        };
    case SHOP_SET_FILTER_VALUE: return shopReducerSetFilterValue(state, action);
    case SHOP_RESET_FILTERS:
        return {
            ...state,
            options: {
                ...state.options,
                limit: 12,
                page: 1,
                sort: '',
                maxPrice: 100,
                minPrice: 0,
            },
            filters: {},
        };
    default:
        return state;
    }
}

export default shopReducer;
