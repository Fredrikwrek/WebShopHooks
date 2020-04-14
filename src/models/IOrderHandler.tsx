import { IProduct } from "./IProduct";

export interface IOrderHandler {
    products: IProduct[]
    searchValue: string
    genre: number
    orderHandler(event: IProduct): void
}