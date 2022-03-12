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

export interface ICheckoutInfo {
    deliveryInfo: IDelivery[],
}
