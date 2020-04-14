import { IProduct } from "./IProduct";

export interface ICategory {
    id: number
    name: string
}
export interface ISearchHandler {
    searchHandler(products: IProduct[], searchValue: string, genre: number): void
}