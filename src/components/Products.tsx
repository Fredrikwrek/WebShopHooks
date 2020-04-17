import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IProduct, IProductState } from '../models/IProduct'

export function Products(props: IProductState) {
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
        <React.Fragment>
            {displayProducts.map((item) => {
                return (
                    <div className='productContainer' key={item.id}>
                        <h4>{item.name}</h4>
                        <div>
                            <div className='leftProductColumn'>
                                <div className='picFrame'>
                                    <img src={item.imageUrl} alt='IMG' width='100px' />
                                </div>
                            </div>
                            <div className='rightProductColumn'>
                                <div className='rightProductColumnTopRow'>{item.description}</div>
                                <div className='rightProductColumnbottomRow'>
                                    <div className='productPrice'>{item.price} kr</div>
                                    <button onClick={() => { props.addOrderItem(item) }}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                );
            })}
        </React.Fragment>
    );
}