interface ICategory {
    categoryId: number
}
export interface IProduct {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    amount: number
    productCategory: ICategory[]
}
export interface IProductDisplay {
    products: IProduct[]
    searchValue: string
    genre: number
}
export interface IProductState {
    products: IProduct[]
    searchValue: string
    genre: number
    addOrderItem(event: IProduct): void
}