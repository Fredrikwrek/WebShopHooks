import { IProduct } from "./IProduct";

export interface IOrderHandler {
    orderHandler(event: IProduct): void
}