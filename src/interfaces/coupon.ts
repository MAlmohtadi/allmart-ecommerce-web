export interface ICoupon {
    code: string,
    percentage?: number,
    discountAmount?: number,
    isPercentage: boolean,
    minOrderPrice: number
}
