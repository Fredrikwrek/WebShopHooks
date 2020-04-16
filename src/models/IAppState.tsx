import { IProduct } from './IProduct'

export interface IAppState {
    orders: IProduct[]
    totalPrice: number
    checkOutKey: boolean
}