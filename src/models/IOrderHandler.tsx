import { IProduct } from "./IProduct";

export interface IOrderHandler {
    orders: IProduct[]
    totalPrice: number
    checkOutKey: boolean
    removeOrderItem(event: IProduct): void
    addOrderItem(event: IProduct): void
    clearOrderList(): void
    masterKeyCheckOut(key: boolean): void
}
export interface IOrderRows {
    productId: number,
    orderId: number,
    amount: number
}
export interface IPostOrder {
    companyId: number
    created: string
    createdBy: string
    paymentMethod: string
    totalPrice: number
    status: number
    orderRows: IOrderRows[]
}
export interface IGetOrder {
    id: number
    companyId: number
    created: string
    createdBy: string
    paymentMethod: string
    totalPrice: number
    status: number
    orderRows: IOrderRows[]
}