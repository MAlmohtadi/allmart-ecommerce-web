export interface IBaseCategory {
    id: number;
    name: string;
    isRetail: boolean,
    isWholeSale: boolean,
    order: number
}

export interface IShopCategory extends IBaseCategory {
    subCategories: IBaseCategory[];
}

export type ICategory = IShopCategory;
