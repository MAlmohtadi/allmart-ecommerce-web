export interface IPeriod {
    id: number,
    name: string,
    othersPrice: number,
    price: number
}

export interface IDelivery {
    dayBased: boolean,
    displayName: string,
    id: number,
    name: string,
    periods: IPeriod[]
}

export interface IDeliveryInfo {
    branchId: number,
    deliveryPrice: number
}

export interface ICheckoutInfo {
    deliveryInfo: IDelivery[],
}

export interface ICheckoutInfo {
    deliveryInfo: IDelivery[],
}
