import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IProduct } from '../models/IProduct'
import { IOrderHandler } from '../models/IOrderHandler';



export function Products(props: IOrderHandler) {
    const defaultAllProducts: IProduct[] = [];
    const [allProducts, setAllProducts] = useState(defaultAllProducts);
    const defautDisplayProducts: IProduct[] = [];
    const [displayProducts, setDisplayProducts] = useState(defautDisplayProducts);

    useEffect(() => {
        axios.get('http://medieinstitutet-wie-products.azurewebsites.net/api/products')
            .then(r => {
                setAllProducts(r.data);
                setDisplayProducts(r.data);
            })
    }, [])

    useEffect(() => {
        if (allProducts.length) {
            let filtredBySearch: IProduct[] = !props.searchValue.length ? allProducts : props.products;
            let categoryFilter: IProduct[] = [];
            if (props.genre !== 0) {
                categoryFilter = filtredBySearch.filter((item) => {
                    return item.productCategory.find((itemcat) => { return itemcat.categoryId === props.genre })
                })
            }
            else { categoryFilter = filtredBySearch; }
            setDisplayProducts(categoryFilter);
        }
    }, [props, allProducts])
    return (
        <div>
            {displayProducts.map((item) => {
                return (
                    <div id='productContainer' key={item.id}>
                        <h4>{item.name}</h4>
                        <div className='picFrame'>
                            <img src={item.imageUrl} alt='IMG' width='200px' />
                        </div>
                        <br />
                        <button onClick={() => { props.orderHandler(item) }}>Add to cart</button>
                    </div>
                );
            })}
        </div>
    );
}