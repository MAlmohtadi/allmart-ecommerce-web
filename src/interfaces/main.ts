

export interface IHomePageInfo {
    categories: ICategory[];
    languages: ILanguage[];
    aboutUs: IAboutUs;
    banners: IBanner[];
    menuList: IMenu[];
    footer: IFooter;
    translations: ITranslation;
}
export interface ICategory {
    id: number;
    imageUrl: string;
    name: string;
    order: number;
}

export interface ILanguage {
    id: number;
    name: string;
    showText: string;
    isActive: boolean;
    locale: string,
    direction:string
}
export interface IAboutUs {
    id: number;
    name: string;
    content: string;
}
export interface IBanner {
    id: number;
    name: string;
    order: number;
    statusId: number;
    imageUrl: string;
    fromDate: string;
    toDate: string;
}
export interface IMenu {
    order: number;
    name: string;
    link: string;
    isSamePageLink: boolean;
    subMenu: ISubMenu[];
}
export interface ISubMenu {
    order: number;
    name: string;
    link: string;
    isSamePageLink: boolean;
}
export interface IFooter {
    callUsSection?: ICallUsSection;
    informationSection?: IInformationSection;
}
export interface ICallUsSection {
    headTitle: string;
    description: string;
    email: string;
}
export interface IInformationSection {
    headTitle: string;
    links: ILink[];
}
export interface ILink {
    name: string;
    link: string;
}
export interface ITranslation {
    barcodeTranslation: string;
    depthTranslation: string;
    detailsTranslation: string;
    productsTranslation: string;
    packageWeightTranslation: string;
    closeTranslation: string;
    aboutUsTranslation: string;
    heightTranslation: string;
    boxWeightTranslation: string;
    nameTranslation: string;
    DownloadCatalogTranslation: string;
    categoriesTranslation: string;
    browseMoreTranslation: string;
    widthTranslation: string;
    boxSizeTranslation: string;
    packagingTranslation: string;
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    barcode: string;
    weight: string;
    packaging: string;
    packageWidth: number;
    packageHeight: number;
    packageWeight: number;
}
