interface ICategory {
    categoryId: number
}
export interface IProduct {
    id: number
    name: string
    imageUrl: string
    amount: number
    productCategory: ICategory[]
}
export interface IProductDisplay {
    products: IProduct[]
    searchValue: string
    genre: number
}