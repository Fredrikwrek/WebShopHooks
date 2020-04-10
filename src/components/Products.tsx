import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IProduct } from '../models/IProduct'
import { IOrderHandler } from '../models/IOrderHandler';

export function Products(props: IOrderHandler) {
    const defaultProducts: IProduct[] = [];
    const [products, setProducts] = useState(defaultProducts);

    useEffect(() => {
        axios.get('http://medieinstitutet-wie-products.azurewebsites.net/api/products')
            .then(r => {
                setProducts(r.data)
            })
    }, [])

    return (
        <div>
            {products.map((item) => {
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