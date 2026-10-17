

export interface IHomePageInfo {
    categories: ICategory[];
    languages: ILanguage[];
    catalogUrl: string,
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
    downloadCatalogTranslation: string;
    categoriesTranslation: string;
    browseMoreTranslation: string;
    widthTranslation: string;
    lengthTranslation: string;
    boxSizeTranslation: string;
    packagingTranslation: string;
    palletTranslation: string;
    companyNameTranslation: string;
}

export interface IEshopTranslation {
    home: string;
    orders: string;
    allOrders: string;
    currentOrders: string;
    oldOrders: string;
    categories: string;
    specialOffers: string;
    imageGallery: string;
    aboutUs: string;
    ourProducts: string;
    currency: string;
    addBasket: string;
    contactUs: string;
    information: string;
    privacy: string;
    support: string;
    cancelAppAccount: string;
    cancelWebAccount: string;
    socialLinks: string;
    downloadApp: string;
    contactMessage: string;
    show: string;
    products: string;
    sortBy: string;
    none: string;
    lowestPrice: string;
    highestPrice: string;
    filters: string;
    price: string;
    reassign: string;
    offer: string;
    status: string;
    available: string;
    outOfStock: string;
    image: string;
    product: string;
    favorites: string;
    subTotal: string;
    delivery: string;
    discountCoupon: string;
    total: string;
    browseCart: string;
    checkout: string;
    cart: string;
    editCart: string;
    continueShopping: string;
    paySummary: string;
    totalPrice: string;
    orderDelivryAddress: string;
    yourOrder: string;
    order: string;
    payWithVisaOnDelivery: string;
    payCashOnDelivery: string;
    confirm: string;
    country: string;
    orderNotesOptional: string;
    confirmCode: string;
    searchProduct: string;
    myAccount: string;
    signOut: string;
    date: string;
    myInformation: string;
    name: string;
    phoneNumber: string;
    secondaryPhoneNumber: string;
    email: string;
    confirmInformation: string;
    cancelAccount: string;
    login: string;
    jubran: string; //--
    browse: string; //--
    facebookLogin: string; //--
    register: string; //--
    facebookRegister: string; //--
    deliveryMessage: string //---
    state: string //---
    city: string //---
    editOrder: string //---
    cancel: string //---
    emptyCart: string //---
    quantity: string;
    from: string;
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
    packageLength: number;
    palletCapacity: number;
}
